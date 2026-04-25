import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  sanskrit?: string;
  subtitle?: string;
  image: string;
  align?: "center" | "left";
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  size?: "default" | "compact" | "full";
  children?: React.ReactNode;
}

export const PageHero = ({ title, sanskrit, subtitle, image, align = "center", imageFit = "cover", imagePosition = "center center", size = "default", children }: PageHeroProps) => (
  <section className={`relative w-full overflow-x-clip overflow-y-hidden bg-gradient-temple flex items-center ${
    size === "full"
      ? "min-h-[75vh] md:min-h-[88vh]"
      : size === "compact"
      ? "min-h-[54vh] md:min-h-[62vh]"
      : "min-h-[62vh] md:min-h-[72vh]"
  }`}>
    {/* Background image with layered gradients */}
    <div className="absolute inset-0 w-full h-full">
      <img
        src={image}
        alt=""
        aria-hidden
        style={{ objectPosition: imagePosition }}
        className={`absolute inset-0 h-full w-full opacity-95 animate-fade-in ${
          imageFit === "contain"
            ? "object-contain object-center"
            : "object-cover"
        }`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(20_40%_12%/0.14)_0%,hsl(20_40%_12%/0.26)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/28 via-background/8 to-background/10" />
      {/* Festive radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(22_88%_52%/0.12),transparent_55%),radial-gradient(circle_at_75%_70%,hsl(184_65%_32%/0.1),transparent_55%)]" />
    </div>

    <div className={`container-narrow relative w-full z-10 ${size === "compact" ? "py-10 md:py-14" : size === "full" ? "py-16 md:py-24" : "py-14 md:py-20"} ${align === "center" ? "text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`max-w-3xl px-1 md:px-0 ${align === "center" ? "mx-auto" : ""}`}
      >
        {sanskrit && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-sanskrit text-lg md:text-2xl tracking-wide text-gold mb-4 drop-shadow-[0_2px_8px_hsl(20_40%_12%/0.6)]"
          >
            {sanskrit}
          </motion.div>
        )}

        <h1 className={`font-display font-bold leading-tight drop-shadow-[0_10px_24px_hsl(20_40%_12%/0.62)] ${
          size === "compact" ? "text-3xl md:text-5xl lg:text-[3.4rem]" : "text-4xl md:text-6xl lg:text-[4rem]"
        }`}>
          <span
            className="bg-clip-text text-transparent animate-title-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(43 95% 86%) 0%, hsl(38 90% 68%) 28%, hsl(22 88% 58%) 55%, hsl(43 95% 86%) 100%)",
              backgroundSize: "200% auto",
            }}
          >
            {title}
          </span>
        </h1>

        {/* Animated divider with sparkle */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-6 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold animate-flame text-lg">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className={`text-background leading-relaxed drop-shadow-[0_4px_14px_hsl(20_40%_12%/0.6)] ${
              size === "compact" ? "mt-5 text-base md:text-lg" : "mt-6 text-lg md:text-xl"
            }`}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={`mt-8 flex flex-wrap gap-4 overflow-x-clip ${align === "center" ? "justify-center" : ""}`}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>

    {/* Bottom ornate wave divider */}
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <svg viewBox="0 0 1200 36" className="w-full h-6 fill-background" preserveAspectRatio="none">
        <path d="M0,36 Q300,10 600,20 T1200,20 L1200,36 Z" />
      </svg>
    </div>
  </section>
);
