import { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import PageLoader from "../../components/common/PageLoader";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [updatingOrderIds, setUpdatingOrderIds] = useState(new Set());
    const [toastMessage, setToastMessage] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await httpClient.get(`/api/orders/all?page=${page}&limit=10&q=${searchQuery}&status=${statusFilter}&paymentStatus=${paymentFilter}`);
            setOrders(res.data.orders);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error("Failed to fetch orders", err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, searchQuery, statusFilter, paymentFilter]);

    const handleStatusUpdate = async (orderId, deliveryStatus, paymentStatus) => {
        try {
            setUpdatingOrderIds((prev) => new Set(prev).add(orderId));
            const payload = {};
            if (deliveryStatus) payload.status = deliveryStatus;
            if (paymentStatus) payload.paymentStatus = paymentStatus;

            await httpClient.put(`/api/orders/${orderId}/status`, payload);
            
            setToastMessage({ type: 'success', text: `Order #${orderId.slice(-6)} updated successfully` });
            setTimeout(() => setToastMessage(null), 3000);

            // Re-fetch to ensure fresh derived/populated state
            fetchOrders();
        } catch (err) {
            console.error("Failed to update status", err);
            setToastMessage({ type: 'error', text: "Failed to update order status" });
            setTimeout(() => setToastMessage(null), 3000);
        } finally {
            setUpdatingOrderIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(orderId);
                return newSet;
            });
        }
    };

    if (loading) return <PageLoader />;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-6 relative">
            {toastMessage && (
                <div className={`fixed bottom-4 right-4 md:bottom-10 md:right-10 z-50 px-5 py-3 rounded-2xl shadow-xl border ${toastMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'} flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4`}>
                    <span className="font-medium text-sm">{toastMessage.text}</span>
                </div>
            )}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-heading">Orders</h2>
                <span className="text-sm text-subtle">{orders.length} total orders</span>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-2">
                <form onSubmit={(e) => { e.preventDefault(); setSearchQuery(searchInput); setPage(1); }} className="flex flex-col sm:flex-row gap-2 flex-1">
                    <input
                        type="text"
                        placeholder="Search order ID..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full sm:max-w-sm rounded-xl border border-primary/15 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 w-full sm:w-auto">Search</button>
                </form>
                <div className="flex flex-col sm:flex-row gap-2">
                    <select 
                        value={paymentFilter} 
                        onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
                        className="w-full sm:w-auto rounded-xl border border-primary/15 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                        <option value="">All Payments</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                    </select>
                    <select 
                        value={statusFilter} 
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="w-full sm:w-auto rounded-xl border border-primary/15 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                        <option value="">All Statuses</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4">
                {orders.map((order) => (
                    <Card key={order._id} className="p-6 border border-primary/10">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <div>
                                <p className="text-sm font-medium text-primary">#{order._id.slice(-6)}</p>
                                <p className="text-sm text-subtle">
                                    {new Date(order.createdAt).toLocaleDateString()} at{" "}
                                    {new Date(order.createdAt).toLocaleTimeString()}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 md:mt-0">
                                <select
                                    value={order.paymentStatus}
                                    onChange={(e) => handleStatusUpdate(order._id, null, e.target.value)}
                                    disabled={updatingOrderIds.has(order._id)}
                                    className={`w-full sm:w-auto text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed ${order.paymentStatus === "paid"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                        }`}
                                >
                                    {["pending", "paid"].map((status) => (
                                        <option key={status} value={status}>
                                            {status === "paid" ? "Paid" : "Pending"}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={order.deliveryStatus}
                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                    disabled={updatingOrderIds.has(order._id)}
                                    className="w-full sm:w-auto text-sm border border-primary/20 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {["Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                {updatingOrderIds.has(order._id) && (
                                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            {order.products.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span className="text-heading">
                                        {item.productId?.name || "Unknown Product"} <span className="text-subtle">x{item.quantity}</span>
                                    </span>
                                    <span>₹{(item.priceAtPurchase || item.productId?.price || 0) * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-primary/5 flex flex-col md:flex-row justify-between gap-4 text-sm text-subtle">
                            <div>
                                <p className="font-medium text-heading mb-1">Customer</p>
                                <p>{order.user?.name}</p>
                                <p>{order.user?.email}</p>
                            </div>
                            <div>
                                <p className="font-medium text-heading mb-1">Shipping</p>
                                <p>{order.shippingAddress?.fullName}</p>
                                <p>{order.shippingAddress?.phoneNumber}</p>
                                <p>
                                    {order.shippingAddress?.houseNo}, {order.shippingAddress?.address}
                                </p>
                                <p>
                                    {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                                    {order.shippingAddress?.pincode}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-heading mb-1">Total</p>
                                <p className="text-lg font-semibold text-primary">₹{order.totalAmount}</p>
                                <p className="text-xs mb-2">{order.mode}</p>
                                <p className="text-xs text-subtle font-mono break-all" title={order._id}>
                                    ID: {order._id}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-12 text-subtle bg-muted rounded-3xl">
                        No orders found.
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mt-4">
                <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-xl disabled:opacity-50 text-sm font-medium hover:bg-muted"
                >
                    Previous
                </button>
                <span className="text-subtle text-sm">Page {page} of {totalPages}</span>
                <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-xl disabled:opacity-50 text-sm font-medium hover:bg-muted"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
