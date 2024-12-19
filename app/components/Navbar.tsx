'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; 
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const links = [
  { name: "Home", position: "left", to: "/" },
  { name: "Learn", position: "left", to: "/learn" },
  { name: "Rescue Operations", position: "left", to: "/rescue" },
  { name: "Predictions", position: "right", to: "/predictions" },
  { name: "Reports", position: "right", to: "/reports" },
  { name: "Help Assist", position: "right", to: "https://karunavistara.streamlit.app/" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 bg-transparent md:bg-black/30 md:backdrop-blur-md text-white font-bakbak md:px-10 lg:px-20 transition-colors duration-300">
      <div className="hidden md:flex space-x-10">
        {links
          .filter((link) => link.position === "left")
          .map((link, index) => (
            <motion.div
              key={link.name}
              custom={link.position}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              transition={{ delay: (index + 1) * 0.15 }}
            >
              <Link
                href={link.to} // Use Next.js Link for redirection
                className="text-lg hover:text-[#54D59B] no-underline transition-transform duration-500 cursor-pointer hover:scale-105"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
      </div>

      {/* Center Logo */}
      <div className="flex items-center justify-center">
        <motion.img
          src="/NistAra.png"
          alt="Nistara Logo"
          className="w-20 h-auto md:w-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Right Links for larger screens */}
      <div className="hidden md:flex space-x-10">
        {links
          .filter((link) => link.position === "right")
          .map((link, index) => (
            <motion.div
              key={link.name}
              custom={link.position}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              transition={{ delay: (index + 3) * 0.15 }}
            >
              <Link
                href={link.to} // Use Next.js Link for redirection
                className="text-lg hover:text-[#54D59B] no-underline transition-transform duration-500 cursor-pointer hover:scale-105"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" /> 
          ) : (
            <Bars3Icon className="w-6 h-6 text-white" /> 
          )}
        </button>
      </div>

      {/* Mobile sliding menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-black bg-opacity-70 backdrop-blur-md text-white py-4 px-6 flex flex-col space-y-4 z-50 md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="self-end mb-6"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6 text-white" /> 
            </button>

            {/* Mobile Links */}
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.to} // Use Next.js Link for redirection
                className="text-lg hover:text-[#54D59B] no-underline transition-transform duration-500 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
