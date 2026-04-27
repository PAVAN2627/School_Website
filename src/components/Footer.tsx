import { Link } from "react-router-dom";
import { Flame, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => (
  <footer className="relative mt-12 md:mt-16 overflow-hidden text-[#5a2117] bg-[linear-gradient(135deg,hsl(18_62%_34%)_0%,hsl(24_78%_50%)_42%,hsl(38_95%_86%)_100%)]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,hsl(43_88%_55%/0.18),transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_15%,hsl(43_95%_78%/0.12)_40%,transparent_70%)] animate-shimmer" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(20_40%_12%/0.02)_0%,transparent_22%,transparent_78%,hsl(20_40%_12%/0.04)_100%)]" />
    <div className="container-narrow relative grid gap-10 py-16 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-saffron shadow-gold">
            <span className="absolute inset-0 rounded-full border border-gold/50 animate-ring-pulse" />
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#5a2117]">Vidyalaya</div>
            <div className="font-sanskrit text-sm text-[#5a2117]/90">विद्या ददाति विनयं</div>
          </div>
        </div>
        <p className="text-[#5a2117]/78 max-w-md leading-relaxed">
          Where ancient wisdom meets modern learning. Nurturing every child with the rich heritage of Bharat.
        </p>
      </div>

      <div>
        <h4 className="font-display text-lg text-[#5a2117] mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-[#5a2117]/82">
          <li><Link to="/about" className="hover:text-[#2f120d] transition-colors inline-block hover:translate-x-1 duration-300">About Us</Link></li>
          <li><Link to="/academics" className="hover:text-[#2f120d] transition-colors inline-block hover:translate-x-1 duration-300">Academics</Link></li>
          <li><Link to="/admissions" className="hover:text-[#2f120d] transition-colors inline-block hover:translate-x-1 duration-300">Admissions</Link></li>
          <li><Link to="/calendar" className="hover:text-[#2f120d] transition-colors inline-block hover:translate-x-1 duration-300">Calendar</Link></li>
          <li><Link to="/notices" className="hover:text-[#2f120d] transition-colors inline-block hover:translate-x-1 duration-300">Notices</Link></li>
          <li><Link to="/fees" className="hover:text-[#2f120d] transition-colors inline-block hover:translate-x-1 duration-300">Fee Structure</Link></li>
          <li><Link to="/contact" className="hover:text-[#2f120d] transition-colors inline-block hover:translate-x-1 duration-300">Contact Us</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-lg text-[#5a2117] mb-4">Visit Us</h4>
        <ul className="space-y-3 text-sm text-[#5a2117]/82">
          <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[#5a2117] shrink-0" /> 108, Saraswati Marg, Bengaluru</li>
          <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-[#5a2117] shrink-0" /> +91 98765 43210</li>
          <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-[#5a2117] shrink-0" /> hello@vidyalaya.in</li>
        </ul>
      </div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="border-t border-[#5a2117]/12 py-5 text-center text-sm text-[#5a2117]/76"
    >
      © {new Date().getFullYear()} Vidyalaya · Crafted with devotion · शुभम् भवतु
    </motion.div>
  </footer>
);
