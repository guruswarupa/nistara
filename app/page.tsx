'use client';
import { motion } from 'framer-motion';
import React from 'react';
import Hero from './components/hero';
import WhatWeDo from './components/whatWeDo';
import ContactUs from './components/contactUs';
const HomePage: React.FC = () => {
  return (
  <>
  <Hero/>
  <WhatWeDo/>
  <ContactUs/>
  </>
  );
};

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <motion.div
    className="bg-gray-700 p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
  >
    <h3 className="text-2xl mb-4">{title}</h3>
    <p>{description}</p>
  </motion.div>
);

export default HomePage;
