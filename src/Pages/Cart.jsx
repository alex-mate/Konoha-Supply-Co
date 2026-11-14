import { Link, useOutletContext } from "react-router";
import PageBanner from "../components/PageBanner";
import CartItem from "../components/CartItem";
import DesignIcon from "../components/DesignIcon";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } =
    useOutletContext();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  return (
    <div className="cart-page">
      <PageBanner title="Your Inventory" description="Here you can view the items you've added to your pouch." />
      <div className="section-shell cart-layout">
      <section className="cart-panel" aria-label="Cart items">
        <div className="cart-panel-heading"><DesignIcon name="cart" /> Cart Items ({cart.length})</div>

      {cart.length === 0 ? (
        <div className="empty-cart"><span aria-hidden="true">◇</span><p>Your pouch is empty. Go to the Ninja Shop to add some items!</p></div>
      ) : (
        <div className="cart-columns" aria-hidden="true"><span>Item</span><span>Quantity</span><span>Unit Price</span><span>Subtotal</span><span></span></div>
      )}
      {cart.length > 0 && (
        <div className="cart-items">
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>
      )}

      </section>
      <aside className="order-summary">
        <div className="summary-heading"><DesignIcon name="leaf" /> Order Summary</div>
        <div className="summary-body">
          <p>Total Items: {totalItems}</p>
          <p className="summary-total">Total Price: {totalPrice.toLocaleString()} Ryō</p>
          <p className="demo-note">Mission supplies only · no real checkout.</p>
          <Link className="btn btn-green" to="/ninja-shop">Continue Shopping</Link>
        </div>
      </aside>
      </div>
    </div>
  );
};

export default Cart;