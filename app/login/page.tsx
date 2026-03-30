import { AuthPage } from "@/components/auth-page";

export default function LoginPage() {
  return (
    <AuthPage
      mode="login"
      title="Access Event Command"
      subtitle="Continue into the Recon operations grid, live queues, and competition briefings."
      quote="Build secure systems without compromise"
      buttonLabel="Login"
    />
  );
}
