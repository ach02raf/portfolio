import React from "react";
import "./Citation.scss";

type CitationData = {
  name: string;
  citation: string;
};

type CitationProps = {
  citation: CitationData;
};

function Citation({ citation }: CitationProps) {
  const { name, citation: text } = citation || {};

  return (
    <section className="citation" aria-label="Citation">
      <div className="citation__container">
        <div className="citation__card">
          <div className="citation__quote-start" aria-hidden="true" />

          <blockquote className="citation__text">{text}</blockquote>

          <div className="citation__quote-end" aria-hidden="true" />

          <p className="citation__author">{name}</p>
        </div>
      </div>
    </section>
  );
}

export default Citation;
