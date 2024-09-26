import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 px-6 sm:px-12 md:px-24">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-start">
        {/* Left section: Logo, Location, and Copyright */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="flex flex-col items-start">
            <img
              src="https://portal.innobrains.pk/files/system/_file64d57376183f5-site-logo.png"
              alt="Innobrains Logo"
              className="h-12 mb-4"
            />
            <p className="text-sm leading-none mb-4">Copyright © 2023. Startup Agency</p>
            {/* Location below the logo and copyright */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet,<br />
                consectetur adipiscing elit.<br />
                Pellentesque fermentum consectetur leo.
              </p>
            </div>
          </div>
        </div>

        {/* Services section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Our Services</h3>
          <ul className="space-y-1">
            <li>Web Development</li>
            <li>Mobile App Development</li>
            <li>UI/UX Design</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        {/* Company section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Services</li>
            <li>Pages</li>
            <li>Portfolio</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom section: Social Icons and Links */}
      <div className="text-center md:text-left mt-6">
        <div className="flex justify-center md:justify-start mb-4 space-x-4">
          <a href="#" aria-label="WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} className="text-xl text-[#103153]" />
          </a>
          <a href="#" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} className="text-xl text-[#103153]" />
          </a>
          <a href="#" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="text-xl text-[#103153]" />
          </a>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
          <div className="mb-4 md:mb-0">
            © 2024 Innobrains Technologies. All rights reserved.
          </div>
          <div className="space-x-3">
            <a href="#" className="text-gray-800 hover:underline">Privacy Policy</a>
            <a href="#" className="text-gray-800 hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
