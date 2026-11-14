import { useState } from "react";
import { Outlet } from "react-router";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import "./App.css";



function App() {
  const [cart, setCart] = useState([]);

  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://6af44f3155a1de7dcf03d729.mockapi.io/konoha-supply/products")
      .then(response => {
        if(!response.ok) {
          throw new Error("Failed to fetch items.");
        }
        return response.json();
      })
      .then(data => setItemList(data))
      .catch(error => {
        console.error("Error fetching items:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

    if (loading) {
        return <div className="app-status"><span className="loading-emblem" aria-hidden="true">✦</span><p>Loading items...</p></div>;
    }
    if (error) {
        return <div className="app-status"><p role="alert">Error: {error}</p><button className="btn btn-green" onClick={() => window.location.reload()}>Try again</button></div>;
    }


  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  function addToCart(product, quantity) {
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      product.stock < 1
    ) {
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stock
                )
              }
            : item
        );
      }
      


      return [
        ...prevCart,
        {
          ...product,
          quantity: Math.min(quantity, product.stock)
        }
      ];
    });
  }


  function removeFromCart(item) {
    setCart(prevCart =>
      prevCart.filter(cartItem => cartItem.id !== item.id)
    );
  }

  function updateQuantity(productId, newQuantity) {
  setCart(prevCart =>
    prevCart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    )
  );
  }

  return (
    <>
      <Navbar count={count} />
     

      <main id="main-content"><Outlet context={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        itemList,
        loading,
        error
      }} /></main>
      <Footer />
    </>
  );
}

export default App;