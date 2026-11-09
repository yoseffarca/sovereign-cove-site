export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`border-t border-border/60 px-6 py-10 ${className}`.trim()}>
      <div className="mx-auto flex max-w-[1600px] flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
        <span>The Sovereign Cove</span>
        <span>Tavernier · Florida Keys</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
