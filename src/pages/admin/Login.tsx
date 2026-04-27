import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAdminRegistered, validateAdminLogin } from "@/lib/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdminLogin(form.email.trim(), form.password)) {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-temple px-4">
      <div className="w-full max-w-sm bg-card rounded-2xl shadow-warm border border-gold/20 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-saffron shadow-gold mb-3">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-secondary">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Vidyalaya Management Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Admin Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@school.in"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" variant="hero" className="w-full mt-2">Sign In</Button>
        </form>
        {!isAdminRegistered() && (
          <p className="text-xs text-center text-muted-foreground mt-5">
            No admin account found. {" "}
            <Link to="/admin/register" className="text-primary hover:underline">Register Admin</Link>
          </p>
        )}
        {isAdminRegistered() && (
          <p className="text-xs text-center text-muted-foreground mt-5">
            Need to update credentials? {" "}
            <Link to="/admin/register" className="text-primary hover:underline">Re-register Admin</Link>
          </p>
        )}
        <Link to="/" className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
