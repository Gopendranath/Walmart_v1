import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import type { RootState } from "@/store";
import SearchProductList from "./SearchProductList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
//   console.log('All products:', products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const query = useQuery().get("q")?.toLowerCase() || "";

  // Defensive: handle missing fields and flexible search
  const normalizedQuery = query.trim().replace(/\s+/g, " ");
  const searchResultList = products.filter((product) => {
    const title = product.title?.toLowerCase().replace(/\s+/g, " ") || "";
    const description = product.description?.toLowerCase().replace(/\s+/g, " ") || "";
    const category = product.category?.name?.toLowerCase().replace(/\s+/g, " ") || "";
    return (
      title.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      category.includes(normalizedQuery)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!query) return <div>Please enter a search query.</div>;
  if (searchResultList.length === 0) return <div>No products found.</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for "{query}"
      </h2>
      <SearchProductList products={searchResultList} />
    </div>
  );
};

export default SearchResults;