import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen, FlaskConical, Palette, Trophy, Users, Award, Sparkles, ArrowRight, Quote,
} from "lucide-react";
import heroHome from "@/assets/schoolhome.png";

const features = [
  { icon: BookOpen, title: "Holistic Learning", desc: "Vedic wisdom blended with modern pedagogy for the whole child." },
  { icon: FlaskConical, title: "STEM Labs", desc: "State-of-the-art laboratories nurturing scientific curiosity." },
  { icon: Palette, title: "Arts & Sanskrit", desc: "Classical dance, music & language rooted in our culture." },
  { icon: Trophy, title: "Sportsmanship", desc: "Yoga, kabaddi, cricket — building strength and discipline." },
];

const stats = [
  { value: 20, suffix: "+", label: "Years of Legacy" },
  { value: 2400, label: "Happy Students", group: true },
  { value: 180, suffix: "+", label: "Devoted Teachers" },
  { value: 98, suffix: "%", label: "Board Results" },
];

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  group?: boolean;
}

const AnimatedCounter = ({ end, duration = 1.6, suffix = "", group = false }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frameId = 0;
    let startTime = 0;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(end * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration, end, isInView]);

  const display = group ? count.toLocaleString("en-IN") : String(count);
  return <span ref={ref}>{display}{suffix}</span>;
};

const Index = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <PageHero
        title={t("home.heroTitle")}
        sanskrit="॥ विद्यया अमृतमश्नुते ॥"
        subtitle={t("home.heroSubtitle")}
        image={heroHome}
        imageFit="cover"
        imagePosition="center center"
        size="full"
      >
        <Button asChild variant="hero" size="xl">
          <Link to="/admissions">{t("home.beginJourney")} <ArrowRight className={`h-5 w-5 ${language === "hi" ? "hidden" : ""}`} /></Link>
        </Button>
        <Button asChild variant="ornate" size="xl">
          <Link to="/about">{t("home.discoverUs")}</Link>
        </Button>
      </PageHero>

      {/* Stats */}
      <section className="container-narrow mt-10 md:mt-14 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl section-surface ornate-frame p-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient-saffron">
                <AnimatedCounter end={s.value} suffix={s.suffix} group={s.group} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container-narrow py-24 relative overflow-hidden">
        <MandalaBg className="absolute -right-40 top-20 w-96 h-96" />
        <SectionHeader
          eyebrow="॥ गुणाः ॥"
          title="Pillars of Our School"
          subtitle="Every petal of the lotus represents a value we cherish — wisdom, health, creativity, and character."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-2xl section-surface p-7 hover:border-gold/60 hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-saffron text-primary-foreground mb-5 shadow-gold group-hover:scale-110 transition-transform">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl mb-2 text-secondary">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cultural callout */}
      <section className="relative bg-gradient-festive text-primary-foreground overflow-hidden">
        <MandalaBg className="absolute -left-32 -top-32 w-[500px] h-[500px] opacity-20" />
        <MandalaBg className="absolute -right-40 -bottom-40 w-[500px] h-[500px] opacity-20" spin={false} />
        <div className="container-narrow relative py-20 text-center">
          <Sparkles className="h-10 w-10 text-gold mx-auto mb-5" />
          <p className="font-sanskrit text-2xl md:text-3xl mb-4 text-gold">
            असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।
          </p>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            "Lead us from the unreal to the real, from darkness unto light."
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="container-narrow py-24">
        <SectionHeader eyebrow="॥ अनुभवाः ॥" title="Voices of Our Parivaar" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Anjali Sharma", role: "Parent, Class VIII", text: "Vidyalaya gave my daughter the confidence of modern science and the grace of Bharatiya sanskaars." },
            { name: "Rahul Iyer", role: "Alumnus, Batch 2018", text: "My teachers shaped not only my mind, but my dharma. Forever grateful." },
            { name: "Meera Patel", role: "Parent, Class V", text: "Festivals, Sanskrit, robotics — all under one roof. Truly a school of Bharat." },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl section-surface p-7 shadow-soft hover:shadow-warm transition-all"
            >
              <Quote className="h-8 w-8 text-primary/40 mb-3" />
              <p className="text-foreground/85 leading-relaxed mb-5">{t.text}</p>
              <div className="border-t border-border pt-4">
                <div className="font-display text-secondary">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-narrow pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-peacock p-10 md:p-16 text-primary-foreground shadow-temple ornate-frame">
          <MandalaBg className="absolute -right-20 -top-20 w-80 h-80 opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_10%,hsl(43_88%_55%/0.2)_45%,transparent_80%)] animate-shimmer" />
          <div className="relative max-w-2xl">
            <Award className="h-10 w-10 text-gold mb-4" />
            <h3 className="font-display text-3xl md:text-5xl font-bold mb-4">Join the Vidyalaya Parivaar</h3>
            <p className="text-lg opacity-90 mb-8">Admissions open for 2026–27. Walk through our gates and feel the heritage.</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/admissions">Apply Today</Link>
              </Button>
              <Button asChild variant="ornate" size="xl" className="text-primary-foreground border-gold">
                <Link to="/contact">Schedule a Visit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
