import { Link } from "react-router";

const CategoryCard = ({ category, image, description }) => {
  return (
    <div className="category">
      <img
        src={`${import.meta.env.BASE_URL}images/category/${image}`}
        alt={category}
      />

      <h3>{category}</h3>

      <p>{description}</p>

      <Link
        to={`/ninja-shop?category=${encodeURIComponent(category)}`}
      >
        Explore Collection
      </Link>
    </div>
  );
};

export default CategoryCard;