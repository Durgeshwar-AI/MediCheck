import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const FooterInfo = () => {
  return (
    <>

      <div className="flex iflex-col gap-8 md:gap-4 items-center justify-center md:justify-start cursor-pointer">
      <Link to="/home" className="flex items-center cursor-pointer">
        
        <img src={logo} alt="Medicheck Logo" className="h-10 md:h-12 mr-2 w-auto invert" />
        <span className="text-xl md:text-3xl font-bold italic [text-shadow:_0_4px_5px_rgb(205_194_194/_0.5)]">Medicheck</span>
      </Link>
      </div>
      <div className='bg-white w-full md:max-w-2xs h-0.5 rounded-2xl m-auto'></div>
      {/* <p className="text-gray-300 mb-4 text-sm md:text-base">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit perspiciatis voluptatum accusamus architecto. Voluptate fugit accusantium ipsam maiores, quo nam pariatur reprehenderit qui deserunt nesciunt exercitationem, similique, error inventore modi?
      </p> */}
       <h1 className="font-bold md:text-start md:ml-5 text-center">FOLLOW US</h1>
      <div className="flex gap-6 md:gap-4 md:justify-start justify-center mt-4 md:mt-4 md:ml-2">
      <a
            href="https://twitter.com/#"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gray-400 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:border-blue-500 hover:text-blue-500"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/#"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gray-400 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:border-pink-500 hover:text-pink-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/#"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gray-400 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:border-blue-700 hover:text-blue-700 hover:shadow"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.facebook.com/#"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gray-400 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            <FaFacebookF />
          </a>
      </div>
    </>
  );
};

export default FooterInfo;