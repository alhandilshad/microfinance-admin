"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Terms() {
  return (
    <div>
      <Header />

      <div className="container mx-auto p-4 mt-10 mb-10 font-merriweather">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <section className="text-lg space-y-6">
          <p>
            Welcome to Cleopatra Watches. These Terms and Conditions govern your use of our website and services. By accessing or using this website, you agree to comply with these terms. If you do not agree, please refrain from using our website.
          </p>

          <h2 className="text-2xl font-semibold">1. General Terms</h2>
          <p>
            - This website is operated by Cleopatra Watches. Throughout the site, the terms “we,” “us,” and “our” refer to Cleopatra Watches.
            <br />
            - By agreeing to these Terms and Conditions, you confirm that you are at least the age of majority in your state or province of residence.
          </p>

          <h2 className="text-2xl font-semibold">2. Product Information</h2>
          <p>
            - We strive to ensure the accuracy of all product descriptions, pricing, and images displayed on our website.
            <br />
            - Products are subject to availability, and we reserve the right to limit the sales of our products to any person, geographic region, or jurisdiction.
          </p>

          <h2 className="text-2xl font-semibold">3. Orders and Payments</h2>
          <p>
            - By placing an order, you are making an offer to purchase the selected products, which is subject to our acceptance.
            <br />
            - Payments must be made through the payment methods listed on the website. All transactions are secure and encrypted.
          </p>

          <h2 className="text-2xl font-semibold">4. Returns and Refunds</h2>
          <p>
            - Our return policy is detailed on the website. Please ensure you review it before making a purchase.
            <br />
            - Refunds, if applicable, will be processed within the time specified in our refund policy.
          </p>

          <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
          <p>
            - Cleopatra Watches is not responsible for any damages or losses resulting from the use of our products or services beyond the extent permitted by law.
          </p>

          <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
          <p>
            - All content on this website, including text, graphics, logos, and images, is the property of Cleopatra Watches and protected by intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold">7. Changes to Terms</h2>
          <p>
            - We reserve the right to update, change, or replace any part of these Terms and Conditions at any time. Changes will be effective immediately upon posting on this website.
          </p>

          <h2 className="text-2xl font-semibold">8. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:info@cleopatrawatches.com" className="text-blue-600 hover:underline">info@cleopatrawatches.com</a>.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}