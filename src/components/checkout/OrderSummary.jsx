import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import Button from "../common/Button";

export default function OrderSummary() {
  const navigate = useNavigate();
  const { product, setProduct } = useCheckout();

  if (!product) {
    return (
      <div className="p-6 text-center text-subtle">
        Loading your jar details…
      </div>
    );
  }

  const quantity = product.quantity || 1;
  const price = Number(product.price) || 0;
  const total = (price * quantity).toFixed(2);

  const updateQuantity = (modifier) => {
    const nextQuantity = Math.max(1, quantity + modifier);
    setProduct({
      ...product,
      quantity: nextQuantity,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={
            product.images?.[0] ||
            product.image ||
            "https://placehold.co/600x600?text=No+Image"
          }
          alt={product.name}
          className="w-full md:w-1/3 rounded-3xl bg-muted object-cover"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-semibold text-heading">{product.name}</h2>
          <p className="text-subtle">{product.description}</p>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold text-heading">
              ₹{price.toFixed(2)}
            </div>
            <div className="inline-flex items-center gap-4 rounded-full border border-primary/20 px-4 py-2">
              <button type="button" onClick={() => updateQuantity(-1)}>
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button type="button" onClick={() => updateQuantity(1)}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-primary/10 bg-muted p-6 space-y-3">
        <div className="flex justify-between text-subtle">
          <span>Items ({quantity})</span>
          <span>
            ₹{price.toFixed(2)} × {quantity}
          </span>
        </div>
        <div className="flex justify-between text-subtle">
          <span>Delivery</span>
          <span className="text-emerald-600">Free</span>
        </div>
        <div className="border-t border-primary/10 pt-3 flex justify-between font-semibold text-heading text-xl">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => navigate("/checkout/address")}>Deliver to…</Button>
      </div>
    </div>
  );
}

