import { Instagram, Facebook, Youtube } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t border-border/20 py-12 px-6 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-muted-foreground text-sm">© 2026 Brothers Garage. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/brothersgarage_official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
          </a>
          <a href="https://www.facebook.com/brothersgarages" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
          </a>
          <a href="https://www.youtube.com/@brothersgarage1920/videos" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
