import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/styles/BTT.scss";
import { faArrowsUpToLine } from "@fortawesome/free-solid-svg-icons";

function BackToTop() {
  return (
    <div className="hmm">
      <div className="btt-button">
        <FontAwesomeIcon icon={faArrowsUpToLine} size="xl" />
      </div>
      <div className="contact-me">
        <FontAwesomeIcon icon={faArrowsUpToLine} size="xl" />
      </div>
    </div>
  );
}

export default BackToTop;
