import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X, Megaphone, Save, Plus } from "lucide-react";

interface Announcement { id: number; title: string; body: string; date: string; category: string; }

const CATEGORY_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  General: { bg: "bg-slate-100",  text: "text-slate-700",  dot: "bg-slate-400" },
  Exam:    { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-500" },
  Event:   { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
  Holiday: { bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500" },
  Urgent:  { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500" },
};

const seed: Announcement[] = [
  { id: 1, title: "Annual Sports Day", body: "Annual Sports Day will be held on 15th Feb 2026.", date: "2026-01-10", category: "Event" },
  { id: 2, title: "Exam Schedule Released", body: "Term 2 exam schedule is now available.", date: "2026-01-08", category: "Exam" },
  { id: 3, title: "Republic Day Celebration", body: "School will celebrate Republic Day on 26th Jan.", date: "2026-01-05", category: "Holiday" },
];

const AdminAnnouncements = () => {
  const [items, setItems] = useState<Announcement[]>(seed);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState({ title: "", body: "", date: "", category: "General" });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setEditing(null); setForm({ title: "", body: "", date: "", category: "General" }); setShowForm(true); };
  const openEdit = (a: Announcement) => { setEditing(a); setForm({ title: a.title, body: a.body, date: a.date, category: a.category }); setShowForm(true); };
  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) setItems(items.map(i => i.id === editing.id ? { ...editing, ...form } : i));
    else setItems([{ id: Date.now(), ...form }, ...items]);
    setShowForm(false);
  };

  return (
    <AdminPageShell title="Announcements" subtitle="Manage school announcements and news" onAdd={openAdd} addLabel="New Announcement">

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-gold/25 bg-card shadow-soft overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-saffron text-white shadow-gold">
                  <Megaphone className="h-4 w-4" />
                </div>
                <h2 className="font-display font-semibold text-secondary text-sm">
                  {editing ? "Edit Announcement" : "New Announcement"}
                </h2>
              </div>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title</Label>
                  <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Announcement title" className="border-gold/25 focus:border-primary/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</Label>
                  <select className="w-full h-10 border border-gold/25 rounded-lg px-3 text-sm bg-background focus:border-primary/50 focus:outline-none" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {["General", "Exam", "Event", "Holiday", "Urgent"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="border-gold/25 focus:border-primary/50" />
                </div>
                <div className="md:col-span-3 space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Content</Label>
                  <Textarea rows={3} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Announcement details..." className="resize-none border-gold/25 focus:border-primary/50" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} variant="hero" size="sm" className="gap-1.5"><Save className="h-3.5 w-3.5" /> Save</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="rounded-2xl border border-gold/20 bg-card shadow-soft overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-saffron text-white shadow-gold">
              <Megaphone className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-secondary text-sm">All Announcements</h2>
              <p className="text-xs text-muted-foreground">{items.length} total</p>
            </div>
          </div>
          <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/10 bg-muted/20">
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/8">
              {items.map((a, i) => {
                const cfg = CATEGORY_CONFIG[a.category] || CATEGORY_CONFIG.General;
                return (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="group hover:bg-muted/25 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <div className="font-semibold text-secondary text-sm">{a.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.body}</div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {a.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground hidden md:table-cell">{a.date}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setDeleteId(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4"><Trash2 className="h-5 w-5 text-red-500" /></div>
              <h3 className="font-display font-semibold text-secondary mb-1">Delete Announcement?</h3>
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

export default AdminAnnouncements;
