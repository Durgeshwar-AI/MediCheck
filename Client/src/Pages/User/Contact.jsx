import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Mail, Phone, MapPin, HelpCircle, User, AtSign, MessageSquare, Send } from 'lucide-react';
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

// ==========================================
// CONTACT US PAGE
// ==========================================
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would send the form data to a backend service
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
            Have questions or need assistance? We&apos;re here to help you with anything related to your health monitoring journey.
          </p>
        </div>
      </div>

      <div className="w-fit md:w-full mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6 md:space-y-10">
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-blue-700 mb-5">Get in Touch</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email Us</h3>
                    <p className="text-blue-600">support@medicheck.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Call Us</h3>
                    <p className="text-blue-600">+91 1800-123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Visit Us</h3>
                    <address className="not-italic text-gray-600">
                      123 Health Avenue<br />
                      Suite 200<br />
                      Bangalore, Karnataka 560001
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-blue-700 mb-4 md:text-start text-center">Connect With Us</h2>

              <div className="flex gap-4 md:justify-start justify-center mt-2">
                <a
                  href="https://twitter.com/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors border-pink-500 text-pink-500 hover:bg-pink-50"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors border-blue-700 text-blue-700 hover:bg-blue-50"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.facebook.com/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Send Us a Message</h2>

              {formSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <HelpCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Thank you for your message!</p>
                    <p>We&apos;ll get back to you as soon as possible.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div className="relative">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <AtSign size={18} />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <MessageSquare size={18} />
                      </span>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Account Issue">Account Issue</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md flex items-center"
                    >
                      <Send size={18} className="mr-2" />
                      <span className="hidden md:block">Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6 md:mb-8">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {[
              {
                q: "How do I connect my smartwatch to MediCheck?",
                a: "Go to Settings > Devices in your MediCheck app and follow the on-screen instructions to pair your device via Bluetooth."
              },
              {
                q: "Is my health data secure with MediCheck?",
                a: "Absolutely. We use end-to-end encryption and follow HIPAA guidelines to ensure your personal health information stays private and secure."
              },
              {
                q: "Can I export my health data from MediCheck?",
                a: "Yes, you can export your data in CSV or PDF format from the Account > Data Export section of your profile."
              },
              {
                q: "How often does MediCheck sync with my device?",
                a: "MediCheck syncs automatically every 15 minutes when connected to your device. You can also trigger a manual sync anytime."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 md:p-6 rounded-xl shadow-md">
                <div className="flex items-start">
                  <HelpCircle className="flex-shrink-0 mt-1 mr-3 text-blue-500" size={20} />
                  <div>
                    <h3 className="font-bold text-blue-700 mb-2">{item.q}</h3>
                    <p className="text-gray-600">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;