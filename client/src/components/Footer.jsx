import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiInstagram, SiFacebook, SiTwitter, SiYoutube } from 'react-icons/si';

const Footer = () => {
  const [yearNow, setYearNow] = useState('');

  useEffect(() => {
    setYearNow(new Date().getFullYear().toString());
  }, []);

  // Add your own links and data here
  const companyLinks = [{ name: 'FAQ', link: '/faq' }, /* other company links */];
  const shopLinks = [{ name: 'Catalog', link: '/catalog' }, /* other shop links */];
  const supportLinks = [{ name: 'Contact Us', link: '/contact-us' }, /* other support links */];

  return (
    <footer className="relative bottom-0 w-full bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-16 lg:text-left text-start">
        
        {/* Logo and Social Media */}
        <div className="lg:flex justify-center block flex-col items-start">
          <Link to="/">
            <h1 className="text-3xl mb-4"><strong>Rent</strong>Car</h1>
          </Link>
          <div className="flex items-center mt-4">
            <SiFacebook className="m-2 cursor-pointer" />
            <SiTwitter className="m-2 cursor-pointer" />
            <SiInstagram className="m-2 cursor-pointer" />
            <SiYoutube className="m-2 cursor-pointer" />
          </div>
        </div>

        {/* Company Links */}
        <ul>
          <h1 className="mb-1 font-semibold">Company</h1>
          {companyLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-gray-300 hover:text-gray-500 text-sm cursor-pointer" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Shop Links */}
        <ul>
          <h1 className="mb-1 font-semibold">Shop</h1>
          {shopLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-gray-300 hover:text-gray-500 text-sm cursor-pointer" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Support Links */}
        <ul>
          <h1 className="mb-1 font-semibold">Support</h1>
          {supportLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-gray-300 hover:text-gray-500 text-sm cursor-pointer" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-gray-300 text-sm py-4">
        <span>© {yearNow} RentCar. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
