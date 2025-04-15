import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';

const TermsOfService = () => {
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
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Terms of Service</h1>

        <p className="mb-6">
          These Terms of Service ("Terms") govern your use of <strong>CareConnect</strong> ("we", "us", or "our") and its services. By accessing or using the platform, you agree to comply with these Terms.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">1. Use of Services</h2>
          <p className="text-gray-700">
            You must be at least 16 years old to use our services. You agree to provide accurate information and use the platform only for lawful purposes, such as connecting with hospitals or managing your health records.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">2. Account Responsibilities</h2>
          <p className="text-gray-700">
            You are responsible for maintaining the confidentiality of your account credentials and all activities under your account. Notify us immediately if you suspect unauthorized use.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">3. Prohibited Activities</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Impersonating others or providing false information</li>
            <li>Hacking or interfering with our systems</li>
            <li>Spamming, data harvesting, or unauthorized advertising</li>
            <li>Attempting to reverse engineer the platform</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">4. Service Availability</h2>
          <p className="text-gray-700">
            We strive to keep our services running smoothly but do not guarantee continuous availability. We may suspend or modify the platform at any time for maintenance or other reasons.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p className="text-gray-700">
            We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. Hospital-related data and interactions are your responsibility and subject to each provider's own terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">6. Third-Party Links</h2>
          <p className="text-gray-700">
            Our platform may contain links to external hospital websites or services. We are not responsible for their content or policies. Use them at your own risk.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate your access to our platform if you violate these Terms or act in a way that may harm other users or our services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms periodically. We'll notify you of any major changes via email or platform notification. Continued use of our services indicates your acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, feel free to contact us at:<br />
            <a href="mailto:legal@careconnect.com" className="text-blue-600 underline">
              legal@careconnect.com
            </a>
          </p>
        </section>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default TermsOfService;
