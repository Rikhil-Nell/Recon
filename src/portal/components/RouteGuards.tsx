import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export function RequireVerified() {
    const isVerified = useAuthStore((state) => state.isVerified);
    const location = useLocation();

    if (!isVerified) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return <Outlet />;
}

export function RedirectIfVerified() {
    const isVerified = useAuthStore((state) => state.isVerified);
    const location = useLocation();

    // Keep verified users away from OTP verification, but allow opening /login explicitly.
    if (isVerified && location.pathname.startsWith('/verify')) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
