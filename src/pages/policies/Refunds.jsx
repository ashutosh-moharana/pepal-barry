import React from "react";
import BackButton from "../../components/common/BackButton";

export default function Refunds() {
  return (
    <div className="min-h-screen bg-background px-4 pt-24 pb-16 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <BackButton />
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-subtle font-bold">Policies</p>
          <h1 className="text-4xl font-semibold text-heading font-display">Cancellation & Refund Policy</h1>
          <p className="text-subtle">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-stone max-w-none text-foreground/80 space-y-6">
          <p>
            Thank you for shopping at Pepal Barry. We want you to be completely satisfied with your purchase. Since we deal in perishable baked goods, our refund and cancellation policies are specifically tailored to ensure quality and fairness.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">1. Cancellations</h2>
          <p>
            You may cancel your order within 24 hours of placing it for a full refund, provided the order has not already been prepared or shipped. To request a cancellation, please contact us immediately at barrypepal@gmail.com or call +91 8114308213.
          </p>
          <p>
            Once an order has been dispatched, it cannot be cancelled.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">2. Refunds</h2>
          <p>
            Because our cookies and jars are consumable, perishable goods, we generally do not accept returns. However, we will issue a refund or replacement under the following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You received the wrong item.</li>
            <li>The product arrived severely damaged or compromised.</li>
            <li>The package was lost in transit and delivery is unable to be confirmed.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-heading mt-8">3. Process for Damaged/Incorrect Items</h2>
          <p>
            If your order arrives damaged or incorrect, please email us within 48 hours of delivery at barrypepal@gmail.com with:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your order number.</li>
            <li>Clear photographs of the damaged item(s) and packaging.</li>
          </ul>
          <p>
            Upon review, we will process your refund or ship a replacement at no additional cost to you.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">4. Refund Timeline</h2>
          <p>
            Approved refunds will be initiated back to your original method of payment (via Razorpay). Please allow 5-7 business days for the amount to reflect in your bank account, depending on your card issuer's policies.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Contact Us</h2>
          <p>
            If you have any questions about our Refunds Policy, please contact us:
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
