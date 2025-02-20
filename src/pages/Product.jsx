import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../api/supabase";

export const Product = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        setError("Błąd podczas pobierania produktu. Spróbuj ponownie.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading-text">Ładowanie...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!product) return <p className="not-found-text">Produkt nie znaleziony</p>;

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price} PLN</p>
          <button className="add-to-cart-btn" onClick={() => alert("Dodano do koszyka!")}>
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
};

