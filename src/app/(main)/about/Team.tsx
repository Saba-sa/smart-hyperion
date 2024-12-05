"use client";

import { TEAM_DATA } from "@/data/team";
import { motion } from "framer-motion";

const lineVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const containerVariants = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const imageVariants = {
  hidden: { scale: 1 },
  visible: {
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const Team = () => {
  return (
    <div className="flex py-40 md:py-60 flex-col w-full min-h-screen">
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        <h1
          className={`text-5xl md:w-2/3 md:text-[5rem] lg:text-[8rem] leading-none tracking-[-0.010em] text-center uppercase font-anton`}
        >
          meet our team
        </h1>
        <p className="px-4 md:px-0 md:w-[40%] text-center text-base md:text-2xl lg:text-[1.8rem]">
          The passionate minds behind unique, effective designs, committed to
          bringing your vision to life.
        </p>
      </div>
      <div className="px-10 py-10 hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {TEAM_DATA.map((member) => (
          <motion.div
            key={member.name}
            className="relative h-[600px] rounded-lg overflow-hidden"
            initial="hidden"
            whileHover="visible"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${member.image})`,
              }}
              variants={imageVariants}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray/50 to-transparent"
              variants={overlayVariants}
            />
            <motion.div
              className="absolute overflow-hidden flex items-center justify-center flex-col inset-x-0 bottom-0 p-6"
              variants={containerVariants}
            >
              <div className="overflow-hidden">
                <motion.h2
                  className={`text-5xl uppercase text-white font-anton`}
                  variants={lineVariants}
                >
                  {member.name}
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  className="text-xl text-blue-200"
                  variants={lineVariants}
                >
                  {member.position}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="px-10 py-10 md:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {TEAM_DATA.map((member) => (
          <motion.div
            key={member.name}
            className="relative h-[600px] rounded-lg overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${member.image})`,
              }}
            />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray/50 to-transparent" />
            <motion.div className="absolute overflow-hidden flex items-center justify-center flex-col inset-x-0 bottom-0 p-6">
              <div className="overflow-hidden">
                <motion.h2
                  className={`md:text-5xl text-3xl uppercase text-white font-anton`}
                >
                  {member.name}
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.p className="md:text-xl text-lg text-blue-200">
                  {member.position}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Team;
