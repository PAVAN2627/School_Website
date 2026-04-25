import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, X } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  body: string;
  date: string;
  category: string;
}

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

  const openAdd = () => { setEditing(null); setForm({ title: "", body: "", date: "", category: "General" }); setShowForm(true); };
  const openEdit = (a: Announcement) => { setEditing(a); setForm({ title: a.title, body: a.body, date: a.date, category: a.category }); setShowForm(true); };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) {
      setItems(items.map(i => i.id === editing.id ? { ...editing, ...form } : i));
    } else {
      setItems([{ id: Date.now(), ...form }, ...items]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => setItems(items.filter(i => i.id !== id));

  return (
    <AdminPageShell title="Announcements" subtitle="Manage school announcements and news" onAdd={openAdd} addLabel="New Announcement">
      {showForm && (
        <div className="bg-card border border-gold/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary">{editing ? "Edit Announcement" : "New Announcement"}</h2>
            <button onClick={() => setShowForm(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Announcement title" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {["General", "Exam", "Event", "Holiday", "Urgent"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Content</Label>
            <Textarea rows={3} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Announcement details..." />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} variant="hero" size="sm">Save</Button>
            <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl border border-gold/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-gold/15">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {items.map(a => (
              <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.body}</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">{a.category}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(a)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => handleDelete(a.id)} className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageShell>
  );
};

export default AdminAnnouncements;
