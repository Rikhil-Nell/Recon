export default function TopoBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="topo-pattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="100" cy="100" r="90" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="30" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="35" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="20" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <circle cx="160" cy="160" r="40" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <circle cx="160" cy="160" r="25" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <circle cx="160" cy="160" r="10" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>
    </div>
  );
}
