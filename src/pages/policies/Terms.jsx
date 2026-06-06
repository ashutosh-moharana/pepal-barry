import React from "react";
import BackButton from "../../components/common/BackButton";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background px-4 pt-24 pb-16 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <BackButton />
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-subtle font-bold">Policies</p>
          <h1 className="text-4xl font-semibold text-heading font-display">Terms and Conditions</h1>
          <p className="text-subtle">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-stone max-w-none text-foreground/80 space-y-6">
          <p>
            Welcome to Pepal Barry. These Terms and Conditions outline the rules and regulations for the use of Pepal Barry's Website, located at our domain.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">1. Introduction</h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use Pepal Barry if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">2. Cookies</h2>
          <p>
            We employ the use of cookies. By accessing Pepal Barry, you agreed to use cookies in agreement with the Pepal Barry's Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">3. License</h2>
          <p>
            Unless otherwise stated, Pepal Barry and/or its licensors own the intellectual property rights for all material on Pepal Barry. All intellectual property rights are reserved. You may access this from Pepal Barry for your own personal use subjected to restrictions set in these terms and conditions.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">4. Product Availability and Pricing</h2>
          <p>
            All products and services are subject to availability and may be withdrawn at any time. Prices are subject to change without notice. We reserve the right to refuse or cancel any order placed for a product or service listed at an incorrect price.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">5. User Accounts</h2>
          <p>
            If you create an account on our website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">6. Contact Information</h2>
          <p>
            If you have any queries regarding any of our terms, please contact us at: <br />
            Email: barrypepal@gmail.com <br />
            Phone: +91 8114308213
          </p>
        </div>
      </div>
    </div>
  );
}
