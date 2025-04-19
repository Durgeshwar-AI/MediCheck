import React, { useState } from "react";
import HeaderHome from "../../Components/HeaderHome";
// import { isLoggedIn } from "../../utils/auth";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import dashboard from "../../assets/dashboard.png";
import { useHealth } from "../../hooks/useHealth";

import { HeartPulse, Stethoscope, ShieldCheck, Activity } from "lucide-react";

// Define your features array
const features = [
  { title: "Heart Monitoring", desc: "Keep track of your heart rate and health.", icon: <HeartPulse size={32} className="text-blue-600 lg:scale-100 xl:scale-110 2xl:scale-125" /> },
  { title: "Doctor Consultation", desc: "Consult with doctors anytime, anywhere.", icon: <Stethoscope size={32} className="text-blue-600 lg:scale-100 xl:scale-110 2xl:scale-125" /> },
  { title: "Health Security", desc: "Ensure your health data is secure.", icon: <ShieldCheck size={32} className="text-blue-600 lg:scale-100 xl:scale-110 2xl:scale-125" /> },
  { title: "Fitness Tracking", desc: "Monitor your fitness activities and progress.", icon: <Activity size={32} className="text-blue-600 lg:scale-100 xl:scale-110 2xl:scale-125" /> }
];

// Feature component
const Feature = ({ title, desc, icon }) => (
  <div className="bg-white p-4 sm:p-6 xl:p-8 2xl:p-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-t-4 border-blue-500">
    {/* Icon Container */}
    <div className="w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 bg-blue-200 rounded-full flex items-center justify-center mb-4 xl:mb-6">
      {icon}
    </div>
    {/* Feature Title */}
    <h3 className="text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-blue-700">{title}</h3>
    {/* Feature Description */}
    <p className="mt-2 sm:mt-3 xl:mt-4 text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

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

// HomePage component
function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { userLoggedIn } = useHealth();

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
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 mx-auto max-w-[2400px]">
          <HeaderHome />
          <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto mt-8 sm:mt-12 xl:mt-16 bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 xl:p-12 2xl:p-16">
            <h2 className="text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-blue-700">
              Welcome back to MediCheck
            </h2>
            <p className="mt-1 sm:mt-2 xl:mt-3 text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600">
              Access your real-time health data and insights below.
            </p>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 xl:gap-8 2xl:gap-10 mt-6 sm:mt-8 xl:mt-12">
              <div className="bg-blue-50 p-4 sm:p-6 xl:p-8 2xl:p-10 rounded-lg sm:rounded-xl">
                <h3 className="font-semibold text-blue-800 text-sm sm:text-base xl:text-lg 2xl:text-xl">
                  Today&apos;s Summary
                </h3>
                {/* Placeholder for user dashboard content */}
                <div className="h-36 sm:h-48 xl:h-56 2xl:h-64 flex items-center justify-center border border-dashed border-blue-300 rounded-lg mt-2 sm:mt-3 xl:mt-4">
                  <p className="text-blue-400 text-sm sm:text-base xl:text-lg 2xl:text-xl">
                    Your health metrics will appear here
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 sm:p-6 xl:p-8 2xl:p-10 rounded-lg sm:rounded-xl">
                <h3 className="font-semibold text-blue-800 text-sm sm:text-base xl:text-lg 2xl:text-xl">Recent Activity</h3>
                {/* Placeholder for activity feed */}
                <div className="h-36 sm:h-48 xl:h-56 2xl:h-64 flex items-center justify-center border border-dashed border-blue-300 rounded-lg mt-2 sm:mt-3 xl:mt-4">
                  <p className="text-blue-400 text-sm sm:text-base xl:text-lg 2xl:text-xl">
                    Your recent activities will appear here
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <section className="py-6 sm:py-8 xl:py-12 2xl:py-16 my-4 xl:my-8 px-3 sm:px-6 xl:px-8 rounded-lg sm:rounded-xl bg-gradient-to-b from-blue-50 to-white">
              <div className="max-w-6xl xl:max-w-7xl mx-auto">
                {/* Section Heading */}
                <div className="text-center mb-8 sm:mb-16">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-blue-800">Comprehensive Health Monitoring</h2>
                  <p className="mt-2 sm:mt-4 text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600 max-w-2xl xl:max-w-4xl mx-auto leading-relaxed">
                    MediCheck combines powerful technology with an intuitive experience to give you complete control over your health.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
                  {features.map((feature, i) => (
                    <Feature key={i} title={feature.title} desc={feature.desc} icon={feature.icon} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Public homepage for non-logged in users
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar join={true} />
      {/* Hero Section with animated gradient background */}
      <section className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-12 sm:py-16 md:py-24 xl:py-32 2xl:py-40 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto text-center space-y-4 sm:space-y-6 xl:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
            Your Personal Health Monitor, Always On Guard
          </h1>
          <p className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto text-blue-100">
            MediCheck helps you monitor your vitals, connect devices, and stay
            ahead of health concerns with personalized insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-6 xl:pt-8">
          </div>
        </div>

        {/* Featured device mockup */}
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto mt-8 sm:mt-12 xl:mt-16 hidden sm:block">
          <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 xl:p-4 rounded-xl sm:rounded-2xl shadow-xl">
            <div className="h-48 md:h-64 xl:h-80 2xl:h-96 bg-gray-200 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden">
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
      <section className="py-6 sm:py-8 xl:py-10 2xl:py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 bg-white">
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-gray-400 text-xs sm:text-sm xl:text-base 2xl:text-lg">
          <p>Trusted by health professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <span className="font-bold text-gray-500">MedTech Journal</span>
            <span className="font-bold text-gray-500">HealthPlus</span>
            <span className="font-bold text-gray-500">FitMonitor</span>
            <span className="font-bold text-gray-500">VitalTrack</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-6 sm:py-8 xl:py-12 2xl:py-16 my-2 sm:my-4 xl:my-6 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 rounded-lg sm:rounded-xl bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-blue-800">Comprehensive Health Monitoring</h2>
            <p className="mt-2 sm:mt-4 xl:mt-6 text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600 max-w-2xl xl:max-w-4xl 2xl:max-w-5xl mx-auto leading-relaxed">
              MediCheck combines powerful technology with an intuitive experience to give you complete control over your health.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 xl:gap-12 2xl:gap-16">
            {features.map((feature, i) => (
              <Feature key={i} title={feature.title} desc={feature.desc} icon={feature.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with numbers */}
      <section className="py-10 sm:py-16 xl:py-20 2xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 bg-blue-50">
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 xl:mb-16">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-blue-800">
              How MediCheck Works
            </h2>
            <p className="mt-2 sm:mt-3 xl:mt-4 text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600 max-w-2xl xl:max-w-4xl mx-auto">
              Get started in just three simple steps and take control of your
              health journey.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (hidden on mobile) */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 xl:h-2 bg-blue-200 z-0"></div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 relative z-10">
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
                  <div className="w-12 h-12 sm:w-16 sm:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl font-bold mx-auto mb-3 sm:mb-4 xl:mb-6">
                    {i + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl xl:text-2xl 2xl:text-3xl font-bold text-blue-800">
                    {item.step}
                  </h3>
                  <p className="mt-2 sm:mt-3 xl:mt-4 text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with carousel */}
      <section className="py-10 sm:py-16 xl:py-20 2xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 xl:mb-16">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-blue-800">
              What Our Users Say
            </h2>
            <p className="mt-2 sm:mt-3 xl:mt-4 text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600 max-w-2xl xl:max-w-4xl mx-auto">
              Join thousands of satisfied users who have transformed their
              health monitoring experience.
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-6 sm:p-8 md:p-12 xl:p-16 2xl:p-20">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 xl:gap-12 items-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 xl:w-32 xl:h-32 2xl:w-40 2xl:h-40 rounded-full overflow-hidden">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-700 text-base sm:text-lg xl:text-xl 2xl:text-2xl italic">
                  &quot;{testimonials[activeTestimonial].feedback}&quot;
                </p>
                <div className="mt-3 sm:mt-4 xl:mt-6">
                  <p className="font-bold text-blue-700 text-base sm:text-lg xl:text-xl 2xl:text-2xl">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-gray-500 text-sm sm:text-base xl:text-lg 2xl:text-xl">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 sm:gap-4 xl:gap-6 mt-6 sm:mt-8 xl:mt-10">
              <button
                onClick={prevTestimonial}
                className="p-1 sm:p-2 xl:p-3 2xl:p-4 bg-gray-100 rounded-full hover:bg-blue-100 transition"
                aria-label="Previous testimonial"
              >
                <span className="block w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10">←</span>
              </button>
              <button
                onClick={nextTestimonial}
                className="p-1 sm:p-2 xl:p-3 2xl:p-4 bg-gray-100 rounded-full hover:bg-blue-100 transition"
                aria-label="Next testimonial"
              >
                <span className="block w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with icons */}
      <section className="py-10 sm:py-16 xl:py-20 2xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 xl:mb-16">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-blue-800">
              Why Choose MediCheck
            </h2>
            <p className="mt-2 sm:mt-3 xl:mt-4 text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600 max-w-2xl xl:max-w-4xl mx-auto">
              Our platform stands out with features designed for reliability and
              ease of use.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 xl:gap-8 2xl:gap-10">
            {[
              "Accurate and secure real-time health tracking",
              "User-friendly dashboard experience",
              "AI-powered insights for proactive health care",
              "Trusted by 10,000+ users globally",
              "Regular updates with new features",
              "Connects with most popular health devices",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3 xl:gap-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action with background */}
      <section className="py-10 sm:py-16 xl:py-20 2xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 bg-blue-600 text-white">
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto text-center space-y-4 sm:space-y-6 xl:space-y-8">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
            Ready to Take Charge of Your Health?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg xl:text-xl 2xl:text-2xl">
            Join thousands of users who are proactively managing their health
            with MediCheck.
          </p>
          <div className="pt-3 sm:pt-4 xl:pt-6">
            <Link to="/register">
              <button className="bg-white text-blue-600 px-6 sm:px-8 xl:px-10 2xl:px-12 py-3 sm:py-4 xl:py-5 2xl:py-6 rounded-lg sm:rounded-xl font-bold hover:bg-blue-50 transition shadow-lg text-base sm:text-lg xl:text-xl 2xl:text-2xl">
                Start Your Free Health Journey
              </button>
            </Link>
            <p className="mt-3 sm:mt-4 xl:mt-5 text-xs sm:text-sm xl:text-base 2xl:text-lg text-blue-200">
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