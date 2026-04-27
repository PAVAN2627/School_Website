import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_SECRET_KEY, isAdminRegistered, saveAdminCredentials } from "@/lib/adminAuth";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter admin name.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.secretKey !== ADMIN_SECRET_KEY) {
      setError("Invalid secret key.");
      return;
    }

    saveAdminCredentials({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    localStorage.setItem("admin-auth", "true");
    setSuccess(true);

    setTimeout(() => {
      navigate("/admin");
    }, 1200);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-temple px-4">
        <div className="w-full max-w-sm bg-card rounded-2xl shadow-warm border border-gold/20 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-secondary mb-2">Admin Registered</h1>
          <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-temple px-4">
      <div className="w-full max-w-sm bg-card rounded-2xl shadow-warm border border-gold/20 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-saffron shadow-gold mb-3">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-secondary">Admin Register</h1>
          <p className="text-sm text-muted-foreground mt-1">Protected by secret key</p>
        </div>

        {isAdminRegistered() && (
          <p className="mb-4 rounded-lg border border-gold/25 bg-gold/10 px-3 py-2 text-xs text-secondary">
            Admin credentials already exist. Registering again will replace them.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Admin Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="School Admin"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Admin Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@school.in"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimum 6 characters"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPass((s) => !s)}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="secret">Secret Key</Label>
            <Input
              id="secret"
              value={form.secretKey}
              onChange={(e) => setForm({ ...form, secretKey: e.target.value })}
              placeholder="Enter admin secret key"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" variant="hero" className="w-full">Register Admin</Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-5">
          Already registered?{" "}
          <Link to="/admin/login" className="text-primary hover:underline">Go to Admin Login</Link>
        </p>

        <Link
          to="/"
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AdminRegister;
