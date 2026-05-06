import { useState, useEffect } from "react";
import httpClient from "../../services/httpClient";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import PageLoader from "../../components/common/PageLoader";
import Input from "../../components/common/Input";
import { useForm } from "react-hook-form";

export default function AdminProducts() {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm();

    const fetchProducts = async () => {
        try {
            const { data } = await httpClient.get("/api/products");
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
        formData.append("category", data.category);

        // Handle images: react-hook-form returns a FileList here
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append("images", data.images[i]);
            }
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            if (editingProduct) {
                await httpClient.put(
                    `/api/products/${editingProduct._id}`,
                    formData,
                    config
                );
            } else {
                await httpClient.post(
                    "/api/products",
                    formData,
                    config
                );
            }

            closeModal();
            fetchProducts();
        } catch (error) {
            console.error("Failed to save product", error);
            alert("Failed to save product");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            setDeletingId(id);
            await httpClient.delete(`/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Failed to delete product", error);
            alert("Failed to delete product");
        } finally {
            setDeletingId(null);
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category || "General",
                images: null, // Reset file input
            });
        } else {
            setEditingProduct(null);
            reset({
                name: "",
                description: "",
                price: "",
                stock: "",
                category: "General",
                images: null,
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        reset(); // Clear form
    };

    if (loading) return <PageLoader />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-heading">Products</h1>
                <Button onClick={() => openModal()}>Add Product</Button>
            </div>

            <div className="bg-white rounded-3xl border border-primary/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted border-b border-primary/10">
                        <tr>
                            <th className="p-4 font-medium text-subtle">Image</th>
                            <th className="p-4 font-medium text-subtle">Name</th>
                            <th className="p-4 font-medium text-subtle">Price</th>
                            <th className="p-4 font-medium text-subtle">Stock</th>
                            <th className="p-4 font-medium text-subtle">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-muted/50">
                                <td className="p-4">
                                    <img
                                        src={
                                            product.images?.[0] ||
                                            product.image ||
                                            "https://placehold.co/100x100?text=No+Image"
                                        }
                                        alt={product.name}
                                        className="w-12 h-12 rounded-lg object-cover bg-muted"
                                    />
                                </td>
                                <td className="p-4 font-medium text-heading">{product.name}</td>
                                <td className="p-4 text-subtle">₹{product.price}</td>
                                <td className="p-4 text-subtle">{product.stock}</td>
                                <td className="p-4 space-x-2">
                                    <button
                                        onClick={() => openModal(product)}
                                        className="text-primary hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={deletingId === product._id}
                                    >
                                        {deletingId === product._id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingProduct ? "Edit Product" : "Add Product"}
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                label="Product Name"
                                type="text"
                                placeholder="e.g. Classic Jar"
                                error={errors.name?.message}
                                {...register("name", { required: "Name is required" })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-subtle mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    rows="4"
                                    placeholder="Describe your product..."
                                    {...register("description")}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Price (₹)"
                                    type="number"
                                    placeholder="0"
                                    error={errors.price?.message}
                                    {...register("price", { required: "Price is required" })}
                                />
                                <Input
                                    label="Stock"
                                    type="number"
                                    placeholder="0"
                                    error={errors.stock?.message}
                                    {...register("stock", { required: "Stock is required" })}
                                />
                            </div>

                            <Input
                                label="Category"
                                type="text"
                                placeholder="General"
                                error={errors.category?.message}
                                {...register("category")}
                            />
                            <div>
                                <label className="block text-sm font-medium text-subtle mb-1">
                                    Images {editingProduct && "(Leave empty to keep existing)"}
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="w-full"
                                    {...register("images")}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button type="submit" loading={isSubmitting}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
