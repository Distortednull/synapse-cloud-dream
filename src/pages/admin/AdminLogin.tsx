import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, AlertCircle, ShieldAlert } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = "admin_login_attempts";

interface LoginAttempts {
  count: number;
  lastAttempt: number;
  lockedUntil: number | null;
}

const getLoginAttempts = (): LoginAttempts => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parsing errors
  }
  return { count: 0, lastAttempt: 0, lockedUntil: null };
};

const setLoginAttempts = (attempts: LoginAttempts) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
};

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState(MAX_ATTEMPTS);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkLockout = () => {
      const attempts = getLoginAttempts();
      const now = Date.now();

      if (attempts.lockedUntil && attempts.lockedUntil > now) {
        setIsLocked(true);
        setLockoutRemaining(Math.ceil((attempts.lockedUntil - now) / 1000));
      } else if (attempts.lockedUntil && attempts.lockedUntil <= now) {
        // Lockout expired, reset attempts
        setLoginAttempts({ count: 0, lastAttempt: 0, lockedUntil: null });
        setIsLocked(false);
        setAttemptsRemaining(MAX_ATTEMPTS);
      } else {
        setAttemptsRemaining(MAX_ATTEMPTS - attempts.count);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const recordFailedAttempt = () => {
    const attempts = getLoginAttempts();
    const now = Date.now();
    const newCount = attempts.count + 1;

    if (newCount >= MAX_ATTEMPTS) {
      const lockedUntil = now + LOCKOUT_DURATION;
      setLoginAttempts({ count: newCount, lastAttempt: now, lockedUntil });
      setIsLocked(true);
      setLockoutRemaining(Math.ceil(LOCKOUT_DURATION / 1000));
    } else {
      setLoginAttempts({ count: newCount, lastAttempt: now, lockedUntil: null });
      setAttemptsRemaining(MAX_ATTEMPTS - newCount);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (isLocked) {
      toast({
        title: "Account Locked",
        description: `Too many failed attempts. Try again in ${formatTime(lockoutRemaining)}.`,
        variant: "destructive",
      });
      return;
    }

    // Validate input
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Add artificial delay to slow down brute force attempts
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { error } = await signIn(email, password);

    if (error) {
      recordFailedAttempt();
      toast({
        title: "Login Failed",
        description: error.message === "Invalid login credentials" 
          ? "Invalid email or password. Please try again."
          : error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Reset attempts on successful login
    setLoginAttempts({ count: 0, lastAttempt: 0, lockedUntil: null });

    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });

    navigate("/admin-bdtech-2026");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              <span className="text-primary">BD</span>Tech Admin
            </h1>
            <p className="text-muted-foreground mt-2">Sign in to access the admin panel</p>
          </div>

          {isLocked ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
              <ShieldAlert className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-destructive mb-2">Account Temporarily Locked</h2>
              <p className="text-muted-foreground mb-4">
                Too many failed login attempts. Please try again in:
              </p>
              <div className="text-3xl font-mono font-bold text-destructive">
                {formatTime(lockoutRemaining)}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {attemptsRemaining < MAX_ATTEMPTS && attemptsRemaining > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    {attemptsRemaining} attempt{attemptsRemaining !== 1 ? "s" : ""} remaining before lockout
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" variant="glow" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          )}

          <p className="text-center text-xs text-muted-foreground mt-6">
            This is a protected area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};