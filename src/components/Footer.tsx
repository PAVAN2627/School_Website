import { Link } from "react-router-dom";
import { Flame, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => (
  <footer className="relative mt-24 bg-gradient-peacock text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(43_88%_55%/0.25),transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_15%,hsl(43_88%_55%/0.12)_40%,transparent_70%)] animate-shimmer" />
    <div className="container-narrow relative grid gap-10 py-16 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-saffron shadow-gold">
            <span className="absolute inset-0 rounded-full border border-gold/50 animate-ring-pulse" />
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <div className="font-display text-2xl font-bold">Vidyalaya</div>
            <div className="font-sanskrit text-sm text-gold">विद्या ददाति विनयं</div>
          </div>
        </div>
        <p className="text-primary-foreground/80 max-w-md leading-relaxed">
          Where ancient wisdom meets modern learning. Nurturing every child with the rich heritage of Bharat.
        </p>
      </div>

      <div>
        <h4 className="font-display text-lg text-gold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/80">
          <li><Link to="/about" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">About Us</Link></li>
          <li><Link to="/academics" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Academics</Link></li>
          <li><Link to="/admissions" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Admissions</Link></li>
          <li><Link to="/calendar" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Calendar</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-lg text-gold mb-4">Visit Us</h4>
        <ul className="space-y-3 text-sm text-primary-foreground/80">
          <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" /> 108, Saraswati Marg, Bengaluru</li>
          <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" /> +91 98765 43210</li>
          <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" /> hello@vidyalaya.in</li>
        </ul>
      </div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="border-t border-gold/20 py-5 text-center text-sm text-primary-foreground/70"
    >
      © {new Date().getFullYear()} Vidyalaya · Crafted with devotion · शुभम् भवतु
    </motion.div>
  </footer>
);
