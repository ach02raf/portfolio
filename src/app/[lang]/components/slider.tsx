"use client";
import Typewriter from "react-ts-typewriter";
function slider({
  dict,
}: {
  dict: { salutation: string; nom: string; work: Array<string> };
}) {
  return (
    <div>
      <h1>
        <p>{dict.salutation}</p>
        {dict.nom}
        <p>
          <Typewriter
            text={dict.work}
            loop={true}
            random={300}
            cursor={false}
          />
        </p>
      </h1>
    </div>
  );
}

export default slider;
