import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <p>Desenvolvido por Bruno Gregório</p>
      <ul className="footer-list">
        <li>
          <a href="#">Termos & Condições</a>
        </li>
        <li>
          <a href="#">Politica de Privacidade</a>
        </li>
      </ul>
      <p>
        Contato{" "}
        <a href="mailto:bgregorioribeiro@gmail.com">
          bgregorioribeiro@gmail.com
        </a>
      </p>
      <div className="social-media-icons">
        <a href="https://github.com/DevBrzera" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://www.linkedin.com/in/bruno-gregório-5b78aa2bb"
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://www.instagram.com/brunogregorio.jsx/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </footer>
  );
}
