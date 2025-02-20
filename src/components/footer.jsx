import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>O nas</h3>
          <p>
            Jesteśmy najlepszym sklepem dla pupsów i pa!
          </p>
        </div>

        <div className="footer-section">
          <h3>Kontakt</h3>
          <p>Email: kontakt@skleppupsow.pl</p>
          <p>Telefon: +48 123 456 789</p>
          <p>Adres: ul. Psia 10, Warszawa</p>
        </div>

        <div className="footer-section">
          <h3>Znajdziesz nas</h3>
          <div className="social-icons">
            <Link to="/home">Facebook</Link>
            <Link to="/home">Instagram</Link>
            <Link to="/home">Tiktok</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pups Shop. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
};
