import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../services/products";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import BackButton from "../components/common/BackButton";
import PageLoader from "../components/common/PageLoader";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <Card className="p-10 text-center max-w-lg">
          <h2 className="text-2xl font-semibold text-heading mb-3">
            {error || "Product not found"}
          </h2>
          <Button onClick={() => navigate("/#products")}>Back to shop</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 md:px-16 py-24">
      <BackButton />
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-start">
        <Card className="p-6 md:p-10 bg-card/90 border border-primary/15">
          <div className="aspect-square rounded-[36px] bg-primary/5 flex items-center justify-center">
            <img
              src={
                product.images?.[0] ||
                product.image ||
                "https://placehold.co/600x600?text=No+Image"
              }
              alt={product.name}
              className="w-4/5 object-contain drop-shadow-2xl"
            />
          </div>
        </Card>

        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-primary/70">
            Jar #{productId?.slice(-2)}
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-heading">
            {product.name}
          </h1>
          <p className="text-lg text-subtle">{product.description}</p>

          <div className="flex items-center gap-6">
            <span className="text-3xl font-semibold text-heading">
              ₹{product.price}
            </span>
            <span className="text-sm text-subtle">
              {Number(product.stock ?? 0) <= 0
                ? "Out of stock"
                : Number(product.stock ?? 0) > 6
                  ? "Ready to ship"
                  : `Only ${product.stock} jars left`}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <label className="text-sm font-medium text-subtle">Quantity</label>
            <div className="inline-flex items-center gap-6 rounded-full border border-primary/20 px-5 py-2.5">
              <button
                className="text-2xl"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-2xl font-semibold">{quantity}</span>
              <button
                className="text-2xl"
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1"
              onClick={handleBuyNow}
              disabled={Number(product.stock ?? 0) <= 0}
            >
              {Number(product.stock ?? 0) <= 0 ? "Sold Out" : "Buy now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
