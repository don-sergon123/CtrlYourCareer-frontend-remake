import { Check } from "lucide-react";

export default function Option({ item, selected, onClick }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      className={"option " + (selected ? "selected" : "")}
      onClick={onClick}
    >
      <span className="option-icon">
        <Icon size={22} />
      </span>
      <span className="option-text">
        <strong>{item.title}</strong>
        <small>{item.desc}</small>
      </span>
      <span className="option-check">
        {selected ? <Check size={17} /> : null}
      </span>
    </button>
  );
}
