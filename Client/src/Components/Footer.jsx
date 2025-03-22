import React from 'react';
import FooterInfo from './FooterParts/FooterInfo';
import FooterQuickLinks from './FooterParts/FooterQuickLinks';
import FooterAboutLinks from './FooterParts/FooterAboutLinks';
import FooterContact from './FooterParts/FooterContact';
import FooterBottom from './FooterParts/FooterBottom';
import BackToTopButton from './FooterParts/BackToTopButton';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white relative overflow-hidden">
      {/* Decorative Animated Ellipses */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Original Circles */}
        <div
          className="animate-pulse absolute top-5 left-5 md:top-5 md:left-[220px] w-15 h-15 md:w-34 md:h-34 rounded-full bg-blue-600 opacity-100"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        ></div>
        <div
          className="animate-pulse absolute bottom-10 right-10 w-40 h-40 md:w-90 md:h-90 rounded-full bg-blue-400 opacity-10"
          style={{ animationDelay: '1s', animationDuration: '6s' }}
        ></div>
        <div
          className="animate-pulse absolute top-[136px] right-[380px] w-24 h-24 md:w-35 md:h-35 rounded-full bg-blue-300 opacity-10"
          style={{ animationDelay: '2s', animationDuration: '8s' }}
        ></div>
        <div
          className="animate-pulse absolute top-[220px] right-[200px] w-55 h-55 rounded-full bg-blue-200 opacity-0 block md:hidden"
          style={{ animationDelay: '2s', animationDuration: '9s' }}
        ></div>
        {/* New Circles */}
        <div
          className="animate-pulse absolute top-5 right-10 md:top-[12.5%] md:left-[40%] w-17 h-17 md:w-40 md:h-40 rounded-full bg-blue-500 opacity-10"
          style={{ animationDelay: '3.5s', animationDuration: '7s' }}
        ></div>
        <div
          className="animate-pulse absolute bottom-2 left-5 w-15 h-15 md:w-32 md:h-32 rounded-full bg-blue-700 opacity-5"
          style={{ animationDelay: '0.5s', animationDuration: '5s' }}
        ></div>
        <div
          className="animate-pulse absolute bottom-2.5 right-1/2 w-28 h-28 md:w-56 md:h-56 rounded-full bg-blue-200 opacity-5"
          style={{ animationDelay: '10s', animationDuration: '9s' }}
        ></div>
      </div>

      <div className="relative z-10 py-10 px-4 sm:py-12 sm:px-6 lg:py-14 lg:px-8 xl:py-16 xl:px-10 xl:max-w-[1280px] xl:mx-auto">
        {/* Main Footer Content – Grid Layout */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[2fr_1fr_1fr_2fr]">
          {/* Company Info & Social Media */}
          <div className="col-span-2 md:col-span-1">
            <FooterInfo />
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <FooterQuickLinks />
          </div>

          {/* About Links */}
          <div className="col-span-1">
            <FooterAboutLinks />
          </div>

          {/* Contact Information */}
          <div className="col-span-2 md:col-span-1">
            <FooterContact />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col justify-center text-center  md:text-left">
          <FooterBottom />
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </footer>
  );
};

export default Footer;
