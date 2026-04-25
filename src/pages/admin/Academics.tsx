import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, X } from "lucide-react";

interface Department { id: number; name: string; description: string; }

const AdminAcademics = () => {
  const [curriculum, setCurriculum] = useState("CBSE affiliated curriculum from Class I to XII, integrating modern STEM education with Indian cultural values.");
  const [methodology, setMethodology] = useState("Activity-based learning, project work, Socratic discussions, and value-based education.");
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Science & Technology", description: "Physics, Chemistry, Biology, Computer Science with fully equipped labs." },
    { id: 2, name: "Humanities & Arts", description: "History, Geography, Political Science, Fine Arts, and Sanskrit." },
    { id: 3, name: "Commerce", description: "Accountancy, Business Studies, Economics, and Entrepreneurship." },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [saved, setSaved] = useState(false);

  const openAdd = () => { setEditing(null); setForm({ name: "", description: "" }); setShowForm(true); };
  const openEdit = (d: Department) => { setEditing(d); setForm({ name: d.name, description: d.description }); setShowForm(true); };
  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) setDepartments(departments.map(d => d.id === editing.id ? { ...editing, ...form } : d));
    else setDepartments([...departments, { id: Date.now(), ...form }]);
    setShowForm(false);
  };

  return (
    <AdminPageShell title="Academics" subtitle="Manage curriculum, departments and teaching methodology">
      <div className="bg-card rounded-xl border border-gold/15 p-6 space-y-5">
        <div className="space-y-1.5">
          <Label>Curriculum Overview</Label>
          <Textarea rows={3} value={curriculum} onChange={e => setCurriculum(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Teaching Methodology</Label>
          <Textarea rows={3} value={methodology} onChange={e => setMethodology(e.target.value)} />
        </div>
        <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} variant="hero" size="sm">
          {saved ? "Saved ✓" : "Save"}
        </Button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <h2 className="font-semibold text-secondary">Departments</h2>
        <Button onClick={openAdd} variant="hero" size="sm">+ Add Department</Button>
      </div>

      {showForm && (
        <div className="bg-card border border-gold/20 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{editing ? "Edit Department" : "New Department"}</h3>
            <button onClick={() => setShowForm(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="space-y-1.5">
            <Label>Department Name</Label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} variant="hero" size="sm">Save</Button>
            <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {departments.map(d => (
          <div key={d.id} className="bg-card rounded-xl border border-gold/15 p-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-medium text-secondary">{d.name}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{d.description}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(d)} className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Pencil className="h-3.5 w-3.5" /></button>
              <button onClick={() => setDepartments(departments.filter(x => x.id !== d.id))} className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminPageShell>
  );
};

export default AdminAcademics;
