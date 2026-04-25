import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Heart, Eye, Star, Users } from "lucide-react";
import heroAbout from "@/assets/hero-about.jpg";

const timeline = [
  { year: "2005", title: "Founding", desc: "Vidyalaya was founded with 60 students and a single banyan tree." },
  { year: "2012", title: "Campus Expansion", desc: "Added Saraswati Block — labs, library and a temple courtyard." },
  { year: "2018", title: "National Recognition", desc: "Awarded 'Best Heritage School' by Bharat Education Council." },
  { year: "2023", title: "Digital Transformation", desc: "Smart classrooms, robotics labs and a Vedic mathematics centre." },
];

const About = () => (
  <>
    <PageHero
      title="Our Story"
      sanskrit="॥ सत्यं शिवं सुन्दरम् ॥"
      subtitle="Two decades of nurturing children with the wisdom of our ancestors and the tools of tomorrow."
      image={heroAbout}
    />

    {/* Mission Vision Values */}
    <section className="container-narrow py-20 relative">
      <MandalaBg className="absolute left-0 top-10 w-80 h-80 opacity-10" />
      <div className="grid md:grid-cols-3 gap-6 relative">
        {[
          { icon: Heart, title: "Mission", desc: "To nurture holistic excellence through inclusive education that honours our heritage and embraces innovation." },
          { icon: Eye, title: "Vision", desc: "A future-ready learning community rooted in Indian ethos, shaping global citizens with dharmic values." },
          { icon: Star, title: "Values", desc: "Respect, Integrity, Curiosity, Compassion — the four pillars of every Vidyalaya child." },
        ].map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-card p-8 border border-gold/30 shadow-soft hover:shadow-warm transition-all"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-festive text-primary-foreground mb-5 shadow-warm">
              <m.icon className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl text-secondary mb-3">{m.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="bg-gradient-temple py-20">
      <div className="container-narrow">
        <SectionHeader eyebrow="॥ इतिहासः ॥" title="Our Journey" subtitle="Milestones along our two-decade path of dharmic education." />
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-gold to-secondary -translate-x-1/2" />
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-6 mb-10 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right md:flex-row-reverse"}`}
            >
              <div className={`absolute top-3 h-4 w-4 rounded-full bg-gradient-saffron shadow-gold ring-4 ring-background ${i % 2 ? "md:-left-2" : "md:-right-2"} left-2 md:left-auto`} />
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pl-0" : ""} flex-1`}>
                <div className="font-display text-3xl text-primary">{item.year}</div>
                <h4 className="font-display text-xl text-secondary mt-1 mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Principal */}
    <section className="container-narrow py-20">
      <div className="rounded-3xl bg-card border border-gold/30 shadow-temple p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1 flex justify-center">
          <div className="relative">
            <MandalaBg className="absolute inset-0 w-full h-full" />
            <div className="relative h-48 w-48 rounded-full bg-gradient-festive flex items-center justify-center text-6xl shadow-temple">
              🙏
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <Users className="h-8 w-8 text-primary mb-3" />
          <p className="font-sanskrit text-xl text-primary mb-3">
            "आचार्यदेवो भव"
          </p>
          <p className="text-lg text-foreground/85 italic leading-relaxed mb-4">
            "Education is not the filling of a vessel, but the kindling of a flame. At Vidyalaya, we kindle that flame with the oil of tradition and the wick of innovation."
          </p>
          <div className="font-display text-xl text-secondary">Dr. Arvind Krishnan</div>
          <div className="text-sm text-muted-foreground">Principal, Vidyalaya</div>
        </div>
      </div>
    </section>
  </>
);

export default About;
