import React from "react";
import BackButton from "../../components/common/BackButton";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background px-4 pt-24 pb-16 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <BackButton />
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-subtle font-bold">Policies</p>
          <h1 className="text-4xl font-semibold text-heading font-display">Privacy Policy</h1>
          <p className="text-subtle">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-stone max-w-none text-foreground/80 space-y-6">
          <p>
            At Pepal Barry, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Pepal Barry and how we use it.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">1. Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            When you register for an Account, we may ask for your contact information, including items such as name, email address, telephone number, and address. For purchases, payment processing details are securely handled by our third-party payment gateway (Razorpay) and are not stored on our servers.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Process your transactions and manage orders</li>
            <li>Send you emails, updates, and marketing materials (if subscribed)</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-semibold text-heading mt-8">3. Third-Party Partners</h2>
          <p>
            We share necessary information with our payment processor (Razorpay) solely for the purpose of completing your transactions securely. We do not sell or rent your personal information to third parties.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">4. Cookies</h2>
          <p>
            Like any other website, Pepal Barry uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">5. Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
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
