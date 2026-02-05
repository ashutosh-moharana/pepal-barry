import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutProvider";
import Button from "../common/Button";
import { useForm } from "react-hook-form";

export default function AddressForm() {
  const navigate = useNavigate();
  const { product, address, setAddress } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: address || {
      fullName: "",
      phoneNumber: "",
      houseNo: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const onSubmit = (data) => {
    setAddress(data);
    navigate("/checkout/payment");
  };

  useEffect(() => {
    if (!product) {
      navigate("/shop", { replace: true });
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-heading">Shipping address</h2>
        <p className="text-sm text-subtle">
          We currently deliver PAN India via Bluedart & Delhivery.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Full name"
            error={errors.fullName}
            {...register("fullName", { required: "Full name is required" })}
          />
          <InputField
            label="Phone"
            type="tel"
            error={errors.phoneNumber}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit number",
              },
            })}
          />
        </div>

        <InputField
          label="House / Apartment"
          placeholder="Flat 101, Building A"
          error={errors.houseNo}
          {...register("houseNo", { required: "House/Apartment is required" })}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Street"
            error={errors.address}
            {...register("address", { required: "Street address is required" })}
          />
          <InputField
            label="Landmark"
            placeholder="Opp. Community Park"
            error={errors.landmark}
            {...register("landmark")}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <InputField
            label="City"
            error={errors.city}
            {...register("city", { required: "City is required" })}
          />
          <InputField
            label="State"
            error={errors.state}
            {...register("state", { required: "State is required" })}
          />
          <InputField
            label="Pincode"
            error={errors.pincode}
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Invalid Pincode",
              },
            })}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate("/checkout/order-summary")}
          >
            Back
          </Button>
          <Button type="submit" className="w-full sm:w-auto">Continue to payment</Button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, error, type = "text", className, ...props }) {
  return (
    <label className="text-sm font-medium text-subtle block space-y-2">
      <span className="flex items-center gap-1">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <input
        type={type}
        className={`w-full rounded-2xl border ${error ? "border-red-400 focus:ring-red-200" : "border-primary/15"
          } bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </label>
  );
}

