import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/products";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import ProductSkeleton from "../components/common/ProductSkeleton";
import { INVENTORY_THRESHOLDS } from "../utils/constants";
import { useSEO } from "../hooks/useSEO";
import { getEffectivePrice, getDiscountLabel } from "../utils/pricing";

export default function Shop() {
    useSEO({
        title: "Shop Collection",
        description: "Browse our entire collection of handcrafted functional treats.",
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="pt-32 pb-16 px-5 md:px-20 max-w-7xl mx-auto">
            <BackButton />
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <h1 className="font-display text-4xl md:text-5xl text-heading">
                    Shop the Collection
                </h1>
                <p className="text-lg text-subtle">
                    Handcrafted functional treats made with minimal ingredients and maximal
                    nourishment.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                    : products.map((product) => {
                        const isOutOfStock = product.stock <= INVENTORY_THRESHOLDS.OUT_OF_STOCK;
                        return (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className={`group block flex flex-col h-full ${isOutOfStock ? "pointer-events-auto" : ""}`}
                        >
                            <div className={`relative aspect-square rounded-[1.5rem] overflow-hidden border mb-4 transition-transform duration-300 ${
                                isOutOfStock
                                    ? "border-gray-200 opacity-60"
                                    : "border-primary/10 group-hover:-translate-y-1"
                            }`}>
                                <img
                                    src={
                                        product.images?.[0] ||
                                        product.image ||
                                        "https://placehold.co/1000x1000?text=Product+Image"
                                    }
                                    alt={product.name}
                                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                                        isOutOfStock
                                            ? "grayscale"
                                            : "group-hover:scale-105"
                                    }`}
                                    loading="lazy"
                                />
                                {isOutOfStock && (
                                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
                                            Sold Out
                                        </span>
                                    </div>
                                )}
                                {!isOutOfStock && getDiscountLabel(product) && (
                                    <div className="absolute left-3 top-3">
                                        <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-red-600/20">
                                            {getDiscountLabel(product)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2 flex-1 flex flex-col">
                                <div className="flex flex-col gap-1">
                                    <h3 className={`text-lg font-display font-semibold line-clamp-2 ${
                                        isOutOfStock
                                            ? "text-gray-400"
                                            : "text-heading group-hover:text-primary transition-colors"
                                    }`}>
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-base font-semibold shrink-0 ${
                                            isOutOfStock ? "text-gray-400" : "text-heading"
                                        }`}>
                                            ₹{getEffectivePrice(product)}
                                        </span>
                                        {!isOutOfStock && getDiscountLabel(product) && (
                                            <span className="text-sm text-subtle line-through">
                                                ₹{product.price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className={`text-sm line-clamp-2 mt-auto leading-relaxed ${
                                    isOutOfStock ? "text-gray-400" : "text-subtle"
                                }`}>{product.description}</p>
                            </div>
                        </Link>
                    );
                    })}
            </div>

            {!loading && products.length === 0 && (
                <div className="text-center text-subtle py-20">
                    No products found. Check back soon!
                </div>
            )}
        </div>
    );
}
