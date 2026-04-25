import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, X } from "lucide-react";

interface FeeRecord { id: number; className: string; tuition: string; admission: string; exam: string; other: string; }

const seed: FeeRecord[] = [
  { id: 1, className: "Class I – II", tuition: "₹2,500/month", admission: "₹5,000", exam: "₹800", other: "₹500" },
  { id: 2, className: "Class III – V", tuition: "₹3,000/month", admission: "₹5,000", exam: "₹1,000", other: "₹500" },
  { id: 3, className: "Class VI – VIII", tuition: "₹3,500/month", admission: "₹6,000", exam: "₹1,200", other: "₹600" },
  { id: 4, className: "Class IX – X", tuition: "₹4,000/month", admission: "₹7,000", exam: "₹1,500", other: "₹700" },
  { id: 5, className: "Class XI – XII", tuition: "₹4,500/month", admission: "₹8,000", exam: "₹1,800", other: "₹800" },
];

const AdminFees = () => {
  const [items, setItems] = useState<FeeRecord[]>(seed);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<FeeRecord | null>(null);
  const [form, setForm] = useState({ className: "", tuition: "", admission: "", exam: "", other: "" });

  const openAdd = () => { setEditing(null); setForm({ className: "", tuition: "", admission: "", exam: "", other: "" }); setShowForm(true); };
  const openEdit = (f: FeeRecord) => { setEditing(f); setForm({ className: f.className, tuition: f.tuition, admission: f.admission, exam: f.exam, other: f.other }); setShowForm(true); };
  const handleSave = () => {
    if (!form.className.trim()) return;
    if (editing) setItems(items.map(i => i.id === editing.id ? { ...editing, ...form } : i));
    else setItems([...items, { id: Date.now(), ...form }]);
    setShowForm(false);
  };

  return (
    <AdminPageShell title="Fee Structure" subtitle="Manage class-wise fee details for students and parents" onAdd={openAdd} addLabel="Add Class Fees">
      {showForm && (
        <div className="bg-card border border-gold/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary">{editing ? "Edit Fee Record" : "New Fee Record"}</h2>
            <button onClick={() => setShowForm(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: "className", label: "Class / Grade" },
              { key: "tuition", label: "Tuition Fee" },
              { key: "admission", label: "Admission Fee" },
              { key: "exam", label: "Exam Fee" },
              { key: "other", label: "Other Charges" },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-1.5">
                <Label>{label}</Label>
                <Input value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={label} />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} variant="hero" size="sm">Save</Button>
            <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl border border-gold/15 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-gold/15">
            <tr>
              {["Class", "Tuition Fee", "Admission Fee", "Exam Fee", "Other", ""].map(h => (
                <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {items.map(f => (
              <tr key={f.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium text-secondary whitespace-nowrap">{f.className}</td>
                <td className="px-4 py-3 text-foreground/80">{f.tuition}</td>
                <td className="px-4 py-3 text-foreground/80">{f.admission}</td>
                <td className="px-4 py-3 text-foreground/80">{f.exam}</td>
                <td className="px-4 py-3 text-foreground/80">{f.other}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(f)} className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => setItems(items.filter(i => i.id !== f.id))} className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
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

export default AdminFees;
