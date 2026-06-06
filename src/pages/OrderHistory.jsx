import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../services/orders";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import SectionHeading from "../components/common/SectionHeading";
import Card from "../components/common/Card";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError("Unable to fetch your orders right now. Please retry.");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const handleReorder = (order) => {
    const firstItem = order.products?.[0];
    const productId =
      firstItem?.productId?._id || firstItem?.productId || order.products?.[0];
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background px-5 md:px-20 pb-20 pt-28">
      <BackButton />
      <SectionHeading
        eyebrow="Your jars"
        title="Order history"
        description="Track statuses, download invoices and reorder your pantry favorites."
      />

      {loading && <OrdersSkeleton />}
      {error && (
        <div className="max-w-3xl mx-auto mt-10 bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="max-w-3xl mx-auto mt-10 bg-muted rounded-3xl p-10 text-center space-y-4">
          <p className="text-lg font-semibold text-heading">
            No orders yet — the perfect time to treat yourself.
          </p>
          <Button onClick={() => navigate("/#products")}>Browse jars</Button>
        </div>
      )}

      <div className="mt-10 space-y-6">
        {orders.map((order) => (
          <Card
            key={order._id}
            className="p-6 md:p-8 border border-primary/10 bg-card"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-subtle">
                  Order #{order._id.slice(-6)}
                </p>
                <h3 className="text-2xl font-semibold text-heading">
                  {order.products?.length} item
                  {order.products?.length > 1 ? "s" : ""}
                </h3>
                <p className="text-sm text-subtle">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="text-sm uppercase tracking-wider text-subtle">
                  {order.mode}
                </span>
                <span className="text-xl font-semibold text-heading">
                  ₹{order.totalAmount}
                </span>
                <StatusPill status={order.paymentStatus} type="payment" />
                <StatusPill status={order.deliveryStatus} type="delivery" />
              </div>
            </div>

            <ul className="mt-4 text-sm text-subtle list-disc list-inside space-y-1">
              {order.products?.map((item) => (
                <li key={item._id}>
                  {item.productId?.name || "Product"} × {item.quantity}
                  {item.priceAtPurchase ? ` (₹${item.priceAtPurchase} each)` : ""}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-primary/10 pt-4 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => handleReorder(order)}>
                Reorder
              </Button>
              <Button variant="ghost" onClick={() => navigate("/#products")}>
                Need help?
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status, type }) {
  let styles = "bg-gray-100 text-gray-700";

  if (type === "payment") {
    styles =
      status === "paid"
        ? "bg-primary/10 text-primary border border-primary/20"
        : "bg-amber-100 text-amber-800 border border-amber-200";
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles}`}>
        {status === "paid" ? "Paid" : "Payment Pending"}
      </span>
    );
  }
  switch (status) {
    case "Processing":
      styles = "bg-secondary text-secondary-foreground border border-secondary";
      break;
    case "Shipped":
      styles = "bg-accent/10 text-accent border border-accent/20";
      break;
    case "Delivered":
      styles = "bg-primary/10 text-primary border border-primary/20";
      break;
    case "Cancelled":
      styles = "bg-red-50 text-red-700 border border-red-200";
      break;
    default:
      styles = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles}`}>
      {status}
    </span>
  );
}

function OrdersSkeleton() {
  return (
    <div className="mt-10 space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="p-6 rounded-3xl border border-primary/10 bg-muted animate-pulse space-y-4"
        >
          <div className="h-4 bg-white/60 rounded-full w-32" />
          <div className="h-6 bg-white/60 rounded-full w-3/4" />
          <div className="h-6 bg-white/60 rounded-full w-24" />
        </div>
      ))}
    </div>
  );
}

