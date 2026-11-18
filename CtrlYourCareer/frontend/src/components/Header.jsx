import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import Brand from "./Brand";

export default function Header({ onAuth, session, onHome }) {
  const [menu, setMenu] = useState(false);
  return (
    <header className="header">
      <div className="container nav">
        <button className="brand-button" onClick={onHome}>
          <Brand />
        </button>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          <button onClick={onHome}>Home</button>
          <button
            onClick={() =>
              document
                .getElementById("how")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            How it works
          </button>
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Features
          </button>
        </nav>
        <div className="nav-actions">
          {session ? (
            <button className="btn btn-dark" onClick={onHome}>
              My dashboard <ArrowUpRight size={16} />
            </button>
          ) : (
            <>
              <button className="btn btn-quiet" onClick={() => onAuth("login")}>
                Log in
              </button>
              <button className="btn btn-dark" onClick={() => onAuth("signup")}>
                Get started <ArrowUpRight size={16} />
              </button>
            </>
          )}
        </div>
        <button
          className="menu-button"
          aria-label="Toggle menu"
          onClick={() => setMenu(!menu)}
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
