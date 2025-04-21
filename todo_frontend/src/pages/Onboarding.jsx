import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const onboardingContent = [
  {
    title: "Your Smart Space for Notes & Tasks",
    description:
      "Organize your day, thoughts, and goals — all in one beautifully simple place.",
    buttonText: "Next",
    icon: "📝",
    handleBtn: () => {},
  },
  {
    title: "Capture Everything, Instantly",
    description:
      "From quick ideas to full tasks — jot down what matters with seamless syncing and intuitive design.",
    buttonText: "Next",
    icon: "⚡",
  },
  {
    title: "Clarity Meets Productivity",
    description:
      "Focus on what matters with a distraction-free interface and smart organization tools.",
    buttonText: "Get Started",
    icon: "🎯",
  },
];

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col md:flex-row">
      <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Person working on laptop"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <h1 className="text-4xl font-bold mb-2">NoteVue</h1>
          <p className="text-lg opacity-90">Your productivity companion</p>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingContent.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all ${
                  index === currentStep ? "bg-white w-12" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Content card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg">
            <div className="text-5xl mb-6">
              {onboardingContent[currentStep].icon}
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {onboardingContent[currentStep].title}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {onboardingContent[currentStep].description}
            </p>
            <button
              onClick={
                onboardingContent[currentStep].buttonText === "Next"
                  ? handleNext
                  : handleGetStarted
              }
              className="w-full bg-white text-indigo-900 hover:bg-white/90 transition-colors py-3 px-6 rounded-lg font-semibold text-lg shadow-md"
            >
              {onboardingContent[currentStep].buttonText}
            </button>
          </div>

          {currentStep < onboardingContent.length - 1 && (
            <>
              <div className="flex justify-between px-2">
                <button
                  onClick={handlePrev}
                  className="mt-4 text-white/70 hover:text-white transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(onboardingContent.length - 1)}
                  className="mt-4 text-white/70 hover:text-white transition-colors text-sm"
                >
                  Skip onboarding
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
