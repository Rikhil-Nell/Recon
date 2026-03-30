import { AuthPage } from "@/components/auth-page";

export default function SignupPage() {
  return (
    <AuthPage
      mode="signup"
      title="Register Your Operator ID"
      subtitle="Create your Recon identity for registrations, team sync, side-event access, and overnight competition entry."
      quote="Provision access for the next generation of offensive security talent"
      buttonLabel="Register"
    />
  );
}
