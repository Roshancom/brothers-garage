import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function OpeningHoursBar() {
  const [status, setStatus] = useState<{ open: boolean; label: string }>({ open: false, label: "…" });

  useEffect(() => {
    const check = () => {
      // Nepal Time = UTC + 5h 45m
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
      const nepalMs = utcMs + (5 * 60 + 45) * 60_000;
      const nepal = new Date(nepalMs);
      const day = nepal.getDay(); // 0=Sun … 6=Sat
      const hour = nepal.getHours() + nepal.getMinutes() / 60;
      // Open: Mon–Fri (1–5) & Sun (0), 08:00–19:00; Saturday always closed
      const isOpen = day !== 6 && hour >= 8 && hour < 19;
      setStatus({ open: isOpen, label: isOpen ? "Open Now" : "Closed" });
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black/90 border-b border-border/10 py-1.5 px-4 flex items-center justify-center gap-3 text-xs">
      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
      <span className="text-muted-foreground">
        <span className="hidden sm:inline">Mon–Fri &amp; Sun: 8:00 AM – 7:00 PM &nbsp;|&nbsp; Saturday: Closed</span>
        <span className="sm:hidden">Mon–Fri &amp; Sun: 8 AM–7 PM &nbsp;|&nbsp; Sat: Closed</span>
      </span>
      <span
        className={`px-2 py-0.5 rounded-full font-semibold shrink-0 ${
          status.open
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {status.label}
      </span>
    </div>
  );
}
