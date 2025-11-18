import { Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Activity, FlaskConical, BookOpen, Menu, X, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import cgmLogo from "@assets/generated_images/Professional_CGM_sensor_logo_1540507f.png";

export function Navigation() {
  const [location] = useHashLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Activity },
    { path: "/simulator", label: "Simulator", icon: FlaskConical },
    { path: "/research", label: "Research", icon: BookOpen },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm" data-testid="nav-main">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" data-testid="link-home">
            <div className="w-9 h-9 rounded-lg overflow-hidden" data-testid="logo-icon">
              <img src={cgmLogo} alt="CGM Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground" data-testid="logo-text">
                Glucose Odyssey
              </h1>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="default"
                    className="gap-2"
                    data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-border pt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="default"
                    className="w-full justify-start gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
