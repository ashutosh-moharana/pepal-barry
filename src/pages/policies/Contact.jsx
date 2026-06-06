import React from "react";
import BackButton from "../../components/common/BackButton";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background px-4 pt-24 pb-16 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <BackButton />
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-subtle font-bold">Policies</p>
          <h1 className="text-4xl font-semibold text-heading font-display">Contact Us</h1>
          <p className="text-subtle">We're here to help.</p>
        </div>

        <div className="prose prose-stone max-w-none text-foreground/80 space-y-6">
          <p>
            Have a question about an order, a specific flavor, or wholesale pricing? Drop us a line. We try to respond to all inquiries within 24 hours.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 mt-8">
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-semibold text-heading mb-4">Support & General Queries</h3>
              <p className="mb-2"><strong>Email:</strong> <a href="mailto:barrypepal@gmail.com" className="text-primary hover:underline">barrypepal@gmail.com</a></p>
              <p><strong>Phone:</strong> +91 8114308213</p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-semibold text-heading mb-4">Business Address</h3>
              <p className="whitespace-pre-line leading-relaxed">
                Pepal Barry
                [Your Physical Address Here, City, State, ZIP]
                India
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-heading mt-8">Hours of Operation</h2>
          <p>
            Our bakery operates and dispatches orders during the following hours:
            <br />
            Monday - Friday: 9:00 AM - 5:00 PM (IST)
            <br />
            Saturday - Sunday: Closed for baking!
          </p>
        </div>
      </div>
    </div>
  );
}
