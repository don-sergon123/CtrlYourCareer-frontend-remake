import { useEffect, useRef, useState } from "react";
import Brand from "./components/Brand";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";

const LOADING_DURATION = 1000;

export default function App() {
  const { session, loading, login, logout, updateUser, demo } = useAuth();

  const [screen, setScreen] = useState("landing");
  const [showLoading, setShowLoading] = useState(true);

  const timerRef = useRef(null);
  const initializedRef = useRef(false);

  const startLoading = (nextScreen) => {
    clearTimeout(timerRef.current);
    setShowLoading(true);

    timerRef.current = setTimeout(() => {
      setScreen(nextScreen);
      setShowLoading(false);
    }, LOADING_DURATION);
  };

  useEffect(() => {
    if (loading || initializedRef.current) return;

    initializedRef.current = true;

    const nextScreen = session
      ? demo && !session.user.onboardingComplete
        ? "onboarding"
        : "dashboard"
      : "landing";

    startLoading(nextScreen);
  }, [loading, session, demo]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const authSuccess = async (email, password) => {
    const next = await login(email, password);

    const nextScreen =
      demo && !next.user.onboardingComplete ? "onboarding" : "dashboard";

    startLoading(nextScreen);
  };

  const finish = (user) => {
    updateUser(user);
    startLoading("dashboard");
  };

  const signOut = () => {
    clearTimeout(timerRef.current);
    logout();
    setShowLoading(false);
    setScreen("landing");
  };

  if (loading || showLoading) {
    return (
      <div className="loading">
        <Brand />
        <p>Loading your journey…</p>
      </div>
    );
  }

  if (screen === "login" || screen === "signup") {
    const props = {
      setMode: setScreen,
      onSuccess: authSuccess,
      onBack: () => setScreen("landing"),
    };

    return screen === "login" ? <Login {...props} /> : <Register {...props} />;
  }

  if (session && screen === "onboarding" && demo) {
    return (
      <Onboarding
        user={session.user}
        token={session.token}
        onComplete={finish}
        onLogout={signOut}
      />
    );
  }

  if (session && screen === "dashboard") {
    return <Dashboard user={session.user} onLogout={signOut} />;
  }

  return (
    <>
      <Header
        onAuth={setScreen}
        session={session}
        onHome={() => {
          setScreen(session ? "dashboard" : "landing");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />

      <Landing
        onAuth={setScreen}
        session={session}
        onDashboard={() => setScreen("dashboard")}
      />
    </>
  );
}
