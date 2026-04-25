import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { FlaskConical, Palette, Calculator, Trophy, BookOpen, Music } from "lucide-react";
import heroAcademics from "@/assets/hero-academics.jpg";

const streams = [
  { icon: FlaskConical, name: "Science", desc: "STEM Labs, Robotics Club, Vedic Astronomy" },
  { icon: Palette, name: "Arts", desc: "Classical Dance, Visual Arts, Drama" },
  { icon: Calculator, name: "Commerce", desc: "Entrepreneurship, Accounting, Bharat Markets" },
  { icon: Trophy, name: "Sports", desc: "Yoga, Kabaddi, Cricket, Athletics" },
  { icon: BookOpen, name: "Languages", desc: "Sanskrit, Hindi, English, Tamil" },
  { icon: Music, name: "Music", desc: "Carnatic, Hindustani, Tabla, Veena" },
];

const stages = [
  { stage: "Bal Vatika", grades: "Pre-K – KG", desc: "Play-based learning rooted in stories from the Panchatantra." },
  { stage: "Prathama", grades: "Grades 1–5", desc: "Foundational literacy, Sanskrit shlokas, and curiosity-driven projects." },
  { stage: "Madhyama", grades: "Grades 6–8", desc: "STEM, arts and Vedic mathematics — building character and competence." },
  { stage: "Uttama", grades: "Grades 9–12", desc: "Board excellence, electives, and global readiness with rooted values." },
];

const Academics = () => (
  <>
    <PageHero
      title="Academics & Curriculum"
      sanskrit="॥ सा विद्या या विमुक्तये ॥"
      subtitle="A curriculum where Vedic mathematics and quantum physics share the same blackboard."
      image={heroAcademics}
    />

    {/* Streams */}
    <section className="container-narrow py-20">
      <SectionHeader eyebrow="॥ विद्याशाखाः ॥" title="Streams of Knowledge" subtitle="Six branches of the kalpavriksha — choose your path." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-2xl bg-gradient-temple p-7 border-2 border-gold/40 hover:border-primary hover:shadow-warm transition-all duration-300"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-primary mb-4 shadow-soft group-hover:bg-gradient-saffron group-hover:text-primary-foreground transition-colors">
              <s.icon className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl text-secondary mb-2">{s.name}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Stages */}
    <section className="bg-gradient-temple py-20">
      <div className="container-narrow">
        <SectionHeader eyebrow="॥ आश्रमाः ॥" title="Stages of Learning" subtitle="Like the four ashrams of life, our journey unfolds in mindful stages." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((s, i) => (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-card p-6 border border-gold/30 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all"
            >
              <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">{s.grades}</div>
              <h3 className="font-display text-2xl text-secondary mb-3">{s.stage}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Special programs */}
    <section className="container-narrow py-20">
      <SectionHeader eyebrow="॥ विशेषाः ॥" title="Beyond the Classroom" />
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "Sanskrit & Shlokas", desc: "Daily morning chanting and Sanskrit conversation for grades 3+." },
          { title: "Yoga & Pranayama", desc: "Mindful movement woven into every school day." },
          { title: "Festival Workshops", desc: "Hands-on rangoli, diya making, kite building and more." },
          { title: "Bharat Heritage Tours", desc: "Annual visits to Hampi, Khajuraho, Nalanda and Konark." },
        ].map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-5 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-saffron text-primary-foreground font-display text-lg shadow-gold">
              {i + 1}
            </div>
            <div>
              <h4 className="font-display text-xl text-secondary mb-1">{p.title}</h4>
              <p className="text-muted-foreground">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </>
);

export default Academics;
