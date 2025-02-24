import React from "react";
// import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Linkedin</h3>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/karolina-rutkowska-372817205/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Karolina Rutkowska
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Więcej info o projekcie</h3>
          <div className="social-links">
            <a
              href="https://github.com/rvtkovsk/Pups-store"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pups-store
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Github</h3>
          <div className="social-links">
            <a
              href="https://github.com/rvtkovsk"
              target="_blank"
              rel="noopener noreferrer"
            >
              rvtkovsk
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Final project for the JavaScript Developer course at Coders Lab</p>
        <p>Created by Karolina Rutkowska</p>
        <p>Copyrights &copy; {new Date().getFullYear()} .</p>
      </div>
    </footer>
  );
};
