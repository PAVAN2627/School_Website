import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X, FileText, Save, Plus, Download, School, Building2, AlertTriangle } from "lucide-react";

type NoticeCategory = "School Notice" | "Government Notice" | "Urgent Notice";

interface Notice { id: number; title: string; body: string; category: NoticeCategory; date: string; attachment?: string; }

const CATEGORY_CONFIG: Record<NoticeCategory, { bg: string; text: string; dot: string; icon: typeof School }> = {
  "School Notice":     { bg: "bg-blue-50",  text: "text-blue-700",  dot: "bg-blue-500",  icon: School },
  "Government Notice": { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", icon: Building2 },
  "Urgent Notice":     { bg: "bg-red-50",   text: "text-red-700",   dot: "bg-red-500",   icon: AlertTriangle },
};

const seed: Notice[] = [
  { id: 1, title: "Exam Schedule – Term 2", body: "Term 2 examinations will commence from 10th February 2026.", category: "School Notice", date: "2026-01-12" },
  { id: 2, title: "Government Circular – RTE", body: "All schools must comply with RTE norms for the academic year.", category: "Government Notice", date: "2026-01-09" },
  { id: 3, title: "Emergency Holiday – 15 Jan", body: "School will remain closed on 15th January due to local elections.", category: "Urgent Notice", date: "2026-01-08" },
];

const AdminNotices = () => {
  const [items, setItems] = useState<Notice[]>(seed);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [form, setForm] = useState({ title: "", body: "", category: "School Notice" as NoticeCategory, date: "", attachment: "" });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setEditing(null); setForm({ title: "", body: "", category: "School Notice", date: "", attachment: "" }); setShowForm(true); };
  const openEdit = (n: Notice) => { setEditing(n); setForm({ title: n.title, body: n.body, category: n.category, date: n.date, attachment: n.attachment || "" }); setShowForm(true); };
  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) setItems(items.map(i => i.id === editing.id ? { ...editing, ...form } : i));
    else setItems([{ id: Date.now(), ...form }, ...items]);
    setShowForm(false);
  };

  return (
    <AdminPageShell title="Notices" subtitle="Publish school, government and urgent notices" onAdd={openAdd} addLabel="Publish Notice">

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-2xl border border-gold/25 bg-card shadow-soft overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
                  <FileText className="h-4 w-4" />
                </div>
                <h2 className="font-display font-semibold text-secondary text-sm">{editing ? "Edit Notice" : "New Notice"}</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title</Label>
                  <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Notice title" className="border-gold/25 focus:border-primary/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</Label>
                  <select className="w-full h-10 border border-gold/25 rounded-lg px-3 text-sm bg-background focus:border-primary/50 focus:outline-none" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as NoticeCategory })}>
                    {(["School Notice", "Government Notice", "Urgent Notice"] as NoticeCategory[]).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="border-gold/25 focus:border-primary/50" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Content</Label>
                  <Textarea rows={3} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} className="resize-none border-gold/25 focus:border-primary/50" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Attachment URL <span className="text-muted-foreground/60 normal-case font-normal">(optional PDF link)</span></Label>
                  <Input value={form.attachment} onChange={e => setForm({ ...form, attachment: e.target.value })} placeholder="https://..." className="border-gold/25 focus:border-primary/50" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} variant="hero" size="sm" className="gap-1.5"><Save className="h-3.5 w-3.5" /> Publish</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notices list */}
      <div className="rounded-2xl border border-gold/20 bg-card shadow-soft overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-secondary text-sm">Published Notices</h2>
              <p className="text-xs text-muted-foreground">{items.length} notices</p>
            </div>
          </div>
          <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Add</Button>
        </div>
        <div className="divide-y divide-gold/8">
          {items.map((n, i) => {
            const cfg = CATEGORY_CONFIG[n.category];
            const CatIcon = cfg.icon;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-start gap-4 px-6 py-4 hover:bg-muted/20 transition-colors"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.bg} ${cfg.text} mt-0.5`}>
                  <CatIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-secondary text-sm">{n.title}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${cfg.bg} ${cfg.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      {n.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{n.body}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-muted-foreground">{n.date}</span>
                    {n.attachment && (
                      <a href={n.attachment} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline">
                        <Download className="h-3 w-3" /> PDF
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => openEdit(n)} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setDeleteId(n.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4"><Trash2 className="h-5 w-5 text-red-500" /></div>
              <h3 className="font-display font-semibold text-secondary mb-1">Delete Notice?</h3>
              <p className="text-sm text-muted-foreground mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button onClick={() => { setItems(items.filter(i => i.id !== deleteId)); setDeleteId(null); }} size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                <Button onClick={() => setDeleteId(null)} variant="outline" size="sm" className="flex-1">Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AdminPageShell>
  );
};

export default AdminNotices;
