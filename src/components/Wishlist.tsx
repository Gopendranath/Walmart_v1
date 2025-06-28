import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { removeFromWishlist, clearWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { Card, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Trash2, ShoppingCart, Search, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'date-added';
type ViewMode = 'grid' | 'list';


const Wishlist: React.FC = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>('date-added');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let items = [...wishlistItems];
    
    // Filter by search term
    if (searchTerm) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort items
    items.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'date-added':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });
    
    return items;
  }, [wishlistItems, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredAndSortedItems.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    setShowClearConfirm(false);
  };

  React.useEffect(()=> {
    document.title = `Wishlist | ${wishlistItems.length} items`;
  },[])

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  if (!wishlistItems.length) {
    return (
      <div className="p-8 text-center min-h-screen flex flex-col items-center justify-center">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Start adding items you love to see them here!</p>
        <Button
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          onClick={() => navigate("/")}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} • Total value: ${totalValue.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search your wishlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="date-added">Recently Added</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {!showClearConfirm ? (
            <Button
              variant="outline"
              onClick={() => setShowClearConfirm(true)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearWishlist}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Results Info */}
      {searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          {filteredAndSortedItems.length === 0 ? (
            <span>No items found for "{searchTerm}"</span>
          ) : (
            <span>
              Showing {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'result' : 'results'} for "{searchTerm}"
            </span>
          )}
        </div>
      )}

      {/* Items Grid/List */}
      {filteredAndSortedItems.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No items match your search criteria</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          : "space-y-4 mb-8"
        }>
          {paginatedItems.map((item) => (
            <Card key={item.id} className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${
              viewMode === 'list' ? 'flex flex-row items-center' : 'flex flex-col'
            }`}>
              <div className={`relative ${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'w-full h-48'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="w-8 h-8 p-0 rounded-full shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className={`p-4 flex-1 ${viewMode === 'list' ? 'flex justify-between items-center' : ''}`}>
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <CardTitle className={`font-semibold mb-2 line-clamp-2 ${
                    viewMode === 'list' ? 'text-base mb-1' : 'text-lg'
                  }`}>
                    {item.title}
                  </CardTitle>
                  <div className="text-lg font-bold text-purple-600 mb-3">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                
                <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-row' : 'flex-col sm:flex-row'}`}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 flex-1"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {pageNumber}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;