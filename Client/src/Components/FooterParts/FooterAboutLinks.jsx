import React from 'react';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

const FooterAboutLinks = () => {

  const links = [
    { name: 'Our Story', url: `/about` },
    { name: 'Vision & Mission', url: `/about#vision`},
    { name: 'Features', url:`/about#features` },
    { name: 'FAQ', url: `/about#faq` },
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
            <HashLink
              to={link.url}
              className="group relative inline-block items-center hover:text-blue-300 transition-colors"
            >
              <span className="mr-2">›</span>
              {link.name}
              <span className="absolute bottom-0 left-0 w-[105%] h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </HashLink>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default FooterAboutLinks;
