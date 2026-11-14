import { NavLink } from "react-router";
import Brand from "./Brand";
import DesignIcon from "./DesignIcon";

export default function Navbar({ count }) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" className="brand-link" aria-label="Konoha Supply Co."><Brand /></NavLink>
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/ninja-shop">Ninja Shop</NavLink></li>
          <li><NavLink to="/your-inventory" className="inventory-link"><DesignIcon name="cart" /><span>Your Inventory <span className="cart-count">({count})</span></span></NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
