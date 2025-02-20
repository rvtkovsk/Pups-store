import React, { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import { Link } from "react-router-dom";

import logoBig from "../assets/images/logo-big-white.png"; 

export const Home = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("recommended", "yes");

      if (error) {
        console.error("Błąd pobierania polecanych produktów:", error.message);
      } else {
        setRecommendedProducts(data);
      }
    };
    fetchRecommendedProducts();
  }, []);

  return (
    <div className="home">
      <section className="intro-section">
        <div className="logo-container">
          <img
            src={logoBig} 
            alt="Logo"
            className="big-logo"
          />
        </div>
        <div className="intro-text">
          <h1>Najlepszy sklep dla pupsów</h1>
          <h2>Kochamy pupsy i mamy dla nich super stuff</h2>
        </div>
      </section>

      <section className="recommended-products">
        <h2>Polecane produkty</h2>
        <div className="recommended-products-container">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              <div key={product.id} className="recommended-product">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="recommended-product-image"
                />
                <p className="recommended-product-name">{product.name}</p>
                <p className="recommended-product-price">{product.price} PLN</p>
                <Link to={`/product/${product.id}`} className="view-product-link">
                  Zobacz szczegóły    
                </Link>
              </div>
            ))
          ) : (
            <p>Brak polecanych produktów.</p>
          )}
        </div>
      </section>
      <section className="why-choose-us">
        <div className="why-container">
          <div className="why-item">
            <h3>Wymiana i zwrot</h3>
            <p>
              Zakupiony produkt można zwrócić w ciągu 14 dni od daty jego
              doręczenia bez podania przyczyny.
            </p>
          </div>
          <div className="why-item">
            <h3>Dostawa</h3>
            <p>
              Z uwagi na fakt, iż wszystkie nasze produkty szyjemy ręcznie na
              Państwa indywidualne zamówienie czas oczekiwania wynosi 6 – 14 dni
              roboczych.
            </p>
          </div>
          <div className="why-item">
            <h3>Płatności</h3>
            <p>
              Bezpieczeństwo transakcji zapewnia firma iMoje, która daje
              możliwość płatności Blikiem oraz późniejszej płatności Twisto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
