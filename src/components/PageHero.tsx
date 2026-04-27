import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  sanskrit?: string;
  subtitle?: string;
  image: string;
  mobileImage?: string;
  align?: "center" | "left";
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  size?: "default" | "compact" | "full";
  children?: React.ReactNode;
}

export const PageHero = ({ title, sanskrit, subtitle, image, mobileImage, align = "center", imageFit = "cover", imagePosition = "center center", size = "default", children }: PageHeroProps) => (
  <section className={`relative w-full overflow-x-clip bg-gradient-temple flex items-center ${
    size === "full"
      ? "min-h-[100svh] md:min-h-[88vh]"
      : size === "compact"
      ? "min-h-[70vh] md:min-h-[62vh]"
      : "min-h-[80vh] md:min-h-[72vh]"
  }`}>
    {/* Background image with layered gradients */}
    <div className="absolute inset-0 w-full h-full">
      {mobileImage ? (
        <picture className="absolute inset-0 h-full w-full">
          <source media="(max-width: 767px)" srcSet={mobileImage} />
          <img
            src={image}
            alt=""
            aria-hidden
            style={{ objectPosition: imagePosition }}
            className={`absolute inset-0 h-full w-full opacity-95 animate-fade-in ${
              imageFit === "contain" ? "object-contain object-center" : "object-cover object-center"
            }`}
          />
        </picture>
      ) : (
        <img
          src={image}
          alt=""
          aria-hidden
          style={{ objectPosition: imagePosition }}
          className={`absolute inset-0 h-full w-full opacity-95 animate-fade-in ${
            imageFit === "contain" ? "object-contain object-center" : "object-cover object-top md:object-center"
          }`}
        />
      )}
      {/* Strong dark scrim so text is always readable */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Warm gradient overlay for brand feel */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,hsl(20_60%_10%/0.55)_0%,hsl(20_40%_12%/0.25)_60%,transparent_100%)]" />
      {/* Festive radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(22_88%_52%/0.18),transparent_55%)]" />
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
            className={`text-white/90 leading-relaxed drop-shadow-[0_4px_14px_rgba(0,0,0,0.8)] ${
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
    <div className="absolute bottom-0 left-0 right-0 z-10 leading-none overflow-hidden">
      <svg
        viewBox="0 0 1440 120"
        className="block h-12 w-full md:h-16 fill-background"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,70 C220,38 420,42 620,60 C820,78 1040,82 1440,54 L1440,120 L0,120 Z" />
      </svg>
    </div>
  </section>
);
