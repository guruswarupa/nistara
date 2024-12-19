// WhatWeDo.js
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Define prop types for the WhatWeDoItem component
interface WhatWeDoItemProps {
  number: string;
  text: string;
}

const WhatWeDoItem = ({ number, text }: WhatWeDoItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50% 0px -50% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0.5, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.6 }}
      className="flex items-center text-center md:text-left"
    >
      <div
        className={`text-6xl font-bold ${
          isInView ? "text-blue-400" : "text-white"
        } mr-8`}
      >
        {number}
      </div>
      <p className="text-xl text-gray-300 leading-relaxed text-justify">
        {text}
      </p>
    </motion.div>
  );
};

const WhatWeDo = () => {
  const items = [
    {
      number: "1",
      text: "We predict and prevent natural disasters by analyzing animal behavior patterns, using advanced AI models, and collecting real-time data from IoT sensors to ensure early warnings and mitigate risks to human lives and property.",
    },
    {
      number: "2",
      text: "Our AI and machine learning models continuously learn from historical disaster data, animal behavior, and environmental conditions to enhance the accuracy of predictions, ensuring timely action to minimize damage during a disaster event.",
    },
    {
      number: "3",
      text: "We collaborate with local wildlife organizations, researchers, and IoT sensor networks to collect real-time data, providing a comprehensive view of disaster-prone areas and offering actionable insights for disaster preparedness and prevention.",
    },
    {
      number: "4",
      text: "We provide real-time alerts to affected communities using data from IoT sensors, animal behavior analysis, and prediction models, enabling timely evacuations and disaster response efforts to save lives and reduce property damage.",
    },
    {
      number: "5",
      text: "Our educational initiatives raise awareness about disaster prevention, using advanced technology and behavioral analysis to train and inform the public about disaster preparedness, response techniques, and sustainable environmental practices.",
    },
  ];

  return (
    <section id="whatwedo" className="bg-[#081A2D] py-16 px-8 text-white">
      <h2 className="text-5xl font-bold text-center mb-12">What We Do</h2>
      <div className="flex flex-col gap-10 max-w-2xl mx-auto text-justify">
        {items.map((item, index) => (
          <WhatWeDoItem key={index} number={item.number} text={item.text} />
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
