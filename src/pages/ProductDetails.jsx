import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../services/products";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import BackButton from "../components/common/BackButton";
import PageLoader from "../components/common/PageLoader";
import { INVENTORY_THRESHOLDS } from "../utils/constants";
import { useSEO } from "../hooks/useSEO";
import { getEffectivePrice, getDiscountLabel } from "../utils/pricing";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSEO({
    title: product ? product.name : "Product Details",
    description: product ? product.description : "View details of our premium product.",
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
        if (location.state?.buyNow) {
          setQuantity(1);
        }
      } catch (err) {
        console.error("Failed to load product", err);
        setError("Unable to load this recipe. Please refresh.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId, location.state]);

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login", {
        state: { from: "/checkout/order-summary", product: { ...product, quantity } },
      });
      return;
    }
    navigate("/checkout/order-summary", {
      state: { product: { ...product, quantity } },
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-5">
        <Card className="p-10 text-center max-w-lg border border-primary/10">
          <h2 className="text-2xl font-display font-semibold text-heading mb-3">
            {error || "Product not found"}
          </h2>
          <Button onClick={() => navigate("/#products")}>Back to shop</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-10 pt-16 px-4 md:px-16 sm:py-20 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 md:mb-10">
          <BackButton />
        </div>
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
          <div className="relative aspect-square w-full max-w-[220px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-none lg:w-full overflow-hidden rounded-[2rem] border border-primary/10 group">
            <img
              src={
                product.images?.[0] ||
                product.image ||
                "https://placehold.co/1000x1000?text=Product+Image"
              }
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                Number(product.stock ?? 0) <= INVENTORY_THRESHOLDS.OUT_OF_STOCK
                  ? "grayscale"
                  : "group-hover:scale-105"
              }`}
            />
            {Number(product.stock ?? 0) <= INVENTORY_THRESHOLDS.OUT_OF_STOCK && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-[2px] z-10">
                <span className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-bold tracking-wide uppercase shadow-lg">
                  Sold Out
                </span>
              </div>
            )}
            
            {getDiscountLabel(product) && Number(product.stock ?? 0) > INVENTORY_THRESHOLDS.OUT_OF_STOCK && (
              <div className="absolute left-6 top-6 z-20">
                <span className="inline-flex items-center rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-red-600/20 backdrop-blur-md">
                  {getDiscountLabel(product)}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6 lg:space-y-10">
            <div className="space-y-2 sm:space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Jar #{productId?.slice(-2)}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-semibold text-heading leading-tight break-words">
                {product.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-subtle leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-baseline gap-4 sm:gap-6">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl md:text-5xl font-display font-semibold text-heading">
                  ₹{getEffectivePrice(product)}
                </span>
                {getDiscountLabel(product) && (
                  <span className="text-lg sm:text-2xl font-medium text-subtle line-through">
                    ₹{product.price}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-subtle uppercase tracking-wider">
                {Number(product.stock ?? 0) <= INVENTORY_THRESHOLDS.OUT_OF_STOCK
                  ? "Out of stock"
                  : Number(product.stock ?? 0) > INVENTORY_THRESHOLDS.LOW_STOCK_WARNING
                    ? "Ready to ship"
                    : `Only ${product.stock} jars left`}
              </span>
            </div>

            {/* Desktop Action Area - Hidden on small mobile */}
            {Number(product.stock ?? 0) <= INVENTORY_THRESHOLDS.OUT_OF_STOCK ? (
              <div className="hidden sm:block rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-600">Currently Unavailable</p>
                <p className="text-sm text-gray-400">This item is out of stock. Check back soon for restocks!</p>
              </div>
            ) : (
              <div className="hidden sm:flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                <div className="flex items-center gap-4 bg-muted/50 rounded-full p-1 border border-primary/10">
                  <button
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all active:scale-90 shadow-sm"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    <span className="text-xl font-medium">−</span>
                  </button>
                  <span className="text-xl font-display font-semibold w-6 text-center">{quantity}</span>
                  <button
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all active:scale-90 shadow-sm"
                    onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                    aria-label="Increase quantity"
                  >
                    <span className="text-xl font-medium">+</span>
                  </button>
                </div>

                <div className="pt-0">
                  <Button
                    className="px-8 py-3 text-lg"
                    onClick={handleBuyNow}
                  >
                    Buy now
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      {Number(product.stock ?? 0) <= INVENTORY_THRESHOLDS.OUT_OF_STOCK ? (
        <div className="fixed sm:hidden bottom-0 left-0 right-0 p-4 bg-gray-50/95 backdrop-blur-md border-t border-gray-200 flex items-center justify-center gap-3 z-40">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <span className="text-base font-semibold text-gray-500">Currently Unavailable</span>
        </div>
      ) : (
        <div className="fixed sm:hidden bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-primary/10 flex items-center justify-between gap-4 z-40">
          <div className="flex items-center gap-4 bg-muted/50 rounded-full p-1 border border-primary/10">
            <button
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-90 transition-all shadow-sm"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              aria-label="Decrease quantity"
            >
              <span className="text-xl font-medium">−</span>
            </button>
            <span className="text-lg font-display font-semibold w-4 text-center">{quantity}</span>
            <button
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-90 transition-all shadow-sm"
              onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
              aria-label="Increase quantity"
            >
              <span className="text-xl font-medium">+</span>
            </button>
          </div>
          <Button
            className="flex-1 py-3.5 text-lg shadow-lg"
            onClick={handleBuyNow}
          >
            Buy now
          </Button>
        </div>
      )}
    </div>
  );
}
