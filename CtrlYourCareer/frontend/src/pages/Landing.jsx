import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  GraduationCap,
  LockKeyhole,
  LogOut,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
  Eye,
  EyeOff,
  Code2,
  BarChart3,
  PlayCircle,
} from "lucide-react";
import Brand from "../components/Brand";

export default function Landing({ onAuth, session, onDashboard }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={15} /> YOUR FUTURE STARTS HERE
            </span>
            <h1>
              Don't just dream
              <br />
              of your future.
              <br />
              <span>Map your way there.</span>
            </h1>
            <p>
              Discover your strengths, explore meaningful careers, and build the
              skills that get you where you want to go. All in one place.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary btn-lg"
                onClick={session ? onDashboard : () => onAuth("signup")}
              >
                {session ? "Go to dashboard" : "Start your journey"}{" "}
                <ArrowRight size={19} />
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() =>
                  document
                    .getElementById("how")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See how it works <PlayCircle size={19} />
              </button>
            </div>
            <div className="trust">
              <div className="avatar-stack">
                <span>JD</span>
                <span>AM</span>
                <span>SK</span>
              </div>
              <span>
                Built for students, job seekers
                <br />
                and lifelong learners
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow"></div>
            <div className="mock-card">
              <div className="mock-top">
                <span className="mini-logo">
                  <Compass size={17} /> Your career map
                </span>
                <span className="pill pill-green">
                  <span className="dot"></span> In progress
                </span>
              </div>
              <div className="mock-heading">Your journey, at a glance</div>
              <div className="mock-sub">
                Keep growing. You're getting closer.
              </div>
              <div className="progress-panel">
                <div className="progress-label">
                  <span>Skill development</span>
                  <strong>68%</strong>
                </div>
                <div className="progress-track">
                  <span style={{ width: "68%" }} />
                </div>
              </div>
              <div className="mock-stats">
                <div>
                  <span className="stat-icon blue">
                    <Code2 size={19} />
                  </span>
                  <strong>08</strong>
                  <small>Skills mapped</small>
                </div>
                <div>
                  <span className="stat-icon violet">
                    <Target size={19} />
                  </span>
                  <strong>03</strong>
                  <small>Career interests</small>
                </div>
              </div>
              <div className="path-card">
                <div className="path-icon">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <strong>You're on the right path</strong>
                  <small>Every skill brings you closer.</small>
                </div>
                <ChevronRight size={18} />
              </div>
            </div>
            <div className="float-badge">
              <CheckCircle2 size={20} />
              <div>
                <strong>Level up your potential</strong>
                <span>One step at a time</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow dark">A SIMPLE PATH FORWARD</span>
            <h2>
              From where you are
              <br />
              to where you want to be.
            </h2>
            <p>
              A guided experience designed around you—not a one-size-fits-all
              career quiz.
            </p>
          </div>
          <div className="steps">
            {[
              [
                "01",
                UserRound,
                "Create your account",
                "Sign up securely to save your journey and pick up where you left off.",
              ],
              [
                "02",
                Compass,
                "Tell us about yourself",
                "Answer a few quick questions about your goals and interests.",
              ],
              [
                "03",
                Target,
                "Build your path",
                "Explore careers, map skills, and take your next step with confidence.",
              ],
            ].map(([n, Icon, title, desc]) => (
              <div className="step" key={n}>
                <span className="step-num">{n}</span>
                <div className="step-icon">
                  <Icon size={25} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow dark">EVERYTHING IN ONE PLACE</span>
            <h2>
              Tools for every stage
              <br />
              of your journey.
            </h2>
          </div>
          <div className="feature-grid">
            {[
              [
                BookOpen,
                "Learn with purpose",
                "Find resources connected to the skills you want to develop.",
              ],
              [
                Target,
                "Explore careers",
                "Discover career paths and understand the skills they require.",
              ],
              [
                BarChart3,
                "Know your gaps",
                "Compare your current skills with your target career.",
              ],
              [
                ShieldCheck,
                "Your journey, your space",
                "A personal account keeps your progress in one place.",
              ],
            ].map(([Icon, title, desc]) => (
              <div className="feature-card" key={title}>
                <div className="feature-icon">
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow">MAKE YOUR NEXT MOVE COUNT</span>
            <h2>
              Your potential deserves
              <br />a plan.
            </h2>
            <p>
              Start with a few questions. Build a future that feels like yours.
            </p>
          </div>
          <button
            className="btn btn-white btn-lg"
            onClick={session ? onDashboard : () => onAuth("signup")}
          >
            Let's get started <ArrowRight size={19} />
          </button>
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-row">
          <Brand />
          <span>
            © {new Date().getFullYear()} CtrlYourCareer · Built for what's next.
          </span>
        </div>
      </footer>
    </>
  );
}
