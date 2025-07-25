import React from 'react';

const Footer = ({ showGeneratedFiles }) => {
  return (
    <footer className="bg-[#09090B] text-white py-8">
      <div className="container mx-auto px-14">
        {!showGeneratedFiles && (
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-left mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Startsky</h3>
              <p className="text-sm">Your ultimate solution for file management.</p>
            </div>
            <div className="w-full md:w-1/3 text-left mb-4 md:mb-0">
              <h4 className="text-md font-semibold mb-2">Quick Links</h4>
              <ul>
                <li><a href="#" className="text-sm hover:text-gray-400">Home</a></li>
                <li><a href="#" className="text-sm hover:text-gray-400">Features</a></li>
                <li><a href="#" className="text-sm hover:text-gray-400">Pricing</a></li>
                <li><a href="#" className="text-sm hover:text-gray-400">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-left">
              <h4 className="text-md font-semibold mb-2">Follow Us</h4>
              <div className="flex justify-start space-x-4">
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        )}
        <div className={`border-t border-gray-700 mt-8 pt-8 text-left text-sm ${showGeneratedFiles ? 'text-center' : ''}`}>
          <p>&copy; 2025 Startsky. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;