import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardList, FileText, UserCheck, GraduationCap, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import heroAdmissions from "@/assets/hero-admissions.jpg";

const steps = [
  { icon: ClipboardList, title: "Inquiry", desc: "Reach out — share your child's interests with us." },
  { icon: FileText, title: "Application", desc: "Complete the online application with required documents." },
  { icon: UserCheck, title: "Assessment", desc: "An informal interaction to know your child better." },
  { icon: GraduationCap, title: "Enrollment", desc: "Welcome to the Vidyalaya parivaar with a sacred ceremony." },
];

const Admissions = () => {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Application received! We'll be in touch soon. 🪔");
  };

  return (
    <>
      <PageHero
        title="Admissions Open"
        sanskrit="॥ स्वागतम् ॥"
        subtitle="Every child carries a divine spark. Help us help yours shine brightly."
        image={heroAdmissions}
      />

      {/* Process */}
      <section className="container-narrow py-20">
        <SectionHeader eyebrow="॥ प्रक्रिया ॥" title="Four Simple Steps" subtitle="A welcoming path from inquiry to enrollment." />
        <div className="relative grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-festive text-primary-foreground shadow-temple mb-4 relative z-10">
                <s.icon className="h-9 w-9" />
              </div>
              <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent hidden md:block" style={{ display: i === steps.length - 1 ? "none" : "" }} />
              <div className="font-display text-xs text-primary mb-1">STEP {i + 1}</div>
              <h3 className="font-display text-xl text-secondary mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-gradient-temple py-20">
        <div className="container-narrow grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <SectionHeader eyebrow="॥ माहिती ॥" title="What You'll Need" center={false} />
            <ul className="space-y-3">
              {[
                "Birth certificate of the child",
                "Previous school transfer certificate (if any)",
                "Two recent passport-size photographs",
                "Aadhaar card of parent and child",
                "Address proof",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-card p-6 border border-gold/30 shadow-soft">
              <p className="font-sanskrit text-lg text-primary mb-2">॥ शिक्षणं परम बलम् ॥</p>
              <p className="text-sm text-muted-foreground">"Education is the supreme strength." Apply for academic year 2026–27 before <span className="font-semibold text-secondary">31st January</span>.</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card p-8 md:p-10 border border-gold/30 shadow-temple">
              <h3 className="font-display text-2xl text-secondary mb-1">Application Form</h3>
              <p className="text-sm text-muted-foreground mb-6">We'll respond within two working days.</p>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🪔</div>
                  <h4 className="font-display text-2xl text-primary mb-2">Dhanyavaad!</h4>
                  <p className="text-muted-foreground">Your application has been received. We'll reach out shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parent">Parent Name</Label>
                      <Input id="parent" required placeholder="Your name" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="child">Child Name</Label>
                      <Input id="child" required placeholder="Child's name" className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="you@example.com" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" required placeholder="+91 ..." className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="grade">Applying for Grade</Label>
                    <Input id="grade" required placeholder="e.g. Grade 5" className="mt-1.5" />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">Submit Application</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admissions;
