import React from "react";
import { Link } from "react-router-dom";
import handpointer from "../images/handpointer.png"; // Import the image

const GrowthSteps = () => {
  return (
    <section className="bg-[#F9FAFB] py-12">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h3 className="text-gray-500 uppercase poppins-thin font-semibold tracking-wide mb-8 poppins-thin">
          Process
        </h3>
        <h2 className="text-6xl font-bold mb-36">
          Unlock <span className="text-yellow-500 poppins-thin">growth</span> in
          3 simple steps
        </h2>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[76rem] mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        {/* Step 1 */}
        <div className="bg-[#D5E2EF] max-w-md p-8 shadow-md rounded-3xl text-center relative mx-auto">
          <div className="absolute -top-[4.5rem] left-1/2 transform -translate-x-1/2 bg-[#F8AF2A] w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold poppins-thin p-16">
            01
          </div>
          <div className="mt-10">
            <img
              src={handpointer} // Use the imported image
              alt="pointer icon"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-lg font-semibold mb-2 poppins-thin ">
              Get ready for big results
            </h3>
            <p className="text-lg poppins-thin my-2">
              Let our CRO experts guide or deliver you a pathway to higher
              conversions.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#D5E2EF] max-w-md p-8 rounded-3xl shadow-md text-center relative mx-auto">
          <div className="absolute -top-[4.5rem] left-1/2 transform -translate-x-1/2 bg-[#F8AF2A] w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold poppins-thin p-16">
            02
          </div>
          <div className="mt-10 ">
            <img
              src={handpointer} // Use the same imported image for the second step
              alt="pointer icon"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-lg font-semibold mb-2 poppins-thin ">
              Get ready for big results
            </h3>
            <p className="text-lg poppins-thin my-2">
              Let our CRO experts guide or deliver you a pathway to higher
              conversions.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#D5E2EF] max-w-md p-8 rounded-3xl shadow-md text-center relative mx-auto">
          <div className="absolute -top-[4.5rem] left-1/2 transform -translate-x-1/2 bg-[#F8AF2A] w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold poppins-thin p-16">
            03
          </div>
          <div className="mt-10 ">
            <img
              src={handpointer} // Use the same imported image for the third step
              alt="pointer icon"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-lg font-semibold mb-2 poppins-thin poppins-thin">
              Watch your profits grow
            </h3>
            <p className="poppins-thin text-lg my-2">
              Sit back and relax as you make more money with no additional ad
              spend.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Button */}
      <div className="text-center mt-8">
        <Link to="/contact">
          <button className="bg-[#F8AF2A] poppins-thin py-2 px-10 rounded-full text-lg hover:bg-yellow-600 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GrowthSteps;
