import Reveal from "./Reveal";
import "./Quote.scss";

export default function Quote({ citation }: { citation: { name: string; citation: string } }) {
  return (
    <section className="section--tight quote">
      <div className="shell">
        <Reveal>
          <blockquote className="panel quote__card">
            <span className="quote__mark mono">“</span>
            <p>{citation.citation}</p>
            <footer className="mono">— {citation.name}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
