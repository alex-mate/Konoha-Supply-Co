import { Link, useOutletContext } from "react-router";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import category from "../data/category";
import CategoryCard from "../components/CategoryCards";

const Home = () => {
  const { addToCart, itemList, loading, error } =
    useOutletContext();

  const filteredItems = itemList.filter(item => item.featured);

  return (
    <div className="home-page">
      <Hero />
      <section className="section-shell categories-section">
        <div className="section-heading"><h2>Shop by Category</h2><p>Find the right supplies for your next mission.</p></div>
        <div className="collection-list">
          {category.map(categories => (
            <CategoryCard
              key={categories.name}
              category={categories.name}
              image={categories.image}
              description={categories.description}
            />
          ))}
        </div>
      </section>
      <section className="section-shell featured-section">
        <div className="section-heading"><h2>Featured Products</h2><p>Trusted by shinobi across the village.</p></div>
        <div className="product-list">
          {loading ? (
            <p className="status-message">Loading ninja supplies...</p>
          ) : error ? (
            <p className="status-message">{error}</p>
          ) : filteredItems.length === 0 ? (
            <p className="status-message">No ninja supplies are featured.</p>
          ) : (
            filteredItems.map(item => (
              <ProductCard key={item.id} product={item} addToCart={addToCart} />
            ))
          )}
        </div>
      </section>
      <section className="section-shell mission-section">
        <div className="mission-banner">
          <div className="mission-art" aria-hidden="true" />
          <div><span className="eyebrow">PREPARE FOR THE JOURNEY</span><h2>Mission Ready Supplies</h2><p>Gear for training, travel and every adventure beyond the village gates.</p></div>
          <Link to="/ninja-shop" className="btn btn-orange">Explore the Shop</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
