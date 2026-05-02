import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { to: "/about",      key: "nav.about" as const },
  { to: "/academics",  key: "nav.academics" as const },
  { to: "/admissions", key: "nav.admissions" as const },
  { to: "/calendar",   key: "nav.calendar" as const },
  { to: "/notices",    key: "nav.notices" as const },
  { to: "/fees",       key: "nav.fees" as const },
  { to: "/contact",    key: "nav.contact" as const },
];

const contact = [
  { Icon: MapPin, val: "108, Saraswati Marg, Bengaluru – 560001" },
  { Icon: Phone,  val: "+91 98765 43210" },
  { Icon: Mail,   val: "hello@vidyalaya.in" },
];

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-12 md:mt-16 overflow-hidden bg-gradient-to-br from-[#1a0a00] via-[#2d1200] to-[#1a0800]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(ellipse at 70% 40%, #f59e0b 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, #c2410c 0%, transparent 50%)" }}
      />

      <div className="container-narrow relative grid gap-12 py-14 md:grid-cols-12">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-5"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10">
              <span className="font-sanskrit text-2xl leading-none text-amber-400">ॐ</span>
            </div>
            <div>
              <div className="font-display text-2xl font-bold tracking-wide text-amber-100">Vidyalaya</div>
              <div className="font-sanskrit text-xs text-amber-400/80 tracking-wider">विद्या ददाति विनयं</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-stone-400 max-w-xs">{t("footer.tagline")}</p>
          <div className="mt-6 flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-amber-500/40" style={{ opacity: 1 - i * 0.15 }} />
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-3"
        >
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-amber-400 mb-5">
            {t("footer.quicklinks")}
          </h4>
          <ul className="space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group flex items-center gap-1.5 text-sm text-stone-400 transition-colors duration-200 hover:text-amber-300"
                >
                  <span className="h-px w-3 bg-amber-500/40 transition-all duration-200 group-hover:w-5 group-hover:bg-amber-400" />
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-4"
        >
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-amber-400 mb-5">
            {t("footer.visit")}
          </h4>
          <ul className="space-y-4">
            {contact.map(({ Icon, val }) => (
              <li key={val} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10">
                  <Icon className="h-3.5 w-3.5 text-amber-400" />
                </span>
                <span className="text-sm leading-relaxed text-stone-400">{val}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.06]">
        <div className="container-narrow flex flex-col items-center justify-between gap-3 py-5 text-xs text-stone-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Vidyalaya · {t("footer.copyright")}</span>
          <span className="font-sanskrit text-amber-500/60 tracking-wider">{t("footer.blessing")}</span>
        </div>
      </div>
    </footer>
  );
};
