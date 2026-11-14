import { Link } from "react-router";
import DesignIcon from "./DesignIcon";

const Hero = () => (
  <section className="hero village-banner">
    <div className="hero-content">
      <span className="eyebrow">THE HIDDEN LEAF VILLAGE · EST. AT THE FOUNDING</span>
      <h1>Everything a Shinobi Needs.</h1>
      <h2>Proudly serving the Hidden Leaf Village.</h2>
      <p>From everyday ninja tools and protective gear to ancient scrolls and legendary treasures — we provide everything you need to face your next mission.</p>
      <div className="hero-actions">
        <Link className="btn btn-orange" to="/ninja-shop"><DesignIcon name="spark" /> Enter Shop</Link>
        <Link className="btn btn-outline" to="/ninja-shop?category=Rare%20Items"><DesignIcon name="scroll" /> Browse Rare Items</Link>
      </div>
    </div>
  </section>
);
export default Hero;
