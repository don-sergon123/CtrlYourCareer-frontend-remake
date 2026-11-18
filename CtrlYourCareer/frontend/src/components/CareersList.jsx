import { useEffect, useState } from "react";
import { BriefcaseBusiness, ArrowUpRight, Compass } from "lucide-react";
import { backendApi } from "../services/backend";

export default function CareersList() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    backendApi
      .getCareers()
      .then((data) => {
        setCareers(Array.isArray(data) ? data : data.careers || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="explore-section">
      <div className="explore-heading">
        <div>
          <span className="section-label">
            <Compass size={15} /> CAREER DISCOVERY
          </span>

          <h2>Explore Careers</h2>
          <p>Discover opportunities that match your ambitions.</p>
        </div>

        <span className="item-count">{careers.length} Careers</span>
      </div>

      {loading && <p>Loading careers...</p>}
      {error && <p className="api-error">{error}</p>}

      {!loading && !error && (
        <div className="modern-card-grid">
          {careers.map((career) => (
            <article className="modern-item-card" key={career.id}>
              <div className="card-top">
                <div className="modern-icon career-icon">
                  <BriefcaseBusiness size={24} />
                </div>

                <span className="card-badge career-badge">CAREER</span>
              </div>

              <h3>{career.title || career.name}</h3>

              <p>{career.description || "Explore this career opportunity."}</p>

              <div className="card-bottom">
                <span>Career exploration</span>
                <ArrowUpRight size={19} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
