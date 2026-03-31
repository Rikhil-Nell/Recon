export default function TagChip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`tag-chip w-fit inline-flex !border-terminal-green/20 ${className}`}>
      {children}
    </div>
  );
}
