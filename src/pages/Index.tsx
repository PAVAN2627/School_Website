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
  Megaphone, FileText, Wallet, CalendarDays,
} from "lucide-react";
import heroHome from "@/assets/newherosection.png";
import heroHomeMobile from "@/assets/mobilevertficateimage.png";
import { announcements, calendarEvents, notices } from "@/data/schoolData";

const features = [
  { icon: BookOpen, title: "Supportive Learning", desc: "Balanced teaching, regular guidance, and personal attention for every child." },
  { icon: FlaskConical, title: "Science Labs", desc: "Well-equipped labs that make science practical, fun, and easy to understand." },
  { icon: Palette, title: "Arts & Activities", desc: "Music, art, and creative programs that help students express themselves." },
  { icon: Trophy, title: "Sports & Fitness", desc: "Outdoor games, yoga, and fitness activities for healthy growth." },
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
        mobileImage={heroHomeMobile}
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

      {/* Announcements + Upcoming Events */}
      <section className="container-narrow mt-12 grid gap-6 md:grid-cols-2">
        {/* Announcements */}
        <div className="group overflow-hidden rounded-3xl border border-gold/20 bg-card/90 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm">
          <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4 md:px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-saffron text-primary-foreground shadow-gold">
                <Megaphone className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display text-xl text-secondary">Announcements</h3>
                <p className="text-xs text-muted-foreground">Latest circulars and school updates</p>
              </div>
            </div>
            <Link to="/notices" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <ul className="p-4 md:p-5 space-y-3">
            {announcements.slice(0, 4).map(a => (
              <li
                key={a.id}
                className="rounded-2xl border border-gold/15 bg-background/70 p-4 transition-colors hover:border-gold/30 hover:bg-background"
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-1 shrink-0 h-2.5 w-2.5 rounded-full ${a.category === "Urgent" ? "bg-red-500" : a.category === "Exam" ? "bg-blue-500" : "bg-primary"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm md:text-[0.98rem] font-medium text-foreground/90 leading-snug">{a.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                        {a.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{a.date}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="group overflow-hidden rounded-3xl border border-gold/20 bg-card/90 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm">
          <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4 md:px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-saffron text-primary-foreground shadow-gold">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display text-xl text-secondary">Upcoming Events</h3>
                <p className="text-xs text-muted-foreground">Important dates and school activities</p>
              </div>
            </div>
            <Link to="/calendar" className="text-xs text-primary hover:underline">Full calendar</Link>
          </div>
          <ul className="p-4 md:p-5 space-y-3">
            {calendarEvents.slice(0, 4).map(e => {
              const d = new Date(e.date);
              return (
                <li key={e.id} className="rounded-2xl border border-gold/15 bg-background/70 p-4 transition-colors hover:border-gold/30 hover:bg-background">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-2xl border border-gold/20 bg-gradient-to-br from-primary/10 to-gold/10 px-3 py-2 text-center min-w-[3.5rem]">
                      <div className="font-display text-2xl font-bold text-primary leading-none">{d.getDate()}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{d.toLocaleString("en-IN", { month: "short" })}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm md:text-[0.98rem] font-medium text-foreground/90 leading-snug">{e.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                          {e.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{e.date}</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container-narrow mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { to: "/notices", icon: FileText, label: "Notices", sub: "Circulars & updates" },
          { to: "/fees", icon: Wallet, label: "Fee Structure", sub: "Class-wise fees" },
          { to: "/calendar", icon: CalendarDays, label: "Calendar", sub: "Exams & events" },
          { to: "/admissions", icon: BookOpen, label: "Admissions", sub: "Apply for 2026–27" },
        ].map(({ to, icon: Icon, label, sub }) => (
          <Link
            key={to}
            to={to}
            className="bg-card rounded-2xl border border-gold/20 p-4 flex items-center gap-3 hover:shadow-warm hover:border-gold/50 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-saffron group-hover:text-white transition-all">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-sm text-secondary">{label}</div>
              <div className="text-xs text-muted-foreground">{sub}</div>
            </div>
          </Link>
        ))}
      </section>

      {/* Features */}
      <section className="container-narrow py-24 relative overflow-hidden">
        <MandalaBg className="absolute -right-64 -top-20 h-[30rem] w-[30rem] opacity-35 hidden lg:block z-0" />
        <div className="relative z-10">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Pillars of Our School"
            subtitle="A simple, caring school environment where children can learn, grow, and feel confident every day."
          />
        </div>
        <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative h-full overflow-hidden rounded-3xl border border-gold/20 bg-card/90 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-warm"
            >
              <div className="h-2 w-full bg-gradient-festive" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_90%_10%,hsl(43_88%_55%/0.14),transparent_48%)]" />
              <div className="relative z-10 flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-saffron text-primary-foreground shadow-gold transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="h-7 w-7 drop-shadow-[0_1px_0_hsl(0_0%_100%/0.25)]" />
                  </div>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl md:text-[1.65rem] text-secondary leading-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm md:text-[0.98rem] leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>

                <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <span>School Life</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>
              </div>
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
      <section className="container-narrow pb-10 md:pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,hsl(22_88%_48%)_0%,hsl(38_95%_61%)_42%,hsl(43_95%_84%)_100%)] p-10 md:p-16 text-secondary shadow-temple ornate-frame">
          <MandalaBg
            className="absolute -right-20 -top-20 w-80 h-80 opacity-50"
            style={{
              filter: "sepia(1) saturate(1.05) hue-rotate(338deg) brightness(0.52) contrast(1.18)",
              mixBlendMode: "multiply",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_10%,hsl(43_95%_78%/0.18)_45%,transparent_80%)] animate-shimmer" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,hsl(43_95%_88%/0.20),transparent_34%),radial-gradient(circle_at_85%_0%,hsl(22_88%_52%/0.12),transparent_30%)]" />
          <div className="relative max-w-2xl">
            <Award className="h-10 w-10 text-secondary mb-4" />
            <h3 className="font-display text-3xl md:text-5xl font-bold mb-4">Join the Vidyalaya Parivaar</h3>
            <p className="text-lg opacity-90 mb-8">Admissions open for 2026–27. Walk through our gates and feel the heritage.</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/admissions">Apply Today</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-secondary/20 bg-white/60 text-secondary hover:bg-white/80">
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
