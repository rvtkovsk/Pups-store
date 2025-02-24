import React, { useEffect, useState } from "react";
import { supabase } from "../api/supabase";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserId = () => localStorage.getItem("userId");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error) setProducts(data);
      else console.error("Error fetching products:", error);
    };

    const fetchCartItems = async () => {
      const userId = getUserId();
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", userId);

      if (!error) setCartItems(data);
      else console.error("Error fetching cart items:", error);
    };

    const fetchData = async () => {
      await Promise.all([fetchProducts(), fetchCartItems()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const getProductDetails = (productId) =>
    products.find((p) => p.id === productId);

  const removeFromCart = async (cartItemId) => {
    const { error } = await supabase.from("cart").delete().eq("id", cartItemId);
    if (!error)
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
    else console.error("Error removing item from cart:", error);
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(cartItemId);

    const { error } = await supabase
      .from("cart")
      .update({ quantity: newQuantity })
      .eq("id", cartItemId);

    if (!error)
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    else console.error("Error updating quantity:", error);
  };

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => {
      const product = getProductDetails(item.product_id);
      return product ? total + product.price * item.quantity : total;
    }, 0);

  if (isLoading) return <div>Ładowanie...</div>;

  return (
    <div className="cart">
      <h1>Twój koszyk</h1>
      {cartItems.length === 0 ? (
        <p>jest pusty :(</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Cena</th>
              <th>Ilość</th>
              <th>Kwota</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const product = getProductDetails(item.product_id);
              return (
                product && (
                  <tr key={item.id}>
                    <td className="product-info">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="product-image"
                      />
                      <span>{product.name}</span>
                    </td>
                    <td>{product.price} zł</td>
                    <td>
                      <div className="quantity-handler">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(product.price * item.quantity).toFixed(2)} zł</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Usuń
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      )}
      <div className="total">
        <p>
          <strong>Razem: </strong>
          {calculateTotalPrice().toFixed(2)} zł
        </p>
      </div>
    </div>
  );
};
