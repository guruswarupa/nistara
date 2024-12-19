'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LearnPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-12 bg-gradient-to-b from-gray-900 via-black to-gray-800">
            <h1 className="text-6xl font-extrabold text-white mb-16 text-center leading-tight">
                Learn About Disasters
            </h1>

            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                <DisasterSection
                    title="Floods"
                    backgroundImage="/flood.png"
                    description="Floods occur when water exceeds normal levels, often due to heavy rainfall or dam breaks. They can cause widespread damage."
                    prevention="To prevent floods, it's essential to improve drainage systems, avoid construction on floodplains, and have effective flood control infrastructure."
                    animationDirection="left"
                    link="/learn/flood"
                />

                <DisasterSection
                    title="Cyclone"
                    backgroundImage="/cyclone.png"
                    description="Cyclones are intense tropical storms that can cause severe damage through strong winds, heavy rain, and storm surges."
                    prevention="Preparation includes building cyclone-resistant shelters, improving early warning systems, and staying informed about weather conditions."
                    animationDirection="right"
                    link="/learn/cyclone"
                />

                <DisasterSection
                    title="Earthquake"
                    backgroundImage="/earthquake.png"
                    description="Earthquakes occur when tectonic plates shift, releasing energy that causes the ground to shake, leading to potential destruction."
                    prevention="To reduce risks, buildings should be designed to withstand seismic activity, and emergency preparedness plans should be in place."
                    animationDirection="bottom"
                    link="/learn/earthquake"
                />

                <DisasterSection
                    title="Tsunami"
                    backgroundImage="/tsunami.png"
                    description="Tsunamis are large ocean waves caused by underwater earthquakes, volcanic eruptions, or landslides, which can cause significant coastal damage."
                    prevention="Tsunami warnings and evacuation plans are crucial. Coastal areas should have infrastructure to withstand waves."
                    animationDirection="top"
                    link="/learn/tsunami"
                />
            </div>
        </div>
    );
};

const DisasterSection: React.FC<{
    title: string;
    backgroundImage: string;
    description: string;
    prevention: string;
    animationDirection: 'left' | 'right' | 'top' | 'bottom';
    link: string;
}> = ({ title, backgroundImage, description, prevention, animationDirection, link }) => {
    const slideDirection = {
        left: { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 } },
        right: { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 } },
        top: { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 } },
        bottom: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
    };

    return (
        <motion.div
            className="w-full max-w-sm bg-gray-900 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {/* Background Image */}
            <motion.div
                className="w-full h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            ></motion.div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
                <motion.h2
                    className="text-2xl font-extrabold text-white"
                    initial={slideDirection[animationDirection].initial}
                    animate={slideDirection[animationDirection].animate}
                    transition={{ duration: 1.5 }}
                >
                    {title}
                </motion.h2>

                <motion.p
                    className="text-lg text-white"
                    initial={slideDirection[animationDirection].initial}
                    animate={slideDirection[animationDirection].animate}
                    transition={{ duration: 1.5 }}
                >
                    {description}
                </motion.p>

                <motion.p
                    className="text-lg font-semibold text-green-500"
                    initial={slideDirection[animationDirection].initial}
                    animate={slideDirection[animationDirection].animate}
                    transition={{ duration: 1.5 }}
                >
                    {prevention}
                </motion.p>

                {/* See More Button */}
                <Link href={link}>
                    <motion.button
                        className="mt-4 py-2 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        See More
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

export default LearnPage;
