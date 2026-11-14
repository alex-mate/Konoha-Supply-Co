import DesignIcon from "./DesignIcon";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {

  function handleQuantityChange(newQuantity) {
    if (!Number.isInteger(newQuantity)) {
      return;
    }

    if (newQuantity < 1) {
      return;
    }

    if (newQuantity <= item.stock) {
      updateQuantity(item.id, newQuantity);
    }
  }

  return (
    <div className="cart-item">
      <h2>{item.name}</h2>

      <img
        src={`${import.meta.env.BASE_URL}images/products/${item.image}`}
        alt={item.name}
        className="cart-image"
      />

      <p className="cart-description">{item.description}</p>
      <p className="cart-price">
        Price: {item.price.toLocaleString()} {item.currency}
      </p>

      <div className="quantity-control">
         <button 
           type="button"
           aria-label="Decrease quantity"
           disabled={item.quantity <= 1}
           onClick={() => handleQuantityChange(item.quantity - 1)}
        > - </button>
        <label>
          Quantity:
          <input 
           type="number"
           min="1"
           max={item.stock}
           value={item.quantity}
           onChange={e => handleQuantityChange(parseInt(e.target.value, 10))}
          />
        </label>
        <button
         type="button"
         aria-label="Increase quantity"
         disabled={item.quantity >= item.stock}
         onClick={() => handleQuantityChange(item.quantity +1)} 
        > + </button>  
      </div>  

      <p className="cart-subtotal">
        Total: {(item.price * item.quantity).toLocaleString()}
        {" "}{item.currency}
      </p>

      <button className="remove-button" type="button" onClick={() => removeFromCart(item)}>
        <DesignIcon name="trash" /><span className="visually-hidden">Remove</span>
      </button>
    </div>
  );
};

export default CartItem;
