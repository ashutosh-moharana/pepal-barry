import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckoutContext } from "./CheckoutContext";

const STORAGE_KEY = "pepalbarry-checkout";

const initialState = {
  product: null,
  address: null,
  orderId: null,
};

export function CheckoutProvider({ children }) {
  const location = useLocation();

  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return initialState;

    // Priority 1: Initialize from navigation state (e.g. Buy Now clicked)
    if (location.state?.product) {
      return {
        ...initialState,
        product: location.state.product,
      };
    }

    // Priority 2: Restore from session storage (e.g. Page refresh)
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.warn("Failed to parse checkout session", error);
      }
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      setProduct: (product) =>
        setState((prev) => ({ ...prev, product, orderId: null })),
      setAddress: (address) => setState((prev) => ({ ...prev, address })),
      setOrderId: (orderId) => setState((prev) => ({ ...prev, orderId })),
      resetCheckout: () => {
        setState(initialState);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      },
    }),
    [state]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

