import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

// Media query breakpoints
const mediaQueries = {
    sm: '640px',   // Small devices
    md: '768px',   // Medium devices
    lg: '1024px',  // Large devices
    xl: '1280px',  // Extra large devices
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-900 text-white relative overflow-hidden">

            {/* CSS with Media Queries */}
            <style jsx>{`
        /* Base styles (mobile first) */
        .footer-container {
          padding: 2.5rem 1rem;
        }
        .footer-section {
          margin-bottom: 2rem;
          width: 100%;
        }
        .footer-bottom {
          flex-direction: column;
          text-align: center;
        }
        .nav-link {
          position: relative;
          display: inline-block;
        }
        .google-map {
          height: 150px;
          width: 100%;
          border-radius: 0.375rem;
        }

        /* Small devices and up */
        @media (min-width: ${mediaQueries.sm}) {
          .footer-container {
            padding: 3rem 1.5rem;
          }
          .footer-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          .google-map {
            height: 180px;
          }
        }

        /* Medium devices and up */
        @media (min-width: ${mediaQueries.md}) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 2fr;
          }
          .google-map {
            height: 200px;
          }
        }

        /* Large devices and up */
        @media (min-width: ${mediaQueries.lg}) {
          .footer-container {
            padding: 3.5rem 2rem;
          }
          .footer-grid {
            gap: 3rem;
          }
        }

        /* Extra large devices */
        @media (min-width: ${mediaQueries.xl}) {
          .footer-container {
            padding: 4rem 2.5rem;
            max-width: 1280px;
            margin: 0 auto;
          }
        }
      `}</style>

            {/* Decorative Animated Ellipses - Responsive sizes */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
                <div className="animate-pulse absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 rounded-full bg-blue-600 opacity-10"></div>
                <div className="animate-pulse absolute bottom-10 right-10 w-48 h-48 md:w-96 md:h-96 rounded-full bg-blue-400 opacity-5" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
                <div className="animate-pulse absolute top-1/4 right-1/4 w-24 h-24 md:w-48 md:h-48 rounded-full bg-blue-300 opacity-5" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
            </div>

            <div className="footer-container relative z-10">
                {/* Main Footer Content - Grid layout for responsive design */}
                <div className="footer-grid">
                    {/* Logo and Description */}
                    <div className="footer-section">
                        <div className="flex items-center mb-4">
                            <img src="/assets/images/footer-logo.png" alt="Medicheck Logo" className="h-8 md:h-10 mr-2" />
                            <span className="text-xl md:text-3xl font-bold">Medicheck</span>
                        </div>
                        <p className="text-gray-300 mb-4 text-sm md:text-base">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit perspiciatis voluptatum accusamus architecto. Voluptate fugit accusantium ipsam maiores, quo nam pariatur reprehenderit qui deserunt nesciunt exercitationem, similique, error inventore modi?
                        </p>
                        <div className="flex space-x-3 md:space-x-4">
                            <a href="#" className="bg-blue-800 hover:bg-blue-700 transition-colors p-2 rounded-full">
                                <FaTwitter className="text-sm md:text-lg" />
                            </a>
                            <a href="#" className="bg-blue-800 hover:bg-blue-700 transition-colors p-2 rounded-full">
                                <FaFacebookF className="text-sm md:text-lg" />
                            </a>
                            <a href="#" className="bg-blue-800 hover:bg-blue-700 transition-colors p-2 rounded-full">
                                <FaInstagram className="text-sm md:text-lg" />
                            </a>
                            <a href="#" className="bg-blue-800 hover:bg-blue-700 transition-colors p-2 rounded-full">
                                <FaLinkedinIn className="text-sm md:text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 border-b border-blue-800 pb-2">Quick Links</h3>
                        <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Home
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Medical Care
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Health Services
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Diagnostic Tests
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Laboratory
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* About Links */}
                    <div className="footer-section">
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 border-b border-blue-800 pb-2">About Us</h3>
                        <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Our Story
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Vision & Mission
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Our Doctors
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>Careers
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group hover:text-blue-300 transition-colors flex items-center nav-link">
                                    <span className="mr-2">›</span>FAQ
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-section">
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 border-b border-blue-800 pb-2">Contact Us</h3>
                        <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                            <li className="flex">
                                <FaMapMarkerAlt className="text-blue-300 mr-2 md:mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-300"><address>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nemo autem officiis nulla ad, eaque alias blanditiis quos deserunt doloribus?</address></span>
                            </li>
                            <li className="flex">
                                <FaPhoneAlt className="text-blue-300 mr-2 md:mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-300"> +91 (123) 456-7890</span>
                            </li>
                            <li className="flex">
                                <FaEnvelope className="text-blue-300 mr-2 md:mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-300">contact@medicheck.com</span>
                            </li>
                        </ul>

                        {/* Google Map */}
                        {/* <div className="mt-4 flex items-center">
              <div className="google-map ">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.8895164076986!2d-97.74399368493247!3d30.267903814362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b50a22f2576f%3A0xfded6e1eff5f6634!2sDowntown%20Austin%2C%20Austin%2C%20TX!5e0!3m2!1sen!2sus!4v1646328234283!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Medicheck Location"
                  className="rounded justify-center"
                ></iframe>
              </div>
            </div> */}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-blue-800 text-center">
                    <div className="footer-bottom flex flex-col items-center">

                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm md:text-base">
                            <a href="#" className="group hover:text-blue-300  transition-colors nav-link">
                                Privacy Policy
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            </a>
                            <a href="#" className="group hover:text-blue-300 transition-colors nav-link">
                                Terms of Service
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            </a>
                            <a href="#" className="group hover:text-blue-300 transition-colors nav-link">
                                Sitemap
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            </a>
                            <a href="#" className="group hover:text-blue-300 transition-colors nav-link">
                                Cookies
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            </a>
                            <hr />
                            <br />
                            <p className="mb-3 md:mb-0 text-sm md:text-base">© {currentYear} Medicheck. All rights reserved.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Back to top button - Smaller on mobile */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2 md:p-3 rounded-full shadow-lg fixed bottom-4 right-4 md:bottom-6 md:right-6 z-20"
                aria-label="Back to top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </footer>
    );
};

export default Footer;