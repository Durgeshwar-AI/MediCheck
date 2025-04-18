import React, { useState } from "react";
import HeaderHome from "../../Components/HeaderHome";
import { isLoggedIn } from "../../utils/auth";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import dashboard from "../../assets/dashboard.png";
import { useHealth } from "../../hooks/useHealth";

// Testimonial data with added profile images and roles
const testimonials = [
  {
    name: "Alice Johnson",
    role: "Fitness Coach",
    feedback:
      "MediCheck helped me track my health like never before! The insights have been invaluable for my training.",
    image: "/api/placeholder/64/64",
  },
  {
    name: "Bob Martinez",
    role: "Marathon Runner",
    feedback:
      "Simple, elegant, and potentially life-saving features. The heart rate alerts caught an irregularity I wasn't aware of.",
    image: "/api/placeholder/64/64",
  },
  {
    name: "Carla Wong",
    role: "Tech Professional",
    feedback:
      "Love how seamlessly it connects with my watch! The dashboard gives me exactly what I need at a glance.",
    image: "/api/placeholder/64/64",
  },
];

// Feature list with icons (we would use actual icons in a real implementation)
const features = [
  {
    title: "Device Connectivity",
    icon: "connect",
    desc: "Connect with your smartwatch or health device to pull real-time vitals securely.",
  },
  {
    title: "Health Insights",
    icon: "chart",
    desc: "AI-based trends and analytics tailored to your health history and goals.",
  },
  {
    title: "24/7 Support",
    icon: "support",
    desc: "Need help? Our health support team is always ready to assist you.",
  },
  {
    title: "Data Privacy",
    icon: "shield",
    desc: "Your health data stays private with military-grade encryption and security.",
  },
];

function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const {userLoggedIn} = useHealth()

  // Handle testimonial navigation
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Render user dashboard if logged in
  if (userLoggedIn) {
    return (
      <>
      <Navbar/>
      <div className="px-6">
        <HeaderHome />
        <div className="max-w-6xl mx-auto mt-12 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-blue-700">
            Welcome back to MediCheck
          </h2>
          <p className="mt-2 text-gray-600">
            Access your real-time health data and insights below.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold text-blue-800">
                Today&apos;s Summary
              </h3>
              {/* Placeholder for user dashboard content */}
              <div className="h-48 flex items-center justify-center border border-dashed border-blue-300 rounded-lg mt-3">
                <p className="text-blue-400">
                  Your health metrics will appear here
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold text-blue-800">Recent Activity</h3>
              {/* Placeholder for activity feed */}
              <div className="h-48 flex items-center justify-center border border-dashed border-blue-300 rounded-lg mt-3">
                <p className="text-blue-400">
                  Your recent activities will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Public homepage for non-logged in users
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar join={true} />
      {/* Hero Section with animated gradient background */}
      <section className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Personal Health Monitor, Always On Guard
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            MediCheck helps you monitor your vitals, connect devices, and stay
            ahead of health concerns with personalized insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          </div>
        </div>

        {/* Featured device mockup */}
        <div className="max-w-4xl mx-auto mt-12 hidden md:block">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl shadow-xl">
            <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={dashboard}
                alt="App dashboard preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof section */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
          <p>Trusted by health professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-8">
            <span className="font-bold text-gray-500">MedTech Journal</span>
            <span className="font-bold text-gray-500">HealthPlus</span>
            <span className="font-bold text-gray-500">FitMonitor</span>
            <span className="font-bold text-gray-500">VitalTrack</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800">
              Comprehensive Health Monitoring
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              MediCheck combines powerful technology with an intuitive
              experience to give you complete control over your health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {/* Placeholder for icon */}
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-blue-700">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with numbers */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800">
              How MediCheck Works
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Get started in just three simple steps and take control of your
              health journey.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (hidden on mobile) */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-blue-200 z-0"></div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  step: "Create Account",
                  desc: "Sign up for free and set up your personal health profile in minutes.",
                },
                {
                  step: "Connect Device",
                  desc: "Pair your smartwatch or health device with a simple Bluetooth connection.",
                },
                {
                  step: "Get Insights",
                  desc: "Start receiving personalized health insights and recommendations.",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">
                    {item.step}
                  </h3>
                  <p className="mt-3 text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with carousel */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800">
              What Our Users Say
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their
              health monitoring experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="text-gray-700 text-lg italic">
                  &quot;{testimonials[activeTestimonial].feedback}&quot;
                </p>
                <div className="mt-4">
                  <p className="font-bold text-blue-700">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-gray-500">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition"
              >
                <span className="block w-6 h-6">←</span>
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition"
              >
                <span className="block w-6 h-6">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with icons */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800">
              Why Choose MediCheck
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Our platform stands out with features designed for reliability and
              ease of use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Accurate and secure real-time health tracking",
              "User-friendly dashboard experience",
              "AI-powered insights for proactive health care",
              "Trusted by 10,000+ users globally",
              "Regular updates with new features",
              "Connects with most popular health devices",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action with background */}
      <section className="py-16 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to Take Charge of Your Health?
          </h2>
          <p className="text-blue-100 text-lg">
            Join thousands of users who are proactively managing their health
            with MediCheck.
          </p>
          <div className="pt-4">
            <Link to="/register">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg text-lg">
                Start Your Free Health Journey
              </button>
            </Link>
            <p className="mt-4 text-sm text-blue-200">
              No credit card required. Free plan available.
            </p>
          </div>
        </div>
      </section>

      {/* Footer with quick links */}
      <Footer />
    </div>
  );
}

export default HomePage;
