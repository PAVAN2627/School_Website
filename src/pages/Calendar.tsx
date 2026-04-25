import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Calendar as CalIcon } from "lucide-react";
import heroCalendar from "@/assets/hero-calendar.jpg";

const events = [
  { date: "15 Aug", month: "Aug", title: "Independence Day", type: "National", desc: "Flag hoisting, cultural programme and patriotic song competition.", color: "from-primary to-gold" },
  { date: "07 Sep", month: "Sep", title: "Ganesh Chaturthi", type: "Festival", desc: "Eco-friendly Ganesha making workshop and prayers." },
  { date: "02 Oct", month: "Oct", title: "Gandhi Jayanti", type: "National", desc: "Service projects and storytelling on Bapu's life." },
  { date: "21 Oct", month: "Oct", title: "Diwali Mela", type: "Festival", desc: "Diya decoration, rangoli competition and family festival." },
  { date: "12 Nov", month: "Nov", title: "Annual Sports Day", type: "School", desc: "Yoga showcase, kabaddi finals and athletics championship." },
  { date: "10 Jan", month: "Jan", title: "Republic Day Prep", type: "National", desc: "Parade rehearsals begin with all houses." },
  { date: "14 Jan", month: "Jan", title: "Pongal & Lohri", type: "Festival", desc: "Regional harvest celebrations across campus." },
  { date: "08 Mar", month: "Mar", title: "Holi Utsav", type: "Festival", desc: "Colours, sweets, music and dance for the whole parivaar." },
  { date: "20 Apr", month: "Apr", title: "Annual Day", type: "School", desc: "Grand cultural showcase by every grade." },
];

const typeColor: Record<string, string> = {
  Festival: "bg-primary/10 text-primary border-primary/30",
  National: "bg-secondary/10 text-secondary border-secondary/30",
  School: "bg-accent/10 text-accent border-accent/30",
};

const Calendar = () => (
  <>
    <PageHero
      title="School Calendar"
      sanskrit="॥ काल एव परं बलम् ॥"
      subtitle="A year full of festivals, milestones and joyful learning moments."
      image={heroCalendar}
    />

    <section className="container-narrow py-20">
      <SectionHeader
        eyebrow="॥ उत्सवाः ॥"
        title="Upcoming Events"
        subtitle="From Ganesh Chaturthi to Holi — every festival becomes a learning experience."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e, i) => (
          <motion.article
            key={e.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.08 }}
            className="group rounded-2xl bg-card border border-gold/30 overflow-hidden shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex">
              <div className="bg-gradient-festive text-primary-foreground p-5 text-center w-24 shrink-0 flex flex-col justify-center">
                <div className="font-display text-3xl font-bold leading-none">{e.date.split(" ")[0]}</div>
                <div className="text-xs uppercase tracking-widest mt-1 text-gold">{e.month}</div>
              </div>
              <div className="p-5 flex-1">
                <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-1 rounded border ${typeColor[e.type]}`}>{e.type}</span>
                <h3 className="font-display text-xl text-secondary mt-2 mb-1">{e.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>

    <section className="container-narrow pb-20">
      <div className="rounded-3xl bg-gradient-festive text-primary-foreground p-10 text-center shadow-temple">
        <CalIcon className="h-10 w-10 mx-auto text-gold mb-4" />
        <h3 className="font-display text-3xl mb-2">Stay in the Loop</h3>
        <p className="opacity-90 max-w-xl mx-auto">Subscribe for monthly newsletter with calendar updates, photo highlights and parent notes.</p>
      </div>
    </section>
  </>
);

export default Calendar;
