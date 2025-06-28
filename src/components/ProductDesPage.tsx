import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Product } from "../store/productsSlice";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import { addToOrders } from "@/store/orderSlice";
import { addToCart } from "@/store/cartSlice";
import type { RootState } from "@/store";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Loader2,
} from "lucide-react";

const ProductDesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );
  const inWishlist =
    product && wishlistItems.some((item) => item.id === String(product.id));

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        setCurrent(0);
        window.scrollTo(0, 0);
        document.title = res.data.title;
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
        setLoading(false);
      });
  }, [id]);

  const handleWishlistToggle = () => {
    if (!product) return;
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

  const handleBuyNow = () => {
    if (!product) return;
    dispatch(
      addToOrders({
        id: String(product.id),
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity,
        orderStatus: "pending",
      })
    );
    // Optionally, you can redirect to the orders page or show a confirmation
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: String(product.id),
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity,
      })
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            {error || "The product you are looking for does not exist."}
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const hasMultipleImages = images.length > 1;

  const prevImage = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const nextImage = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            {/* Image thumbnails */}
            {hasMultipleImages && (
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6">
                  {images.slice(0, 4).map((image, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className={`relative h-24 p-0 overflow-hidden ${
                        idx === current
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      }`}
                      onClick={() => setCurrent(idx)}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${idx + 1}`}
                        className="object-cover object-center w-full h-full"
                      />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Main image */}
            <div className="w-full aspect-square">
              <div className="relative w-full h-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={images[current]}
                  alt={product.title}
                  className="w-full h-full object-center object-cover"
                />
                {hasMultipleImages && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 shadow-md"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 shadow-md"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                ${product.price}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className="h-5 w-5 flex-shrink-0 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="sr-only">5 out of 5 stars</p>
                <p className="ml-3 text-sm text-muted-foreground">
                  117 reviews
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-foreground space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{product.category?.name}</Badge>
                <Badge variant="secondary">In Stock</Badge>
              </div>
            </div>

            <form className="mt-6">
              {/* Quantity */}
              <div className="flex items-center mb-6">
                <label
                  htmlFor="quantity"
                  className="mr-4 text-sm font-medium text-foreground"
                >
                  Quantity:
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[100px]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className="px-4"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      inWishlist ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full mt-3"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </form>

            {/* Product features */}
            <div className="mt-8">
              <Separator />
              <div className="pt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-muted-foreground mr-3" />
                    <span className="text-sm text-muted-foreground">
                      Free shipping over $100
                    </span>
                  </div>
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 text-muted-foreground mr-3" />
                    <span className="text-sm text-muted-foreground">
                      30-day return policy
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-muted-foreground mr-3" />
                    <span className="text-sm text-muted-foreground">
                      2-year warranty
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-muted-foreground mr-3" />
                    <span className="text-sm text-muted-foreground">
                      24/7 customer support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="mt-8">
              <Separator />
              <div className="pt-8">
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Product Details
                </h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div>
                    <span className="font-medium text-foreground">
                      Product ID:
                    </span>{" "}
                    {product.id}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">SKU:</span>{" "}
                    {product.slug}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Category:
                    </span>{" "}
                    {product.category?.name}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Created:
                    </span>{" "}
                    {new Date(product.creationAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Last Updated:
                    </span>{" "}
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDesPage;
