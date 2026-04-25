import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, X } from "lucide-react";

const CATEGORIES = ["Exam", "Result", "Holiday", "Meeting", "Event", "Leave"];
const COLORS: Record<string, string> = {
  Exam: "bg-red-100 text-red-600",
  Result: "bg-blue-100 text-blue-600",
  Holiday: "bg-green-100 text-green-600",
  Meeting: "bg-yellow-100 text-yellow-600",
  Event: "bg-purple-100 text-purple-600",
  Leave: "bg-orange-100 text-orange-600",
};

interface CalEvent { id: number; title: string; date: string; endDate?: string; category: string; description: string; location?: string; }

const seed: CalEvent[] = [
  { id: 1, title: "Term 2 Exams Begin", date: "2026-02-10", endDate: "2026-02-20", category: "Exam", description: "Term 2 examinations for all classes.", location: "School Campus" },
  { id: 2, title: "Republic Day", date: "2026-01-26", category: "Holiday", description: "National holiday." },
  { id: 3, title: "Parent-Teacher Meeting", date: "2026-02-05", category: "Meeting", description: "PTM for Classes VI–X.", location: "School Hall" },
];

const AdminCalendarEvents = () => {
  const [items, setItems] = useState<CalEvent[]>(seed);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CalEvent | null>(null);
  const [form, setForm] = useState({ title: "", date: "", endDate: "", category: "Event", description: "", location: "" });
  const [filter, setFilter] = useState("All");

  const openAdd = () => { setEditing(null); setForm({ title: "", date: "", endDate: "", category: "Event", description: "", location: "" }); setShowForm(true); };
  const openEdit = (e: CalEvent) => { setEditing(e); setForm({ title: e.title, date: e.date, endDate: e.endDate || "", category: e.category, description: e.description, location: e.location || "" }); setShowForm(true); };

  const handleSave = () => {
    if (!form.title.trim() || !form.date) return;
    if (editing) setItems(items.map(i => i.id === editing.id ? { ...editing, ...form } : i));
    else setItems([{ id: Date.now(), ...form }, ...items]);
    setShowForm(false);
  };

  const filtered = filter === "All" ? items : items.filter(i => i.category === filter);

  return (
    <AdminPageShell title="Calendar Events" subtitle="Manage academic calendar — exams, holidays, meetings & events" onAdd={openAdd} addLabel="Add Event">
      {showForm && (
        <div className="bg-card border border-gold/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary">{editing ? "Edit Event" : "New Event"}</h2>
            <button onClick={() => setShowForm(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <Label>Event Title</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Event name" />
            </div>
            <div className="space-y-1.5">
              <Label>Start Date</Label>
              <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>End Date (optional)</Label>
              <Input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Location (optional)</Label>
              <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. School Hall" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Description</Label>
              <Textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} variant="hero" size="sm">Save</Button>
            <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${filter === c ? "bg-primary text-white border-primary" : "border-gold/20 text-muted-foreground hover:border-primary/40"}`}>{c}</button>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-gold/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-gold/15">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Event</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {filtered.map(ev => (
              <tr key={ev.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium">{ev.title}</div>
                  {ev.location && <div className="text-xs text-muted-foreground">{ev.location}</div>}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{ev.date}{ev.endDate ? ` → ${ev.endDate}` : ""}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${COLORS[ev.category] || "bg-gray-100 text-gray-600"}`}>{ev.category}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(ev)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => setItems(items.filter(i => i.id !== ev.id))} className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
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

export default AdminCalendarEvents;
