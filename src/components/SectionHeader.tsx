import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export const SectionHeader = ({ eyebrow, title, subtitle, center = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    className={center ? "text-center max-w-3xl mx-auto mb-12" : "mb-12 max-w-3xl"}
  >
    {eyebrow && (
      <div className="divider-ornate mb-3">
        <span className="rounded-full border border-gold/40 px-4 py-1 font-sanskrit text-sm tracking-widest uppercase text-primary/95 bg-card/60 backdrop-blur-sm">
          {eyebrow}
        </span>
      </div>
    )}
    <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary leading-tight">
      {title}
    </h2>
    <div className={`mt-4 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent ${center ? "mx-auto" : ""}`} />
    {subtitle && <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
  </motion.div>
);
