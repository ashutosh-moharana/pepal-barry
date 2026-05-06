import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/products";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import ProductSkeleton from "../components/common/ProductSkeleton";
import { INVENTORY_THRESHOLDS } from "../utils/constants";
import { useSEO } from "../hooks/useSEO";

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
                    : products.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="group block flex flex-col h-full"
                        >
                            <div className="relative aspect-square rounded-[1.5rem] overflow-hidden border border-primary/10 mb-4 transition-transform duration-300 group-hover:-translate-y-1">
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
                                {product.stock <= INVENTORY_THRESHOLDS.OUT_OF_STOCK && (
                                    <div className="absolute inset-0 bg-background/40 flex items-center justify-center backdrop-blur-sm">
                                        <span className="bg-background/90 text-heading px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                                            Sold Out
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2 flex-1 flex flex-col">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-display font-semibold text-heading group-hover:text-primary transition-colors line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <span className="text-base font-semibold text-heading shrink-0">
                                        ₹{product.price}
                                    </span>
                                </div>
                                <p className="text-sm text-subtle line-clamp-2 mt-auto leading-relaxed">{product.description}</p>
                            </div>
                        </Link>
                    ))}
            </div>

            {!loading && products.length === 0 && (
                <div className="text-center text-subtle py-20">
                    No products found. Check back soon!
                </div>
            )}
        </div>
    );
}
