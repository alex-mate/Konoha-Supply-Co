import { useState } from "react";
import DesignIcon from "./DesignIcon";



const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityChange(e) {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value)) {
        setQuantity(1);
    } else {
        setQuantity(Math.max(1, Math.min(value, product.stock)));
    }
    
}

  return (
    <div className="product-card">
      <img
        src={`${import.meta.env.BASE_URL}images/products/${product.image}`}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p className="product-price">{product.price.toLocaleString()} {product.currency}</p>
      <div className="product-meta">
        <p className={`stock-info ${product.stock === 0 ? "out-of-stock" : product.stock <= 5 ? "low-stock" : ""}`}>Stock: {product.stock}</p>
        <p className="product-category">Category: {product.category}</p>
        <p className={`product-rarity rarity-${String(product.rarity || "common").toLowerCase()}`}>Rarity: {product.rarity}</p>
      </div>
      <p className="product-description">{product.description}</p> 
      <div className="quantity-control">
        <button 
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || product.stock === 0}
            onClick={() => setQuantity(prev => Math.max(1, prev -1))}
        > - </button>
        <input 
            type="number"
            aria-label="Quantity"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={product.stock===0}
        />
        <button 
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= product.stock}
            onClick={() => setQuantity(prev => Math.min(product.stock, prev +1))}
        > + </button>    
      </div>
      <button className="btn btn-green add-button" type="button"
         disabled={product.stock === 0}
         onClick={() => addToCart(product, quantity)}
      ><DesignIcon name="cart" /> Add to Pouch</button>  
    </div>
  );
}         
   


export default ProductCard;