import React from "react";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 bg-black relative ">
        <div className="absolute w-100 h-95 bg-[#a55050] z-10 top-30 left-30 rounded-4xl"></div>
        <img
          src="/landing.jpg"
          alt="landing-image"
          className="w-100 h-90 z-20 absolute top-25 left-40 rounded-4xl"
        />
      </div>
      <div
        className="w-1/2 bg-black grid grid-cols-6
        grid-rows-6 gap-3 p-3
      "
      >
        <div className="bg-black col-span-6 row-start-2 row-end-4">
          <h1 className="font-alter font-bold text-5xl text-white leading-tight">
            Best Way To Express Your Thoughts Is Turning It Into Actions...
          </h1>
        </div>
        <div className="bg-black col-span-3 row-start-4 flex justify-start items-start">
          <NavLink
            className="bg-[#a55050] p-4 rounded-2xl w-full  h-full max-h-10 flex justify-center items-center
          hover:cursor-pointer hover:bg-[#a55050c9] transition"
            to="/About"
          >
            <span className="font-alter text-black font-bold">Learn More</span>
          </NavLink>
        </div>
        <div className="bg-black col-span-3 row-start-4 flex justify-start items-start">
          <NavLink
            className="bg-[#a55050] p-4 rounded-2xl w-full  h-full max-h-10 flex justify-center items-center
          hover:cursor-pointer hover:bg-[#a55050c9] transition"
            to="/Login"
          >
            <span className="font-alter text-black font-bold">
              Start Reading{" "}
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
