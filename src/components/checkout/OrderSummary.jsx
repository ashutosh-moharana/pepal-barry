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
      <div className="flex flex-row items-center md:items-start gap-4 sm:gap-6 bg-card rounded-3xl p-4 sm:p-0 border border-primary/5 sm:border-none">
        <img
          src={
            product.images?.[0] ||
            product.image ||
            "https://placehold.co/600x600?text=No+Image"
          }
          alt={product.name}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-1/3 md:h-auto md:max-w-[240px] aspect-square rounded-2xl sm:rounded-3xl bg-muted object-cover shrink-0"
        />
        <div className="flex-1 space-y-2 sm:space-y-4 text-left w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-heading leading-tight">{product.name}</h2>
          <p className="text-subtle text-xs sm:text-sm md:text-base line-clamp-2">{product.description}</p>
          <div className="flex flex-row items-center justify-between sm:justify-start gap-4 pt-1 sm:pt-0">
            <div className="text-lg sm:text-xl md:text-2xl font-semibold text-heading">
              ₹{price.toFixed(2)}
            </div>
            <div className="flex items-center gap-3 bg-muted/50 rounded-full p-1 border border-primary/10">
              <button
                type="button"
                onClick={() => updateQuantity(-1)}
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-90 transition-all shadow-sm"
              >
                <span className="text-lg font-medium">−</span>
              </button>
              <span className="text-base sm:text-lg font-semibold w-4 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(1)}
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-90 transition-all shadow-sm"
              >
                <span className="text-lg font-medium">+</span>
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

      <div className="flex flex-col sm:flex-row justify-end pt-2">
        <Button className="w-full sm:w-auto" onClick={() => navigate("/checkout/address")}>Deliver to…</Button>
      </div>
    </div>
  );
}

