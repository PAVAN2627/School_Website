import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, X, FileText } from "lucide-react";

type NoticeCategory = "School Notice" | "Government Notice" | "Urgent Notice";

interface Notice { id: number; title: string; body: string; category: NoticeCategory; date: string; attachment?: string; }

const COLORS: Record<NoticeCategory, string> = {
  "School Notice": "bg-blue-100 text-blue-700",
  "Government Notice": "bg-green-100 text-green-700",
  "Urgent Notice": "bg-red-100 text-red-700",
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
      {showForm && (
        <div className="bg-card border border-gold/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary">{editing ? "Edit Notice" : "New Notice"}</h2>
            <button onClick={() => setShowForm(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Notice title" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as NoticeCategory })}>
                {(["School Notice", "Government Notice", "Urgent Notice"] as NoticeCategory[]).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Content</Label>
              <Textarea rows={3} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Attachment URL (PDF link, optional)</Label>
              <Input value={form.attachment} onChange={e => setForm({ ...form, attachment: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} variant="hero" size="sm">Publish</Button>
            <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(n => (
          <div key={n.id} className="bg-card rounded-xl border border-gold/15 p-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-secondary">{n.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${COLORS[n.category]}`}>{n.category}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{n.body}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                  {n.attachment && <a href={n.attachment} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">Download PDF</a>}
                </div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(n)} className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Pencil className="h-3.5 w-3.5" /></button>
              <button onClick={() => setItems(items.filter(i => i.id !== n.id))} className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminPageShell>
  );
};

export default AdminNotices;
