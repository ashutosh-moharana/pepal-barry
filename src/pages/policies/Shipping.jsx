import React from "react";
import BackButton from "../../components/common/BackButton";

export default function Shipping() {
  return (
    <div className="min-h-screen bg-background px-4 pt-24 pb-16 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <BackButton />
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-subtle font-bold">Policies</p>
          <h1 className="text-4xl font-semibold text-heading font-display">Shipping & Delivery Policy</h1>
          <p className="text-subtle">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-stone max-w-none text-foreground/80 space-y-6">
          <p>
            Thank you for shopping at Pepal Barry. Following are the terms and conditions that constitute our Shipping Policy.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">1. Processing Time</h2>
          <p>
            All orders are processed and baked fresh. Please allow 1-2 business days for your order to be processed before it is shipped. Orders are not shipped or delivered on weekends or holidays.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">2. Delivery Estimates</h2>
          <p>
            Our standard shipping time is <strong>3-5 business days</strong> from the date of dispatch. Delivery delays can occasionally occur due to unforeseen circumstances with courier partners, weather conditions, or high-volume seasons.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">3. Shipping Rates</h2>
          <p>
            Shipping charges for your order will be calculated and displayed at checkout. We occasionally offer free shipping promotions, which will be automatically applied to qualifying orders.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">4. Shipment Confirmation & Order Tracking</h2>
          <p>
            You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">5. Damages in Transit</h2>
          <p>
            Pepal Barry takes utmost care in packaging our jars securely. However, if you receive a damaged product, please refer to our Return & Refund Policy and contact us within 48 hours with photographic evidence.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Contact Us</h2>
          <p>
            If you have any questions about our Shipping Policy, please contact us:
            <br />
            Email: barrypepal@gmail.com
            <br />
            Phone: +91 8114308213
          </p>
        </div>
      </div>
    </div>
  );
}
