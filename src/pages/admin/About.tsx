import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminAbout = () => {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    history: "Founded in 2005, Vidyalaya has been a beacon of holistic education rooted in Bharatiya values.",
    mission: "To nurture curious minds and noble hearts through a blend of modern education and ancient wisdom.",
    vision: "To be the leading institution that produces well-rounded, culturally grounded, and globally competent citizens.",
    values: "Integrity, Respect, Excellence, Service, Cultural Pride",
    principalName: "Dr. Ramesh Sharma",
    principalMessage: "Education is not just about academics — it is about shaping character, building resilience, and igniting the spirit of inquiry.",
    principalPhoto: "",
  });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <AdminPageShell title="About Us" subtitle="Edit school history, mission, vision, values and principal's message">
      <div className="bg-card rounded-xl border border-gold/15 p-6 space-y-6">
        <div className="space-y-1.5">
          <Label>School History</Label>
          <Textarea rows={3} value={form.history} onChange={e => setForm({ ...form, history: e.target.value })} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label>Mission</Label>
            <Textarea rows={3} value={form.mission} onChange={e => setForm({ ...form, mission: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Vision</Label>
            <Textarea rows={3} value={form.vision} onChange={e => setForm({ ...form, vision: e.target.value })} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Core Values (comma-separated)</Label>
          <Input value={form.values} onChange={e => setForm({ ...form, values: e.target.value })} />
        </div>
        <hr className="border-gold/15" />
        <h3 className="font-semibold text-secondary">Principal's Message</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Principal Name</Label>
            <Input value={form.principalName} onChange={e => setForm({ ...form, principalName: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Photo URL (optional)</Label>
            <Input value={form.principalPhoto} onChange={e => setForm({ ...form, principalPhoto: e.target.value })} placeholder="https://..." />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Message</Label>
          <Textarea rows={4} value={form.principalMessage} onChange={e => setForm({ ...form, principalMessage: e.target.value })} />
        </div>
        <Button onClick={handleSave} variant="hero" size="sm">
          {saved ? "Saved ✓" : "Save Changes"}
        </Button>
      </div>
    </AdminPageShell>
  );
};

export default AdminAbout;
