import { Link } from "react-router";
import Brand from "./Brand";
import category from "../data/category";

const Footer = () => {
    return (
        <footer className="footer">
            <section className="footer-brand">
                <Brand />
                <p>
                    Your trusted shinobi supply shop in the heart
                    of the Hidden Leaf Village. From essential
                    ninja tools to legendary treasures, we equip
                    every shinobi for their next adventure.
                </p>
            </section>

            <section className="quick-link">
                <h3>Quick Links</h3>

                <Link to="/">Home</Link>
                <Link to="/ninja-shop">Ninja Shop</Link>
                <Link to="/your-inventory">Your Inventory</Link>
            </section>

            <section className="category-footer">
                <h3>Shop Categories</h3>

                {category.map(item => (
                    <Link
                        key={item.name}
                        to={`/ninja-shop?category=${encodeURIComponent(item.name)}`}
                    >
                        {item.name}
                    </Link>
                ))}
            </section>

            <section className="footer-description">
                <h3>Visit Our Store</h3>
                <p>Hidden Leaf Village, Land of Fire.</p>
                <p>Every Shinobi. Every Mission. Every Journey.</p>
            </section>

            <div className="footer-bottom">
                <p>
                    © 2026 Konoha Supply Co. — Proudly serving
                    shinobi since the founding of the Hidden
                    Leaf Village.
                </p>
            </div>
        </footer>
    );
};

export default Footer;