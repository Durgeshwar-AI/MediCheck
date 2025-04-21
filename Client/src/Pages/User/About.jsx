import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Calendar, Star, FileText, Clock, AlertCircle } from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("patients");

  const faqs = [
    {
      question: "How do I connect my smartwatch to MediCheck?",
      answer:
        "Go to Settings > Devices in your MediCheck app and follow the on-screen instructions to pair your device via Bluetooth.",
    },
    {
      question: "Is my health data secure with MediCheck?",
      answer:
        "Absolutely. We use end-to-end encryption and follow HIPAA guidelines to ensure your personal health information stays private and secure.",
    },
    // {
    //   question: "Can I export my health data from MediCheck?",
    //   answer: "Yes, you can export your data in CSV or PDF format from the Account > Data Export section of your profile."
    // },
    {
      question: "How often does MediCheck sync with my device?",
      answer: "MediCheck syncs automatically every 15 minutes when connected to your device. You can also trigger a manual sync anytime."
    },
    {
      question: "Can I access my previous medical records?",
      answer:
        "Yes, CareConnect allows you to securely store and access your medical history, prescriptions, test results, and treatment plans all in one place. You control who has access to this information.",
    },
  ];

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Nearby Hospitals",
      description: "Find healthcare facilities near you with real-time availability information."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Appointment Booking",
      description: "Schedule visits with specialists and receive instant confirmations."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Ratings & Reviews",
      description: "Read authentic feedback from other patients to make informed decisions."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Health Records",
      description: "Keep all your medical documents organized and accessible in one secure place."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Doctor Availability",
      description: "See real-time schedules and find appointments that fit your timetable."
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "24/7 Emergency",
      description: "Quick access to emergency services and guidance when you need it most."
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "CareConnect made finding a specialist and booking appointments so much easier. I love having all my medical records in one place!",
      image: "/api/placeholder/64/64"
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "As a healthcare provider, CareConnect has streamlined patient management and reduced no-shows significantly.",
      image: "/api/placeholder/64/64"
    },
    {
      name: "Emma Rodriguez",
      role: "Parent",
      content: "Managing my family's healthcare needs has never been simpler. The emergency locator feature gave us peace of mind during our vacation.",
      image: "/api/placeholder/64/64"
    }
  ];

  const toggleIndex = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1 space-y-6">
              <div className="inline-block bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-medium">
                Healthcare Simplified
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-800">
                Connecting You to Better Healthcare
              </h1>
              <p className="text-lg text-gray-700">
                At <span className="font-semibold text-blue-700">CareConnect</span>, we believe healthcare should be
                simple, accessible, and efficient. Our platform helps patients
                connect with hospitals in real-time, anytime.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-lg hover:shadow-xl">
                  Find Hospitals
                </button>
                <button className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg border border-blue-200 transition">
                  Book Appointment
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-3xl transform rotate-3"></div>
                <div className="bg-gray-200 h-64 md:h-80 rounded-3xl overflow-hidden relative shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Medical Professional Image
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* What We Do Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col-reverse md:flex-row items-center gap-12"
          >
            <div className="w-full md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-3xl transform -rotate-3"></div>
                <div className="bg-gray-200 h-64 md:h-80 rounded-3xl overflow-hidden relative shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Doctors Collaboration Image
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-block bg-green-100 text-green-800 rounded-full px-4 py-1 text-sm font-medium">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Streamlining Your Healthcare Journey
              </h2>
              <p className="text-lg text-gray-700">
                We simplify the healthcare journey — from finding hospitals
                and specialists to booking appointments and accessing medical
                records. Everything you need, at your fingertips.
              </p>
              <ul className="space-y-2">
                {["Fast access to medical care", "Transparent healthcare information", "Seamless appointment scheduling"].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Features Tab Section */}
          <section className="text-center space-y-12">
            <div className="space-y-4">
              <div className="inline-block bg-purple-100 text-purple-800 rounded-full px-4 py-1 text-sm font-medium">
                Features
              </div>
              <h2 className="text-3xl font-bold text-gray-800">What CareConnect Offers</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Discover how our platform makes healthcare more accessible, efficient, and personalized for everyone.
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                <button
                  onClick={() => setActiveTab("patients")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "patients"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  For Patients
                </button>
                <button
                  onClick={() => setActiveTab("providers")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "providers"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  For Healthcare Providers
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 mt-8"
              id="features"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-left border border-gray-100 hover:border-blue-300 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Vision Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-12"
            id="vision"
          >
            <div className="flex-1 space-y-6">
              <div className="inline-block bg-amber-100 text-amber-800 rounded-full px-4 py-1 text-sm font-medium">
                Looking Forward
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              <p className="text-lg text-gray-700">
                We aim to build a world where high-quality medical care is a
                click away. CareConnect empowers patients and healthcare
                providers with seamless, tech-driven experiences.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="text-2xl font-bold text-blue-600">90%</div>
                  <div className="text-gray-600">Faster appointment booking</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-gray-600">Access to healthcare info</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Healthcare partners</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="text-2xl font-bold text-blue-600">100K+</div>
                  <div className="text-gray-600">Monthly active users</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-200 rounded-3xl transform rotate-2"></div>
                <div className="bg-gray-200 h-64 md:h-80 rounded-3xl overflow-hidden relative shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Future Healthcare Image
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Testimonials */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-block bg-teal-100 text-teal-800 rounded-full px-4 py-1 text-sm font-medium">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold text-gray-800">What People Say About Us</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Hear from patients and healthcare providers who use CareConnect.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">{testimonial.content}</p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-12" id="faq">
            <div className="text-center space-y-4">
              <div className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-4 py-1 text-sm font-medium">
                Got Questions?
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Find answers to common questions about using CareConnect.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100"
                  >
                    <button
                      onClick={() => toggleIndex(index)}
                      className="w-full flex justify-between items-center p-4 font-medium text-blue-700 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset"
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span>{faq.question}</span>
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-blue-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-500" />
                      )}
                    </button>
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={false}
                      animate={{
                        height: openIndex === index ? "auto" : 0,
                        opacity: openIndex === index ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-blue-50 text-gray-700 border-t border-blue-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CTA */}
            {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to transform your healthcare experience?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of patients and healthcare providers who are already benefiting from CareConnect.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg transition shadow-md">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-transparent hover:bg-blue-700 text-white font-medium rounded-lg border border-white transition">
                  Learn More
                </button>
              </div>
            </div> */}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;