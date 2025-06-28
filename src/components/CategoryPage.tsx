import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/store/productsSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import type { AppDispatch } from "@/store";

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Title: A-Z", value: "title-asc" },
  { label: "Title: Z-A", value: "title-desc" },
];

const sortProducts = (products: Product[], sort: string) => {
  const newProducts = [...products];
  switch (sort) {
    case "price-asc":
      return newProducts.sort((a, b) => a.price - b.price);
    case "price-desc":
      return newProducts.sort((a, b) => b.price - a.price);
    case "title-asc":
      return newProducts.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return newProducts.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return newProducts;
  }
};

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Products per page

  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${id}/products`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: String(product.id),
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      })
    );
  };

  const sortedProducts = useMemo(
    () => sortProducts(products, sort),
    [products, sort]
  );

  // Reset to first page when products or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [products, sort]);

  // Calculate paginated products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / pageSize);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (paginatedProducts.length === 0) {
      return <div className="text-center">No products found in this category.</div>;
    }
    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
        {renderPagination()}
      </>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Category Products</h2>
        <select
          className="border rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="">Sort By</option>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {renderContent()}
    </div>
  );
};

export default CategoryPage;