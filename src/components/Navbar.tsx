import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const links = [
  { to: "/", key: "nav.home" as const },
  { to: "/about", key: "nav.about" as const },
  { to: "/academics", key: "nav.academics" as const },
  { to: "/admissions", key: "nav.admissions" as const },
  { to: "/calendar", key: "nav.calendar" as const },
  { to: "/notices", key: "nav.notices" as const },
  { to: "/fees", key: "nav.fees" as const },
  { to: "/contact", key: "nav.contact" as const },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-gold/30 transition-all duration-500",
        scrolled ? "bg-card/95 backdrop-blur-xl shadow-soft" : "glass-panel",
      )}
    >
      <div className="container-narrow flex h-20 items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-saffron shadow-gold group-hover:scale-105 transition-transform duration-300">
              <span className="absolute inset-0 rounded-full border border-gold/50 animate-ring-pulse" />
              <Flame className="h-6 w-6 text-primary-foreground animate-flame" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl font-bold text-secondary">Vidyalaya</div>
              <div className="font-sanskrit text-xs text-primary">विद्या ददाति विनयं</div>
            </div>
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="hidden md:flex items-center gap-1"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-0.5 after:bg-gradient-saffron after:transition-all after:duration-300",
                  isActive
                    ? "text-primary after:w-8"
                    : "text-foreground/80 hover:text-primary after:w-0 hover:after:w-8",
                )
              }
            >
              {t(l.key)}
            </NavLink>
          ))}
        </motion.nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center rounded-full border border-gold/35 bg-card/70 p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                language === "en" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-primary",
              )}
            >
              {t("lang.english")}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                language === "hi" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-primary",
              )}
            >
              {t("lang.hindi")}
            </button>
          </div>

          <Button asChild variant="hero" size="sm" className="hover:shadow-gold transition-shadow duration-300">
            <Link to="/admissions">Apply</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-gold/30 bg-card/95 backdrop-blur"
          >
            <nav className="container-narrow flex flex-col py-4 gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )
                  }
                >
                  {t(l.key)}
                </NavLink>
              ))}

              <div className="mt-2 mb-1 flex items-center rounded-full border border-gold/35 bg-card/70 p-1 w-fit">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    language === "en" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-primary",
                  )}
                >
                  {t("lang.english")}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("hi")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    language === "hi" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-primary",
                  )}
                >
                  {t("lang.hindi")}
                </button>
              </div>

              <div className="mt-2">
                <Button asChild variant="hero" className="w-full">
                  <Link to="/admissions" onClick={() => setOpen(false)}>Apply</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
