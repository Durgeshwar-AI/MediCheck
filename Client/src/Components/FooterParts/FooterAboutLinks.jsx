import React from 'react';

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
      <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="group hover:text-blue-300 transition-colors flex items-center nav-link">
              <span className="mr-2">›</span>{link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FooterAboutLinks;