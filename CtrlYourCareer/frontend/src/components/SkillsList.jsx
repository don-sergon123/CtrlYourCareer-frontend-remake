import { useEffect, useState } from "react";
import { Code2, Sparkles, ArrowUpRight } from "lucide-react";
import { backendApi } from "../services/backend";

export default function SkillsList() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    backendApi
      .getSkills()
      .then((data) => {
        setSkills(Array.isArray(data) ? data : data.skills || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="explore-section">
      <div className="explore-heading">
        <div>
          <span className="section-label">
            <Sparkles size={15} /> YOUR SKILL LIBRARY
          </span>

          <h2>Available Skills</h2>
          <p>Discover skills that can shape your future.</p>
        </div>

        <span className="item-count">{skills.length} Skills</span>
      </div>

      {loading && <p>Loading skills...</p>}
      {error && <p className="api-error">{error}</p>}

      {!loading && !error && (
        <div className="modern-card-grid">
          {skills.map((skill) => (
            <article className="modern-item-card" key={skill.id}>
              <div className="card-top">
                <div className="modern-icon skill-icon">
                  <Code2 size={24} />
                </div>

                <span className="card-badge">SKILL</span>
              </div>

              <h3>{skill.name}</h3>

              <p>{skill.description || "Explore this skill."}</p>

              <div className="card-bottom">
                <span>Skill development</span>
                <ArrowUpRight size={19} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
