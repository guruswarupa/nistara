"use client";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Hero() {
  return (
    <div id="home" className="flex items-center justify-center min-h-screen p-8 relative bg-[#0D253F] text-white">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left side: Text content */}
        <div className="text-center md:text-left space-y-6 flex-1">
          <h1 className="text-6xl leading-tight font-extrabold text-white">
            Predict and Prevent
            <br />
            <span
              className="italic text-blue-400 font-semibold"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Disasters
            </span>{" "}
            with
            <br />
            <span className="text-7xl font-extrabold text-white">
              Nistara
            </span>
          </h1>
          <p className="text-lg text-gray-300 mt-6 font-sans">
            Nistara uses animal behavior patterns, IoT sensors, and AI models
            to predict and prevent disasters like earthquakes, tsunamis, and
            storms, helping communities stay safe.
          </p>
          {/* Call-to-action button */}
          <div className="mt-8">
            <button
              className="bg-blue-400 text-black px-8 py-4 italic font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <a href="learn">Learn more</a>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
