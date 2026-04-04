import Link from "next/link";

export default function SchedulePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 pt-16">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-dim">
        {"// COMING SOON"}
      </span>
      <h1 className="mt-4 font-headline text-4xl font-bold text-fg">
        Schedule
      </h1>
      <p className="mt-4 max-w-md text-center font-body text-sm text-dim">
        Full 3-day event schedule coming soon.
      </p>
      <Link
        href="/"
        className="mt-8 font-mono text-sm text-accent transition-colors hover:text-accent-alt"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}
