import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productsSlice";
import { addToCart } from "@/store/cartSlice";
import type { RootState, AppDispatch } from "@/store";
import type { Product } from "@/store/productsSlice";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) =>
      state.products as {
        items: Product[];
        loading: boolean;
        error: string | null;
      }
  );
  const productScrollRef = useRef<HTMLDivElement>(null);

  const scrollProducts = (direction: "left" | "right") => {
    const container = productScrollRef.current;
    if (!container) return;
    const scrollAmount = 300; // Adjust as needed
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin" /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="container mx-auto px-4 py-6 md:py-8 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-xl font-bold text-foreground mb-6">
            Our Products
          </h2>
          <Link to="/products/all" className="text-primary dark:text-gray-300 hover:underline">
            view all{" "}
          </Link>
        </div>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 hidden md:block"
          style={{
            pointerEvents: "auto",
            background: "var(--card)",
            color: "var(--primary)",
          }}
          onClick={() => scrollProducts("left")}
          aria-label="Scroll left"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          className="flex flex-nowrap gap-4 overflow-x-auto pb-2 no-scrollbar"
          ref={productScrollRef}
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((product) => (
            <div
              key={product.id}
              className="inline-block hover:scale-101 transition duration-300"
            >
              <ProductCard
                product={product}
                onAddToCart={() => {
                  dispatch(
                    addToCart({
                      id: String(product.id),
                      title: product.title,
                      price: product.price,
                      image: product.images[0],
                      quantity: 1,
                    })
                  );
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 hidden md:block"
          style={{
            pointerEvents: "auto",
            background: "var(--card)",
            color: "var(--primary)",
          }}
          onClick={() => scrollProducts("right")}
          aria-label="Scroll right"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductList;
