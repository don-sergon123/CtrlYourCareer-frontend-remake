import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  LogOut,
  Sparkles,
  BookOpen,
  TrendingUp,
  Compass,
} from "lucide-react";
import { api } from "../api";
import Brand from "../components/Brand";
import Option from "../components/Option";
import { roles, goals, interests } from "../data/onboardingOptions";

export default function Onboarding({ user, token, onComplete, onLogout }) {
  const [step, setStep] = useState(0),
    [role, setRole] = useState(user.role || ""),
    [goal, setGoal] = useState(user.goal || ""),
    [experience, setExperience] = useState(user.experience || ""),
    [chosen, setChosen] = useState(user.interests || []),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const valid = [!!role, !!goal, !!experience, chosen.length > 0][step];
  async function next() {
    setError("");
    if (!valid) return setError("Choose an option to continue.");
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setBusy(true);
    try {
      const result = await api.onboard(token, {
        role,
        goal,
        experience,
        interests: chosen,
      });
      onComplete(result.user);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="onboarding-shell">
      <header className="onboard-header">
        <Brand />
        <div className="onboard-right">
          <span>
            Hi, {(user.name || user.username || "Explorer").split(" ")[0]} 👋
          </span>
          <button onClick={onLogout} className="text-action">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>
      <div className="onboard-body">
        <div className="onboard-top">
          <div>
            <span className="eyebrow dark">LET'S MAKE IT PERSONAL</span>
            <h1>
              Tell us a little
              <br />
              <span>about yourself.</span>
            </h1>
            <p>
              Just a few questions so we can tailor your experience to your
              goals.
            </p>
          </div>
          <div className="step-indicator">
            STEP <strong>{step + 1}</strong> OF 4
          </div>
        </div>
        <div className="step-progress">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={i <= step ? "active" : ""} />
          ))}
        </div>
        <div className="question-card">
          <div className="question-kicker">
            {
              [
                "YOUR BACKGROUND",
                "YOUR MAIN GOAL",
                "YOUR EXPERIENCE",
                "YOUR INTERESTS",
              ][step]
            }
          </div>
          <h2>
            {
              [
                "Which best describes you?",
                "What brings you here today?",
                "Where are you in your journey?",
                "What fields interest you?",
              ][step]
            }
          </h2>
          <p className="question-sub">
            {
              [
                "No labels—just a starting point for your experience.",
                "Choose the main thing you want help with right now.",
                "We’ll meet you wherever you are.",
                "Select as many as you like. You can change these later.",
              ][step]
            }
          </p>
          {step === 0 && (
            <div className="option-grid">
              {roles.map((item) => (
                <Option
                  key={item.id}
                  item={item}
                  selected={role === item.id}
                  onClick={() => setRole(item.id)}
                />
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="option-grid">
              {goals.map((item) => (
                <Option
                  key={item.id}
                  item={item}
                  selected={goal === item.id}
                  onClick={() => setGoal(item.id)}
                />
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="option-grid">
              {[
                {
                  id: "starting",
                  icon: Sparkles,
                  title: "Just getting started",
                  desc: "I’m new to this and exploring my options.",
                },
                {
                  id: "building",
                  icon: BookOpen,
                  title: "Building my skills",
                  desc: "I have some experience and want to improve.",
                },
                {
                  id: "experienced",
                  icon: TrendingUp,
                  title: "Ready for my next move",
                  desc: "I have experience and a goal in mind.",
                },
                {
                  id: "transitioning",
                  icon: Compass,
                  title: "Changing direction",
                  desc: "I’m considering a new field or career.",
                },
              ].map((item) => (
                <Option
                  key={item.id}
                  item={item}
                  selected={experience === item.id}
                  onClick={() => setExperience(item.id)}
                />
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="interest-grid">
              {interests.map((item) => (
                <button
                  key={item}
                  className={
                    "interest " + (chosen.includes(item) ? "selected" : "")
                  }
                  onClick={() =>
                    setChosen((c) =>
                      c.includes(item)
                        ? c.filter((x) => x !== item)
                        : [...c, item],
                    )
                  }
                >
                  {chosen.includes(item) && <Check size={16} />} {item}
                </button>
              ))}
            </div>
          )}
          {error && <div className="error">{error}</div>}
          <div className="question-actions">
            <button
              className="btn btn-outline"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={17} /> Back
            </button>
            <button className="btn btn-primary" disabled={busy} onClick={next}>
              {busy ? "Saving…" : step === 3 ? "Finish setup" : "Continue"}{" "}
              {!busy && <ArrowRight size={18} />}
            </button>
          </div>
        </div>
        <div className="onboard-bottom">
          <LockKeyhole size={15} /> Your answers help personalize your
          experience.
        </div>
      </div>
    </div>
  );
}
