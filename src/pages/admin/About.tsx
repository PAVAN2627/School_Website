import { ChangeEvent, useEffect, useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultFacilities, loadAboutFacilities, saveAboutFacilities, type AboutFacility } from "@/lib/aboutContent";

const AdminAbout = () => {
  const [saved, setSaved] = useState(false);
  const [facilities, setFacilities] = useState<AboutFacility[]>(defaultFacilities);
  const [form, setForm] = useState({
    history: "Founded in 2005, Vidyalaya has been a beacon of holistic education rooted in Bharatiya values.",
    mission: "To nurture curious minds and noble hearts through a blend of modern education and ancient wisdom.",
    vision: "To be the leading institution that produces well-rounded, culturally grounded, and globally competent citizens.",
    values: "Integrity, Respect, Excellence, Service, Cultural Pride",
    principalName: "Dr. Ramesh Sharma",
    principalMessage: "Education is not just about academics — it is about shaping character, building resilience, and igniting the spirit of inquiry.",
    principalPhoto: "",
  });

  useEffect(() => {
    setFacilities(loadAboutFacilities());
  }, []);

  const updateFacility = (index: number, field: keyof AboutFacility, value: string) => {
    setFacilities((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const handleImageUpload = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateFacility(index, "image", reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.currentTarget.value = "";
  };

  const addFacility = () => {
    setFacilities((prev) => [
      ...prev,
      { title: "", desc: "", image: "" },
    ]);
  };

  const removeFacility = (index: number) => {
    setFacilities((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const cleanFacilities = facilities
      .map((item) => ({
        title: item.title.trim(),
        desc: item.desc.trim(),
        image: item.image.trim(),
      }))
      .filter((item) => item.title && item.desc && item.image);

    saveAboutFacilities(cleanFacilities.length > 0 ? cleanFacilities : defaultFacilities);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

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
        <hr className="border-gold/15" />
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-secondary">Campus Facilities</h3>
          <Button type="button" onClick={addFacility} variant="outline" size="sm">Add Facility</Button>
        </div>
        <p className="text-xs text-muted-foreground">Upload a facility image or paste an image URL. These images are shown in the public About page scrolling gallery.</p>
        <div className="space-y-4">
          {facilities.map((facility, index) => (
            <div key={`${facility.title || "facility"}-${index}`} className="rounded-xl border border-gold/20 p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Facility Name</Label>
                  <Input
                    value={facility.title}
                    onChange={(e) => updateFacility(index, "title", e.target.value)}
                    placeholder="e.g. Robotics Lab"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Image URL</Label>
                  <Input
                    value={facility.image}
                    onChange={(e) => updateFacility(index, "image", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={facility.desc}
                  onChange={(e) => updateFacility(index, "desc", e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Label htmlFor={`facility-image-${index}`} className="text-xs text-primary">Upload Image</Label>
                <Input
                  id={`facility-image-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  className="max-w-xs"
                />
                {facilities.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeFacility(index)}>
                    Remove
                  </Button>
                )}
              </div>
              {facility.image && (
                <img src={facility.image} alt={facility.title || "Facility preview"} className="h-24 w-40 rounded-lg object-cover border border-gold/25" />
              )}
            </div>
          ))}
        </div>
        <Button onClick={handleSave} variant="hero" size="sm">
          {saved ? "Saved ✓" : "Save Changes"}
        </Button>
      </div>
    </AdminPageShell>
  );
};

export default AdminAbout;
