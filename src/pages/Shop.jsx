import React, { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      }
    };
    fetchCategoriesAndProducts();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || uuidv4();
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }
  }, []);

  async function addToCart(productId) {
    const userId = localStorage.getItem("userId");

    const { data: cartItems, error } = await supabase
      .from("cart")
      .select("*")
      .eq("product_id", productId)
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching cart items:", error);
      return;
    }

    if (cartItems.length > 0) {
      const existingItem = cartItems[0];
      const updatedQuantity = existingItem.quantity + 1;

      const { data, error } = await supabase
        .from("cart")
        .update({ quantity: updatedQuantity })
        .eq("id", existingItem.id);

      if (error) {
        console.error("Error updating product quantity:", error);
      } else {
        console.log("Product quantity updated:", data);
      }
    } else {
      const { data, error } = await supabase
        .from("cart")
        .insert([{ product_id: productId, quantity: 1, user_id: userId }]);

      if (error) {
        console.error("Error adding product to cart:", error);
      } else {
        console.log("Product added to cart:", data);
      }
    }
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="shop">
      <h1 className="shoptitle">Kup coś dla swojego pupsa</h1>
      <div className="category-links">
        <button onClick={() => setSelectedCategory("")} className={`category-link ${!selectedCategory ? "active" : ""}`}>
          WSZYSTKIE
        </button>

        {categories && categories.length > 0 ? (
          categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`category-link ${selectedCategory === category ? "active" : ""}`}
            >
              {category.toUpperCase()}
            </button>
          ))
        ) : (
          <p>Brak kategorii do wyświetlenia.</p>
        )}
      </div>
      <div className="products">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product">
              <Link to={`/product/${product.id}`}>
                {product.image_url && (
                  <img src={product.image_url} alt={product.name} className="product-image" />
                )}
                <h3>{product.name}</h3>
                <p>Cena: {product.price} PLN</p>
              </Link>
              <button onClick={() => addToCart(product.id)}>Dodaj do koszyka</button>
            </div>
          ))
        ) : (
          <p>Brak produktów do wyświetlenia.</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="pagination-button">
          ‹ Poprzednia
        </button>
        <span className="page-number">
          {currentPage} / {totalPages}
        </span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="pagination-button">
          Następna ›
        </button>
      </div>
    </div>
  );
};
