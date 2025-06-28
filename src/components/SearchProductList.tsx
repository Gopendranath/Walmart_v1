import React from "react";
import { ProductCard } from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import type { Product } from "@/store/productsSlice";

interface SearchProductListProps {
  products: Product[];
}

const SearchProductList: React.FC<SearchProductListProps> = ({ products }) => {
  const dispatch = useDispatch();

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() =>
            dispatch(
              addToCart({
                id: String(product.id),
                title: product.title,
                price: product.price,
                image: product.images[0],
                quantity: 1,
              })
            )
          }
        />
      ))}
    </div>
  );
};

export default SearchProductList;