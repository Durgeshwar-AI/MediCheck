import React from 'react';
import { motion } from 'framer-motion';

const FooterAboutLinks = () => {
  const links = [
    { name: 'Our Story', url: '#' },
    { name: 'Vision & Mission', url: '#' },
    { name: 'Our Doctors', url: '#' },
    { name: 'Careers', url: '#' },
    { name: 'FAQ', url: '#' },
  ];

  return (
    <>
      <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">About Us</h3>
      <motion.ul className="space-y-1 md:space-y-2 text-sm md:text-base">
        {links.map((link, index) => (
          <motion.li
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <a
              href={link.url}
              className="group relative inline-block items-center hover:text-blue-300 transition-colors"
            >
              <span className="mr-2">›</span>
              {link.name}
              <span className="absolute bottom-0 left-0 w-[105%] h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default FooterAboutLinks;
