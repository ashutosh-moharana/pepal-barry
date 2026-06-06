import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/products";
import SectionHeading from "./common/SectionHeading";
import ProductSkeleton from "./common/ProductSkeleton";
import { getEffectivePrice, getDiscountLabel } from "../utils/pricing";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
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
            <Link
              key={product._id || product.name}
              to={`/product/${product._id}`}
              className="group flex flex-col overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-primary/10 bg-card transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <div className="relative aspect-square w-full overflow-hidden border-b border-primary/5">
                <img
                  src={
                    product.images?.[0] ||
                    product.image ||
                    "https://placehold.co/1000x1000?text=Product+Image"
                  }
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-background/90 px-4 py-1.5 text-xs font-semibold tracking-widest text-heading backdrop-blur-md">
                  JAR #{String(index + 1).padStart(2, "0")}
                </div>

                {getDiscountLabel(product) && (
                  <div className="absolute left-5 bottom-5 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-lg shadow-red-600/20">
                    {getDiscountLabel(product)}
                  </div>
                )}

                {Number(product.stock ?? 0) <= 0 && (
                  <div className="absolute right-5 top-5 inline-flex items-center rounded-full bg-background/90 px-4 py-1.5 text-xs font-semibold text-heading backdrop-blur-md">
                    Sold out
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-heading leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <p className="shrink-0 text-lg md:text-xl font-semibold text-heading">
                    ₹{getEffectivePrice(product)}
                  </p>
                  {getDiscountLabel(product) && (
                    <p className="text-base font-medium text-subtle line-through">
                      ₹{product.price}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
