import { Compass } from "lucide-react";

export default function Brand({ light = false }) {
  return (
    <div className={"brand " + (light ? "brand-light" : "")}>
      <div className="brand-mark">
        <Compass size={22} strokeWidth={2.4} />
      </div>
      <span>
        Ctrl<span className="brand-accent">Your</span>Career
      </span>
    </div>
  );
}
