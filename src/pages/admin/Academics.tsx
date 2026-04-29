import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil, Trash2, X, Plus, BookOpen, FlaskConical,
  GraduationCap, Save, CheckCircle2, Layers, ChevronRight,
} from "lucide-react";

interface Department { id: number; name: string; description: string; }

const DEPT_COLORS = [
  "from-amber-500 to-orange-500",
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-gold to-amber-400",
];

const AdminAcademics = () => {
  const [curriculum, setCurriculum] = useState(
    "CBSE affiliated curriculum from Class I to XII, integrating modern STEM education with Indian cultural values."
  );
  const [methodology, setMethodology] = useState(
    "Activity-based learning, project work, Socratic discussions, and value-based education."
  );
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Science & Technology", description: "Physics, Chemistry, Biology, Computer Science with fully equipped labs." },
    { id: 2, name: "Humanities & Arts", description: "History, Geography, Political Science, Fine Arts, and Sanskrit." },
    { id: 3, name: "Commerce", description: "Accountancy, Business Studies, Economics, and Entrepreneurship." },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [saved, setSaved] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setEditing(null); setForm({ name: "", description: "" }); setShowForm(true); };
  const openEdit = (d: Department) => { setEditing(d); setForm({ name: d.name, description: d.description }); setShowForm(true); };
  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) setDepartments(departments.map(d => d.id === editing.id ? { ...editing, ...form } : d));
    else setDepartments([...departments, { id: Date.now(), ...form }]);
    setShowForm(false);
  };
  const handleDelete = (id: number) => {
    setDepartments(departments.filter(x => x.id !== id));
    setDeleteId(null);
  };

  return (
    <AdminPageShell title="Academics" subtitle="Manage curriculum, departments and teaching methodology">

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: GraduationCap, label: "Total Departments", value: departments.length, color: "from-primary to-orange-400" },
          { icon: BookOpen, label: "Classes", value: "I – XII", color: "from-blue-500 to-indigo-500" },
          { icon: FlaskConical, label: "Labs", value: "6+", color: "from-emerald-500 to-teal-500" },
          { icon: Layers, label: "Curriculum", value: "CBSE", color: "from-gold to-amber-400" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-gold/20 bg-card p-5 shadow-soft"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-md mb-3`}>
              <s.icon className="h-4 w-4" />
            </div>
            <div className="font-display text-2xl font-bold text-secondary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Curriculum & Methodology ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-gold/20 bg-card shadow-soft overflow-hidden"
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-saffron text-white shadow-gold">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-secondary">Academic Overview</h2>
            <p className="text-xs text-muted-foreground">Curriculum and teaching methodology</p>
          </div>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-secondary">Curriculum Overview</Label>
            <Textarea
              rows={4}
              value={curriculum}
              onChange={e => setCurriculum(e.target.value)}
              className="resize-none border-gold/25 focus:border-primary/50 bg-background/60"
              placeholder="Describe the curriculum..."
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-secondary">Teaching Methodology</Label>
            <Textarea
              rows={4}
              value={methodology}
              onChange={e => setMethodology(e.target.value)}
              className="resize-none border-gold/25 focus:border-primary/50 bg-background/60"
              placeholder="Describe the teaching approach..."
            />
          </div>
        </div>
        <div className="px-6 pb-5">
          <Button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
            variant="hero"
            size="sm"
            className="gap-2"
          >
            {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Changes</>}
          </Button>
        </div>
      </motion.div>

      {/* ── Departments ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="rounded-2xl border border-gold/20 bg-card shadow-soft overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-secondary">Departments</h2>
              <p className="text-xs text-muted-foreground">{departments.length} department{departments.length !== 1 ? "s" : ""} configured</p>
            </div>
          </div>
          <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add Department
          </Button>
        </div>

        {/* Add / Edit form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-gold/15 bg-primary/[0.03]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-secondary text-sm">
                    {editing ? "Edit Department" : "New Department"}
                  </h3>
                  <button onClick={() => setShowForm(false)} className="p-1 rounded hover:bg-muted text-muted-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Department Name</Label>
                    <Input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Science & Technology"
                      className="border-gold/25 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</Label>
                    <Input
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Brief description of subjects..."
                      className="border-gold/25 focus:border-primary/50"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSave} variant="hero" size="sm" className="gap-1.5">
                    <Save className="h-3.5 w-3.5" /> {editing ? "Update" : "Add Department"}
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Department list */}
        <div className="divide-y divide-gold/10">
          {departments.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No departments yet. Click "Add Department" to get started.
            </div>
          )}
          {departments.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
            >
              {/* Colour dot */}
              <div className={`shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br ${DEPT_COLORS[i % DEPT_COLORS.length]} flex items-center justify-center text-white shadow-sm`}>
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-secondary text-sm">{d.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">{d.description}</div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => openEdit(d)}
                  className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  title="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(d.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-display text-center text-secondary font-semibold mb-1">Delete Department?</h3>
              <p className="text-sm text-muted-foreground text-center mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button onClick={() => handleDelete(deleteId)} size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                <Button onClick={() => setDeleteId(null)} variant="outline" size="sm" className="flex-1">Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AdminPageShell>
  );
};

export default AdminAcademics;
