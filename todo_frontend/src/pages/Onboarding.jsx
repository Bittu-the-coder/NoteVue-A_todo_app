import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, ExternalLink } from "lucide-react";
import SEO from "../components/SEO"; // Import SEO component
import StructuredData from "../components/StructuredData"; // Import StructuredData component

const onboardingContent = [
  {
    title: "Your Smart Space for Notes & Tasks",
    description:
      "Organize your day, thoughts, and goals — all in one beautifully simple place.",
    buttonText: "Next",
    icon: "📝",
    color: "from-blue-600 to-purple-600",
    decoration: "bg-blue-600/10",
  },
  {
    title: "Capture Everything, Instantly",
    description:
      "From quick ideas to full tasks — jot down what matters with seamless syncing and intuitive design.",
    buttonText: "Next",
    icon: "⚡",
    color: "from-purple-600 to-indigo-600",
    decoration: "bg-purple-600/10",
  },
  {
    title: "Clarity Meets Productivity",
    description:
      "Focus on what matters with a distraction-free interface and smart organization tools.",
    buttonText: "Get Started",
    icon: "🎯",
    color: "from-indigo-600 to-blue-600",
    decoration: "bg-indigo-600/10",
  },
];

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingContent.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetStarted = () => {
    navigation("/login");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col md:flex-row relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <SEO
        title="Welcome to NoteVue"
        description="Organize your day, thoughts, and goals — all in one beautifully simple place. NoteVue is your productivity companion."
        keywords="task management, note taking, productivity app, todo list, sticky notes, digital planner"
        canonicalUrl="/"
      />
      <StructuredData path="/" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-60 md:w-80 h-60 md:h-80 bg-blue-400 opacity-10 rounded-full" />
        <div className="absolute top-1/4 -right-20 w-40 md:w-60 h-40 md:h-60 bg-purple-500 opacity-10 rounded-full" />
        <div className="absolute -bottom-20 left-1/4 w-32 md:w-40 h-32 md:h-40 bg-indigo-400 opacity-15 rounded-full" />
      </div>

      {/* Left side - Image */}
      <motion.div
        className="md:w-1/2 h-48 sm:h-64 md:h-auto relative overflow-hidden"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-10"></div>
        <motion.img
          src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Person working on laptop"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        />
        <motion.div
          className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20 text-white"
          variants={fadeInUp}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-1 md:mb-2"
            variants={fadeInUp}
          >
            NoteVue
          </motion.h1>
          <motion.p
            className="text-base md:text-lg opacity-90"
            variants={fadeInUp}
          >
            Your productivity companion
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right side - Content */}
      <motion.div
        className="md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center flex-1"
        variants={fadeInUp}
      >
        <div className="max-w-md mx-auto w-full">
          {/* Step indicators */}
          <motion.div
            className="flex justify-center gap-1.5 md:gap-2 mb-6 md:mb-8"
            variants={fadeInUp}
          >
            {onboardingContent.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 md:h-2 rounded-full transition-all ${
                  index === currentStep
                    ? `w-10 md:w-12 bg-gradient-to-r ${onboardingContent[currentStep].color}`
                    : "w-6 md:w-8 bg-white/30"
                }`}
                whileHover={{ scale: 1.1 }}
                onClick={() => setCurrentStep(index)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </motion.div>

          {/* Content card */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 sm:p-8 border border-white/20 shadow-lg relative overflow-hidden"
            variants={fadeInUp}
            key={currentStep}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className={`absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 rounded-full filter blur-3xl ${onboardingContent[currentStep].decoration} opacity-50`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="text-4xl md:text-5xl mb-4 md:mb-6"
              variants={fadeInUp}
            >
              {onboardingContent[currentStep].icon}
            </motion.div>

            <motion.h2
              className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4"
              variants={fadeInUp}
            >
              {onboardingContent[currentStep].title}
            </motion.h2>

            <motion.p
              className="text-white/80 mb-6 md:mb-8 text-base md:text-lg"
              variants={fadeInUp}
            >
              {onboardingContent[currentStep].description}
            </motion.p>

            <motion.button
              onClick={
                onboardingContent[currentStep].buttonText === "Next"
                  ? handleNext
                  : handleGetStarted
              }
              className="w-full bg-gradient-to-r from-white to-white/90 text-indigo-900 hover:bg-white/90 transition-all py-4 md:py-3 px-6 rounded-lg font-semibold text-base md:text-lg shadow-md flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              variants={fadeInUp}
            >
              {onboardingContent[currentStep].buttonText}
              {onboardingContent[currentStep].buttonText === "Next" ? (
                <ChevronRight size={18} />
              ) : (
                <ExternalLink size={18} />
              )}
            </motion.button>
          </motion.div>

          {currentStep < onboardingContent.length - 1 && (
            <motion.div
              className="flex justify-between px-2 mt-4 md:mt-6"
              variants={fadeInUp}
            >
              <motion.button
                onClick={handlePrev}
                className={`flex items-center text-white/70 hover:text-white transition-colors text-sm py-2 ${
                  currentStep === 0 ? "invisible" : ""
                }`}
                whileHover={{ x: -2 }}
              >
                <ChevronLeft size={16} className="mr-1" />
                Back
              </motion.button>
              <motion.button
                onClick={() => setCurrentStep(onboardingContent.length - 1)}
                className="text-white/70 hover:text-white transition-colors text-sm flex items-center py-2"
                whileHover={{ x: 2 }}
              >
                Skip onboarding
                <ChevronRight size={16} className="ml-1" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Onboarding;
