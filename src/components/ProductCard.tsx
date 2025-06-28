import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/store/productsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import type { RootState } from "@/store";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);
  const inWishlist = wishlistItems.some((item) => item.id === String(product.id));

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      dispatch(removeFromWishlist(String(product.id)));
    } else {
      dispatch(
        addToWishlist({
          id: String(product.id),
          title: product.title,
          price: product.price,
          image: product.images[0],
        })
      );
    }
  };

  return (
    <Card className="w-full max-w-xs sm:w-[48%] md:w-60 h-80 p-3 flex flex-col justify-between shadow-md border-none bg-background m-auto">
      <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-xl bg-muted">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform hover:scale-105 cursor-pointer"
          onClick={handleNavigate}
        />
        <button
          className={`absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white shadow ${
            inWishlist ? "text-red-500" : "text-gray-400"
          }`}
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart fill={inWishlist ? "#ef4444" : "none"} strokeWidth={2} />
        </button>
      </div>
      <CardContent className="flex flex-col gap-4 p-0 mt-2">
        <div className="flex justify-between">
          <div>
            <h3
              className="text-base sm:text-lg font-semibold cursor-pointer"
              onClick={handleNavigate}
            >
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground">ID: {product.id}</p>
          </div>
          <span className="text-red-600 font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary/80 cursor-pointer"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};
