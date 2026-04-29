import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { motion, AnimatePresence } from "framer-motion";
import { X, MailOpen, Mail, MessageSquare, Reply, Trash2, User, AtSign, Calendar } from "lucide-react";

interface Inquiry { id: number; name: string; email: string; subject: string; message: string; date: string; read: boolean; }

const seed: Inquiry[] = [
  { id: 1, name: "Sunita Verma",  email: "sunita@example.com",  subject: "Admission Query",    message: "I would like to know about the admission process for Class III.", date: "2026-01-14", read: false },
  { id: 2, name: "Rajesh Kumar",  email: "rajesh@example.com",  subject: "Fee Structure",       message: "Can you please share the fee structure for Class X?",            date: "2026-01-13", read: false },
  { id: 3, name: "Meena Joshi",   email: "meena@example.com",   subject: "Transport Facility",  message: "Does the school provide bus service from Sector 12?",            date: "2026-01-11", read: true },
  { id: 4, name: "Arjun Kapoor",  email: "arjun@example.com",   subject: "Scholarship Info",    message: "Are there any merit-based scholarships available for Class IX?",  date: "2026-01-10", read: true },
];

const AdminInquiries = () => {
  const [items, setItems] = useState<Inquiry[]>(seed);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const markRead = (id: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
  const handleOpen = (inq: Inquiry) => { markRead(inq.id); setSelected({ ...inq, read: true }); };

  const unread = items.filter(i => !i.read).length;

  return (
    <AdminPageShell title="Inquiries" subtitle={`${unread} unread message${unread !== 1 ? "s" : ""}`}>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total",   value: items.length,                          color: "from-blue-500 to-indigo-500",   bg: "bg-blue-50",   text: "text-blue-700" },
          { label: "Unread",  value: items.filter(i => !i.read).length,     color: "from-amber-400 to-orange-500",  bg: "bg-amber-50",  text: "text-amber-700" },
          { label: "Read",    value: items.filter(i => i.read).length,      color: "from-emerald-500 to-teal-500",  bg: "bg-emerald-50",text: "text-emerald-700" },
          { label: "Today",   value: 2,                                      color: "from-violet-500 to-purple-500", bg: "bg-violet-50", text: "text-violet-700" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="relative overflow-hidden rounded-2xl border border-gold/20 bg-card p-5 shadow-soft"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />
            <div className="font-display text-3xl font-bold text-secondary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Inbox */}
      <div className="rounded-2xl border border-gold/20 bg-card shadow-soft overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-md">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-secondary text-sm">Inbox</h2>
            <p className="text-xs text-muted-foreground">{items.length} messages</p>
          </div>
        </div>

        <div className="divide-y divide-gold/8">
          {items.map((inq, i) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`group flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-muted/20 transition-colors ${!inq.read ? "bg-primary/[0.03]" : ""}`}
              onClick={() => handleOpen(inq)}
            >
              {/* Avatar */}
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${!inq.read ? "bg-gradient-saffron text-white" : "bg-muted text-muted-foreground"}`}>
                {inq.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm ${!inq.read ? "font-bold text-secondary" : "font-medium text-foreground/80"}`}>{inq.name}</span>
                  <span className="text-[11px] text-muted-foreground shrink-0">{inq.date}</span>
                </div>
                <div className={`text-xs mt-0.5 ${!inq.read ? "font-semibold text-primary" : "text-muted-foreground"}`}>{inq.subject}</div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{inq.message}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!inq.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                <button
                  onClick={e => { e.stopPropagation(); setDeleteId(inq.id); }}
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 p-4"
            onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="bg-card rounded-2xl border border-gold/20 w-full max-w-md h-full max-h-[90vh] shadow-temple flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent shrink-0">
                <h2 className="font-display font-semibold text-secondary text-sm truncate pr-4">{selected.subject}</h2>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground shrink-0"><X className="h-4 w-4" /></button>
              </div>

              {/* Sender info */}
              <div className="px-6 py-4 border-b border-gold/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-saffron text-white text-lg font-bold shadow-gold">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-secondary">{selected.name}</div>
                    <div className="text-xs text-muted-foreground">{selected.email}</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {[
                  { icon: User,     label: "Name",    value: selected.name },
                  { icon: AtSign,   label: "Email",   value: selected.email },
                  { icon: Calendar, label: "Date",    value: selected.date },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl border border-gold/15 bg-background/60 px-4 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
                      <div className="text-sm font-medium text-secondary mt-0.5">{value}</div>
                    </div>
                  </div>
                ))}

                {/* Message */}
                <div className="rounded-xl border border-gold/15 bg-background/60 px-4 py-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Message</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selected.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-gold/15 shrink-0">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-saffron text-white text-sm font-semibold shadow-gold hover:opacity-90 transition-opacity"
                >
                  <Reply className="h-4 w-4" /> Reply via Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4"><Trash2 className="h-5 w-5 text-red-500" /></div>
              <h3 className="font-display font-semibold text-secondary mb-1">Delete Inquiry?</h3>
              <p className="text-sm text-muted-foreground mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => { setItems(items.filter(i => i.id !== deleteId)); setDeleteId(null); if (selected?.id === deleteId) setSelected(null); }} className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">Delete</button>
                <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 rounded-lg border border-gold/25 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AdminPageShell>
  );
};

export default AdminInquiries;
