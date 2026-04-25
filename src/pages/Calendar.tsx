import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { calendarEvents } from "@/data/schoolData";
import { CalendarDays, MapPin } from "lucide-react";
import heroCalendar from "@/assets/hero-calendar.jpg";

type Filter = "All" | "Exam" | "Result" | "Holiday" | "Meeting" | "Event" | "Leave";

const CATEGORY_COLORS: Record<string, string> = {
  Exam:    "bg-red-100 text-red-700 border-red-200",
  Result:  "bg-blue-100 text-blue-700 border-blue-200",
  Holiday: "bg-green-100 text-green-700 border-green-200",
  Meeting: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Event:   "bg-purple-100 text-purple-700 border-purple-200",
  Leave:   "bg-orange-100 text-orange-700 border-orange-200",
};

const HEADER_COLORS: Record<string, string> = {
  Exam:    "bg-red-500",
  Result:  "bg-blue-500",
  Holiday: "bg-green-500",
  Meeting: "bg-yellow-500",
  Event:   "bg-purple-500",
  Leave:   "bg-orange-500",
};

const Calendar = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All"
    ? calendarEvents
    : calendarEvents.filter(e => e.category === filter);

  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        title="Academic Calendar"
        sanskrit="॥ काल एव परं बलम् ॥"
        subtitle="Exams, results, holidays, meetings and events — your complete academic year at a glance."
        image={heroCalendar}
      />

      <section className="container-narrow py-16">
        <SectionHeader
          eyebrow="॥ उत्सवाः ॥"
          title="All Events"
          subtitle="Filter by category to find what matters most to you."
        />

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["All", "Exam", "Result", "Holiday", "Meeting", "Event", "Leave"] as Filter[]).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filter === cat
                  ? "bg-primary text-white border-primary"
                  : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((event, i) => {
            const dateObj = new Date(event.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("en-IN", { month: "short" });
            return (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.07 }}
                className="bg-card rounded-2xl border border-gold/20 overflow-hidden shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex">
                  {/* Date block */}
                  <div className={`${HEADER_COLORS[event.category]} text-white p-4 text-center w-20 shrink-0 flex flex-col justify-center`}>
                    <div className="font-display text-3xl font-bold leading-none">{day}</div>
                    <div className="text-xs uppercase tracking-widest mt-1 opacity-90">{month}</div>
                  </div>
                  {/* Content */}
                  <div className="p-4 flex-1 min-w-0">
                    <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border font-medium ${CATEGORY_COLORS[event.category]}`}>
                      {event.category}
                    </span>
                    <h3 className="font-display text-base text-secondary mt-1.5 leading-snug">{event.title}</h3>
                    {event.endDate && (
                      <p className="text-xs text-muted-foreground mt-0.5">Until {new Date(event.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{event.description}</p>
                    {event.location && (
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No events in this category.</div>
        )}
      </section>

      {/* CTA */}
      <section className="container-narrow pb-20">
        <div className="rounded-3xl bg-gradient-festive text-primary-foreground p-10 text-center shadow-temple">
          <CalendarDays className="h-10 w-10 mx-auto text-gold mb-4" />
          <h3 className="font-display text-3xl mb-2">Stay in the Loop</h3>
          <p className="opacity-90 max-w-xl mx-auto">Subscribe for monthly newsletter with calendar updates, photo highlights and parent notes.</p>
        </div>
      </section>
    </>
  );
};

export default Calendar;
