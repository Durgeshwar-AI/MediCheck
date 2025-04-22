import React from 'react';
import { Link } from 'react-router-dom';

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Privacy Policy', url: `/policy` },
    { name: 'Terms of Service', url: `/terms` },
  ];

  return (
    
    <div className="text-center">  
        <div className='bg-white w-full h-0.25 rounded-2xl m-auto'></div>

      <div className="flex flex-wrap justify-center gap-3 mt-2 md:gap-4 text-sm md:text-base">
        {links.map((link, index) => (
          <Link
            key={index} 
            to={link.url} 
            className="relative group hover:text-blue-300 transition-colors"
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
        ))}
      </div>
      <p className="mt-3 text-sm md:text-base">© {currentYear} Medicheck. All rights reserved.</p>
    </div>
  );
};

export default FooterBottom;