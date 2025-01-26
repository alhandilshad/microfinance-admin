"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function PrivacyPolicy() {
  return (
    <div>
      <Header />

      <div className="container mx-auto mt-10 mb-10 p-4 font-merriweather text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="text-lg mb-4">
          Welcome to Cleopatra Watches Store. Your privacy is important to us.
          This Privacy Policy outlines the types of personal information we
          collect, how we use and protect it, and your rights regarding your
          data.
        </p>

        <h2 className="text-2xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Name and contact details (e.g., email, phone number, address).
          </li>
          <li>Payment information for processing transactions.</li>
          <li>Browsing behavior and purchase history on our website.</li>
          <li>Device and IP address details for security purposes.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To process and fulfill your orders.</li>
          <li>
            To communicate with you regarding your purchases or inquiries.
          </li>
          <li>
            To enhance your shopping experience by personalizing our services.
          </li>
          <li>To improve the functionality and security of our website.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">
          3. Sharing Your Information
        </h2>
        <p className="mb-4">
          We respect your privacy and do not sell or share your personal
          information with third parties, except as necessary to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Process payments securely.</li>
          <li>Deliver your orders through trusted shipping partners.</li>
          <li>Comply with legal obligations or protect against fraud.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">
          4. Security of Your Data
        </h2>
        <p className="mb-4">
          We take reasonable measures to safeguard your information using secure
          servers, encryption, and regular system monitoring. However, no online
          platform can guarantee complete security.
        </p>

        <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Access, update, or delete your personal information.</li>
          <li>Opt-out of marketing communications at any time.</li>
          <li>Request clarification on how we use your data.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">
          6. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically to reflect changes in
          our practices or legal requirements. Please check this page for
          updates.
        </p>

        <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p className="text-lg font-semibold">
          Email: Cleopatra@gmail.com
        </p>
        <p className="text-lg font-semibold">Phone: +971502553602</p>
      </div>
      <Footer />
    </div>
  );
}
