import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Compass,
  ShieldCheck,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { api, demo } from "../api";
import Brand from "../components/Brand";

export default function AuthForm({ mode, setMode, onSuccess, onBack }) {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [show, setShow] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const signup = mode === "signup";
  async function submit(e) {
    e.preventDefault();
    setError("");
    if (signup && name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must have at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      if (signup) {
        await api.register({ username: name.trim(), email, password });
        setPassword("");
        setMode("login");
      } else {
        await onSuccess(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-shell">
      <div className="auth-aside">
        <button className="brand-button" onClick={onBack}>
          <Brand light />
        </button>
        <div className="auth-aside-copy">
          <span className="eyebrow">
            <Sparkles size={15} /> A FUTURE THAT FITS YOU
          </span>
          <h2>
            Your next chapter
            <br />
            starts with <em>one step.</em>
          </h2>
          <p>
            Map your skills. Discover opportunities. Build a career path with
            confidence.
          </p>
          <div className="aside-quote">
            <div className="quote-icon">
              <Compass size={23} />
            </div>
            <span>
              “The best investment you can make is in your own growth.”
            </span>
          </div>
        </div>
        <div className="aside-footer">
          YOUR JOURNEY. YOUR PACE. YOUR FUTURE.
        </div>
      </div>
      <div className="auth-main">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={17} /> Back to home
        </button>
        <div className="auth-form-wrap">
          <div className="form-badge">
            <ShieldCheck size={17} /> YOUR PERSONAL SPACE
          </div>
          <h1>{signup ? "Create your account" : "Welcome back"}</h1>
          <p className="form-intro">
            {signup
              ? "First, let’s get you set up. We’ll personalize your experience next."
              : "Log in to continue building your career journey."}
          </p>
          <form onSubmit={submit}>
            {signup && (
              <label>
                Full name
                <div className="input-wrap">
                  <UserRound size={18} />
                  <input
                    required
                    autoComplete="name"
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </label>
            )}
            <label>
              Email address
              <div className="input-wrap">
                <span className="at-symbol">@</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>
            <label>
              Password
              <div className="input-wrap">
                <LockKeyhole size={18} />
                <input
                  type={show ? "text" : "password"}
                  required
                  autoComplete={signup ? "new-password" : "current-password"}
                  placeholder={
                    signup ? "At least 8 characters" : "Enter your password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="eye-button"
                  type="button"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            {error && (
              <div className="error" role="alert">
                {error}
              </div>
            )}
            <button
              disabled={busy}
              className="btn btn-primary btn-submit"
              type="submit"
            >
              {busy ? "Please wait…" : signup ? "Create account" : "Log in"}{" "}
              {!busy && <ArrowRight size={19} />}
            </button>
          </form>
          <div className="auth-switch">
            {signup ? "Already have an account?" : "New to CtrlYourCareer?"}{" "}
            <button
              onClick={() => {
                setError("");
                setMode(signup ? "login" : "signup");
              }}
            >
              {signup ? "Log in" : "Create an account"}
            </button>
          </div>
          <p className="auth-note">
            <ShieldCheck size={15} />{" "}
            {demo
              ? "© 2026 CtrlYourCareer · Built for what's next."
              : "Your account is managed by the connected backend."}
          </p>
        </div>
      </div>
    </div>
  );
}
