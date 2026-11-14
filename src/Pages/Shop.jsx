import { useState } from "react";
import {useOutletContext, useSearchParams} from "react-router";
import PageBanner from "../components/PageBanner";
import ProductCard from "../components/ProductCard";
import DesignIcon from "../components/DesignIcon";

const categoryIcons = { All: "grid", Weapons: "weapon", Apparel: "apparel", "Rare Items": "spark", Scrolls: "scroll", Provisions: "bowl" };

const Shop = () => {
    
    const { addToCart, itemList } = useOutletContext();

    const [searchTerm, setSearchTerm] = useState("");
   

    const [sortBy, setSortBy] = useState("default");

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get("category") || "All";


    

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleCategoryChange(event) {
        setSearchParams({
            category: event.target.value
        })
    }

    const filteredItems = itemList.filter(item => {
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

        return matchesSearchTerm && matchesCategory;
    });

    const categories = ["All", ...new Set(itemList.map(item => item.category))];

    function handleSortChange(event) {
        setSortBy(event.target.value);
    }

    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === "price-asc") {
            return a.price - b.price;
        } else if (sortBy === "price-desc") {
            return b.price - a.price;
        } else if (sortBy === "name-asc") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "name-desc") {
            return b.name.localeCompare(a.name);
        }
        return 0;
    });

    
    return (
        <div className="shop-page">
            <PageBanner title="Ninja Shop" description="Browse our selection of ninja gear and supplies!" />
            <div className="section-shell shop-layout">
            <aside className="shop-sidebar">
              <div className="sidebar-heading"><DesignIcon name="leaf" /> Shop by Category</div>
              <div className="category-buttons">
                {categories.map(category => (
                  <button type="button" key={category} className={selectedCategory === category ? "category-button is-selected" : "category-button"} aria-pressed={selectedCategory === category} onClick={() => setSearchParams({category})}><DesignIcon name={categoryIcons[category]} /><span>{category === "All" ? "All Supplies" : category}</span></button>
                ))}
              </div>
              <div className="sidebar-note"><strong>Mission essentials</strong><p>Every shinobi deserves reliable gear.</p></div>
            </aside>
            <section className="shop-results" aria-label="Products">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search items..."
                    aria-label="Search items"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select aria-label="Filter by category" value={selectedCategory} onChange={handleCategoryChange}>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category === "All" ? "All Categories" : category}
                        </option>
                    ))}
                </select>
                <select aria-label="Sort products" value={sortBy} onChange={handleSortChange}>
                    <option value="default">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                </select> 
            </div>
            <p className="result-count">Showing {sortedItems.length} of {itemList.length} items</p>
            <div className="product-list">
                {sortedItems.length === 0 ? (
                    <p className="status-message">No ninja supplies found.</p>
                ) : (
                sortedItems.map(item => (
                    <ProductCard
                        key={item.id}
                        product={item}
                        addToCart={addToCart}
                    />
                ))
                )}
            </div>
            </section>
            </div>
        </div>
    )
}

export default Shop;