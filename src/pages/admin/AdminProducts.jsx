import { useState, useEffect } from "react";
import httpClient from "../../services/httpClient";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import PageLoader from "../../components/common/PageLoader";
import Input from "../../components/common/Input";
import { useForm } from "react-hook-form";
import { PiPencilSimple, PiTrash, PiPlusBold } from "react-icons/pi";

export default function AdminProducts() {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await httpClient.get(`/api/products?page=${page}&limit=10&q=${searchQuery}`);
            if (data.success) {
                setProducts(data.products);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, searchQuery]);

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
            const config = {};

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
                <Button onClick={() => openModal()} className="flex items-center gap-2 px-3 sm:px-4">
                    <PiPlusBold size={18} className="sm:size-4" />
                    <span className="hidden sm:inline">Add Product</span>
                </Button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSearchQuery(searchInput); setPage(1); }} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full sm:max-w-sm rounded-xl border border-primary/15 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button type="submit" className="w-full sm:w-auto">Search</Button>
            </form>

            <div className="bg-white rounded-3xl border border-primary/10 overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[800px]">
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
                                <td className="p-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => openModal(product)}
                                            className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                                            title="Edit Product"
                                            aria-label="Edit Product"
                                        >
                                            <PiPencilSimple size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                            disabled={deletingId === product._id}
                                            title="Delete Product"
                                            aria-label="Delete Product"
                                        >
                                            {deletingId === product._id ? (
                                                <div className="w-[18px] h-[18px] rounded-full border-2 border-current border-t-transparent animate-spin" />
                                            ) : (
                                                <PiTrash size={18} />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <Button 
                    variant="outline" 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span className="text-subtle text-sm">Page {page} of {totalPages}</span>
                <Button 
                    variant="outline" 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
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
                                <label className="block text-sm font-medium text-subtle mb-2">
                                    Images {editingProduct && "(Leave empty to keep existing)"}
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="w-full rounded-2xl border border-primary/15 bg-white p-2 text-sm text-subtle file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary hover:file:text-white cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary/30"
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
