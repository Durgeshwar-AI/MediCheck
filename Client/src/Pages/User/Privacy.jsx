import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar/>
        <div className="min-h-screen bg-white text-gray-800 px-6 py-12 md:px-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Privacy Policy</h1>

        <p className="mb-6">
          This Privacy Policy outlines how <strong>CareConnect</strong> ("we", "our", "us") collects, uses, shares, and protects your personal information when you use our website and services.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Personal Information: Name, email, phone number, etc.</li>
            <li>Health Details: Data you voluntarily provide such as symptoms or medical history.</li>
            <li>Device Data: Browser type, IP address, location (if allowed).</li>
            <li>Usage Data: How you interact with our platform.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>To provide and improve our services</li>
            <li>To connect patients with nearby hospitals and doctors</li>
            <li>To send important service updates or alerts</li>
            <li>To analyze and monitor usage trends</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">3. Data Sharing & Disclosure</h2>
          <p className="text-gray-700">
            We do not sell or rent your personal information. We may share data with:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
            <li>Partner hospitals and healthcare providers (with your consent)</li>
            <li>Third-party services for technical and analytical support</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">4. Your Rights</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Access and update your data</li>
            <li>Request data deletion</li>
            <li>Withdraw consent at any time</li>
            <li>File a complaint if you feel your privacy rights are violated</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
          <p className="text-gray-700">
            We implement industry-standard security practices to protect your data, including encryption, secure servers, and access control measures.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">6. Children's Privacy</h2>
          <p className="text-gray-700">
            Our platform is not intended for individuals under 16. We do not knowingly collect data from children without parental consent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We’ll notify you of significant changes via email or platform notifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this policy, reach out to us at: <br />
            <a href="mailto:support@careconnect.com" className="text-blue-600 underline">
              support@careconnect.com
            </a>
          </p>
        </section>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
