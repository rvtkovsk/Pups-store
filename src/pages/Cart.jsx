import React, { useEffect, useState } from "react";
import { supabase } from "../api/supabase";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pobranie wszystkich produktów z tabeli "products"
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Błąd pobierania produktów:", error.message);
      } else {
        setProducts(data); // Aktualizacja stanu produktów
      }
    };

    // Pobranie wszystkich produktów z koszyka z tabeli "cart"
    const fetchCartItems = async () => {
      const { data, error } = await supabase.from("cart").select("*");
      if (error) {
        console.error("Błąd pobierania produktów z koszyka:", error.message);
      } else {
        setCartItems(data); // Aktualizacja stanu koszyka
      }
    };

    // Pobranie danych produktów i koszyka
    const fetchData = async () => {
      await Promise.all([fetchProducts(), fetchCartItems()]);
      setIsLoading(false); // Po pobraniu danych wyłączam tryb ładowania
    };

    fetchData();
  }, []); 

  // Funkcja pomocnicza do pobierania szczegółów produktu na podstawie ID
  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  // Usunięcie produktu z koszyka
  const removeFromCart = async (cartItemId) => {
    const { error } = await supabase.from("cart").delete().eq("id", cartItemId);
    if (error) {
      console.error("Błąd podczas usuwania produktu z koszyka:", error);
    } else {
      setCartItems(cartItems.filter((item) => item.id !== cartItemId)); // Aktualizacja stanu
    }
  };

  // Zwiększenie ilości produktu w koszyku
  const increaseQuantity = async (cartItemId, currentQuantity) => {
    const updatedQuantity = currentQuantity + 1;
    const { error } = await supabase
      .from("cart")
      .update({ quantity: updatedQuantity })
      .eq("id", cartItemId);

    if (error) {
      console.error("Błąd przy zwiększaniu ilości produktu:", error);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: updatedQuantity } : item
        )
      );
    }
  };

  // Zmniejszenie ilości produktu w koszyku lub usunięcie jeśli ilość = 1
  const decreaseQuantity = async (cartItemId, currentQuantity) => {
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      const { error } = await supabase
        .from("cart")
        .update({ quantity: updatedQuantity })
        .eq("id", cartItemId);

      if (error) {
        console.error("Błąd przy zmniejszaniu ilości produktu:", error);
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.id === cartItemId
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
      }
    } else {
      removeFromCart(cartItemId); // Usunięcie produktu jeśli ilość wynosi 1
    }
  };

  // Obliczenie łącznej ceny produktów w koszyku
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductDetails(item.product_id);
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  // Wyświetlenie komunikatu ładowania
  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="cart">
      <h1>Twój koszyk</h1>
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
            // Pobranie danych produktu dla każdego elementu koszyka
            const product = getProductDetails(item.product_id);
            const totalPriceForItem = product ? product.price * item.quantity : 0;

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
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id, item.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{totalPriceForItem.toFixed(2)} zł</td>
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
      <div className="cart-summary">
        <h3>Łączna kwota: {calculateTotalPrice().toFixed(2)} zł</h3>
        <button className="checkout-button">Przejdź do kasy</button>
      </div>
    </div>
  );
};
