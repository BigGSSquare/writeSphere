import React from "react";
import Aurora from "../components/Aurora";
import BlurText from "../components/BlurText";
import { useNavigate } from "react-router-dom";
import ShinyText from "../components/ShinyText";

const Home = () => {
  const handleAnimationComplete = () => {};
  const navigate = useNavigate();
  const onclickhandler = () => {
    navigate("/login");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-serif">
      {/* Aurora WebGL Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <Aurora
          amplitude={2.5}
          blend={0.45}
          colorStops={["#7a2c2c", "#ffe6e6", "#7a2c2c"]}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-5" />

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-start h-full px-10 sm:px-20">
        <div className="max-w-2xl text-left text-[#f9eae1] space-y-6">
          {/* Animated Heading */}
          <BlurText
            text="WriteSphere"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-tight"
          />

          {/* Animated Subtext */}
          <BlurText
            text="Your space to explore dev journeys, build in public, and share your story."
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-lg sm:text-xl text-[#e5d3cb] leading-relaxed"
          />

          {/* CTA Button */}
          <div className="pt-4">
            <button
              className="bg-[#a55050]/90 hover:bg-[#a55050] text-white px-6 py-3 rounded-xl text-base sm:text-lg font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={onclickhandler}
            >
              <ShinyText
                text="Start Reading"
                disabled={false}
                speed={2}
                className=""
              />
              ;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
