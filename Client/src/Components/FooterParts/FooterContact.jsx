import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const FooterContact = () => {
  return (
    <>
      <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Contact Us</h3>
      <ul className="space-y-2 md:space-y- text-sm md:text-base">
        <li className="flex">
          <FaMapMarkerAlt className="text-blue-300 mr-2 md:mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-300">
            <address>Lorem ipsum dolor sit amet. Temporibus nulla ad, eaque alias berunt doloribus?</address>
          </span>
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
      
      {/* Google Map - Commented out as in original code */}
      {/* <div className="mt-4 flex items-center">
        <div className="google-map">
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
    </>
  );
};

export default FooterContact;