import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (!form.email.includes("@")) {
        setError("Please enter a valid email");
        setIsLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Simulate successful login
      const userData = {
        email: form.email,
        name: form.email.split("@")[0],
        userType: "student",
      };

      localStorage.setItem("user-data", JSON.stringify(userData));
      localStorage.setItem("user-auth", "true");
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-temple px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-card rounded-2xl shadow-warm border border-gold/20 p-8"
      >
        {success ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="flex justify-center mb-4"
            >
              <CheckCircle className="h-16 w-16 text-green-500" />
            </motion.div>
            <h2 className="font-display text-2xl text-secondary mb-2">Welcome Back!</h2>
            <p className="text-muted-foreground mb-4">You have been logged in successfully.</p>
            <p className="text-sm text-muted-foreground">Redirecting to home page...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-saffron shadow-gold mb-3">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-secondary">Sign In</h1>
              <p className="text-sm text-muted-foreground mt-1">Welcome back to Vidyalaya</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-xs text-primary hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground disabled:opacity-50"
                    onClick={() => setShowPass(!showPass)}
                    disabled={isLoading}
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                variant="hero"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">New to Vidyalaya?</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => navigate("/signup")}>
              Create an Account
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Admin?{" "}
              <Link to="/admin/login" className="text-primary hover:underline">
                Admin Login
              </Link>
            </p>

            <Link
              to="/"
              className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
