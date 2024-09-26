import React from "react";
// Import your image here
import achiev from "../../images/download.png"; // Update the path as needed

const Achievements = () => {
  return (
    <div className="bg-[#F6F6F6]">
      <div className="w-5/6 mx-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-16 px-4 sm:px-6 lg:px-8">
          {/* Left Section: Text */}
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Achievements
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="mt-2">Projects completed</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">200%</h3>
                <p className="mt-2">Year on year growth</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">$50m</h3>
                <p className="mt-2">Funded</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">10k</h3>
                <p className="mt-2">Downloads</p>
              </div>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={achiev} // This will now work
              alt="Teamwork"
              className="w-[75%] h-[30rem] ms-auto object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
