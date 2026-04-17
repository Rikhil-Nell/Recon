import { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

function AuthCheckShell() {
    return (
        <div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--fg)] portal-grain flex items-center justify-center px-6">
            <div className="portal-card px-6 py-6 text-center max-w-sm">
                <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--amber)_60%,black_18%)]">
                    ESTABLISHING LINK
                </div>
                <div className="mt-3 font-portal-display text-[26px] leading-none">AUTH CHECK</div>
            </div>
        </div>
    );
}

export function RequireVerified() {
    const sessionStatus = useAuthStore((state) => state.sessionStatus);
    const bootstrapSession = useAuthStore((state) => state.bootstrapSession);
    const location = useLocation();
    const bootstrappedRef = useRef(false);

    useEffect(() => {
        if (bootstrappedRef.current) return;
        bootstrappedRef.current = true;
        void bootstrapSession();
    }, [bootstrapSession]);

    if (sessionStatus === 'unknown') {
        return <AuthCheckShell />;
    }

    if (sessionStatus !== 'authenticated') {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return <Outlet />;
}

export function RedirectIfVerified() {
    const sessionStatus = useAuthStore((state) => state.sessionStatus);
    const location = useLocation();

    // Keep verified users away from OTP verification, but allow opening /login explicitly.
    if (sessionStatus === 'authenticated' && location.pathname.startsWith('/verify')) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
