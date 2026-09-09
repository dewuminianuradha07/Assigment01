import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faLinkedin ,faInstagram } from '@fortawesome/free-brands-svg-icons';
import "../style/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section">
         
      </div>
      <div className="footer-bottom">
      
        <div className="footer-links">
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/trademarks">Trademarks</a>
          <a href="/license-agreements">License Agreements</a>
          <a href="/license-agreements">Contact Us</a>
        </div>
        <div className="socialMedia">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        </div>
        <p>&copy; 2024 stressdetection.com</p>
        </div>
    </div>
  );
}

export default Footer;
