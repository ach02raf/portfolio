import "./Citation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
function citation(props: {
  citation: {
    name: string;
    citation: string;
  };
}) {
  return (
    <div className="citation p-5">
      <div className="citation-contain d-block py-5 m-auto text-center">
        <div className="d-flex justify-content-start">
          <FontAwesomeIcon icon={faQuoteLeft} />
        </div>
        <p>{props?.citation?.citation}</p>
        <div className="d-flex justify-content-end">
          <FontAwesomeIcon icon={faQuoteRight} />
        </div>
        <p className="citation-contain-name">{props?.citation?.name}</p>
      </div>
    </div>
  );
}

export default citation;
