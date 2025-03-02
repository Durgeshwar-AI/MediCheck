import React from 'react';
import FooterInfo from '../FooterParts/FooterInfo';
import FooterQuickLinks from '../FooterParts/FooterQuickLinks';
import FooterAboutLinks from '../FooterParts/FooterAboutLinks';
import FooterContact from '../FooterParts/FooterContact';
import FooterBottom from '../FooterParts/FooterBottom';
import BackToTopButton from '../FooterParts/BackToTopButton';

// Media query breakpoints
const mediaQueries = {
  sm: '640px',   // Small devices
  md: '768px',   // Medium devices 
  lg: '1024px',  // Large devices
  xl: '1280px',  // Extra large devices
};

const Footer = () => {
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
  {/* Original Circles */}
  <div
    className="animate-pulse absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 rounded-full bg-blue-600 opacity-10"
  ></div>

  <div
    className="animate-pulse absolute bottom-10 right-10 w-48 h-48 md:w-96 md:h-96 rounded-full bg-blue-400 opacity-10"
    style={{ animationDelay: '1s', animationDuration: '6s' }}
  ></div>

  <div
    className="animate-pulse absolute top-1/4 right-1/4 w-24 h-24 md:w-48 md:h-48 rounded-full bg-blue-300 opacity-10"
    style={{ animationDelay: '2s', animationDuration: '8s' }}
  ></div>

  {/* New Circles */}
  <div
    className="animate-pulse absolute top-1/3 left-1/2 w-20 h-20 md:w-40 md:h-40 rounded-full bg-blue-500 opacity-10"
    style={{ animationDelay: '1.5s', animationDuration: '7s' }}
  ></div>

  <div
    className="animate-pulse absolute bottom-5 left-5 w-16 h-16 md:w-32 md:h-32 rounded-full bg-blue-700 opacity-5"
    style={{ animationDelay: '0.5s', animationDuration: '5s' }}
  ></div>

  <div
    className="animate-pulse absolute bottom-1/2 right-1/3 w-28 h-28 md:w-56 md:h-56 rounded-full bg-blue-200 opacity-5"
    style={{ animationDelay: '2.5s', animationDuration: '9s' }}
  ></div>
</div>


      <div className="footer-container p-5 relative z-10">
        {/* Main Footer Content - Grid layout for responsive design */}
        <div className="footer-grid">
          {/* Component 1: Company Info & Social Media */}
          <div className="footer-section">
            <FooterInfo />
          </div>
{/* <div> */}
          {/* Component 2: Quick Links */}
          <div className="footer-section">
            <FooterQuickLinks />
          </div>

          {/* Component 3: About Links */}
          <div className="footer-section">
            <FooterAboutLinks />
          </div>
{/* </div> */}
          {/* Component 4: Contact Information */}
          <div className="footer-section">
            <FooterContact />
          </div>
        </div>

        {/* Component 5: Footer Bottom */}
        <FooterBottom />
      </div>

      {/* Component 6: Back to top button */}
      <BackToTopButton />
    </footer>
  );
};

export default Footer;