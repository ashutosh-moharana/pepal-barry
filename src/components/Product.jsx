import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/products";
import Button from "./common/Button";
import SectionHeading from "./common/SectionHeading";
import Card from "./common/Card";
import { useAuth } from "../context/AuthContext";
import ProductSkeleton from "./common/ProductSkeleton";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const handleQuickBuy = (product) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: "/checkout/order-summary", product: { ...product, quantity: 1 } },
      });
      return;
    }
    navigate("/checkout/order-summary", {
      state: { product: { ...product, quantity: 1 } },
    });
  };


  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Unable to load our jars right now. Please refresh.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (error) {
    return (
      <section id="products" className="px-5 md:px-20 py-16">
        <div className="max-w-3xl mx-auto text-center bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="px-5 md:px-20 py-18 md:py-24 space-y-16 bg-gradient-to-b from-background to-muted/60"
    >
      <SectionHeading
        eyebrow="Curated collection"
        title="Our Signature Jars"
        description="Small-batch indulgence. We've mastered these two recipes to perfection."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {loading &&
          Array.from({ length: 2 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}

        {!loading && products.length === 0 && (
          <div className="col-span-full rounded-3xl border border-primary/15 bg-muted/60 p-10 text-center">
            <p className="text-lg font-semibold text-heading">
              We're baking fresh stock. Check back tomorrow!
            </p>
          </div>
        )}

        {!loading &&
          products.slice(0, 2).map((product, index) => (
            <article
              key={product._id || product.name}
              className="flex flex-col gap-6 p-6 md:p-8 bg-card rounded-[2.5rem] border border-primary/10 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-full aspect-square rounded-[2rem] bg-muted/30 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-3/4 object-contain drop-shadow-2xl z-10 transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-4 text-center">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-primary/70 font-bold">
                    Batch No. 00{index + 1}
                  </p>
                  <h3 className="text-3xl font-display font-medium text-heading">
                    {product.name}
                  </h3>
                </div>

                <p className="text-subtle line-clamp-3 px-4">
                  {product.description}
                </p>

                <div className="flex flex-col items-center gap-4 pt-2">
                  <p className="text-2xl font-semibold text-heading">
                    ₹{product.price}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                      className="flex-1 sm:flex-none"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 sm:flex-none"
                      onClick={() => handleQuickBuy(product)}
                      disabled={Number(product.stock ?? 0) <= 0}
                    >
                      {Number(product.stock ?? 0) <= 0 ? "Sold Out" : "Quick Buy"}
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
