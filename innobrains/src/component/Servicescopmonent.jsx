// src/component/ServicesSection.jsx
import React, { useEffect, useState } from "react";
import "../App.css";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/service");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Handle button click to show all services
  const handleShowAll = () => {
    setShowAll(!showAll); // Toggle between showing all services or not
  };

  // Optionally filter services if needed
  const displayedServices = showAll ? services : services.slice(0, 3); // Show only first 3 by default

  return (
    <div className="px-4 py-12 md:px-12 lg:px-[44px]">
      {/* Section Heading */}
      <div className="text-center mb-8 w-full mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 poppins-thin">
          We Provide A Wide Range Of Services
        </h1>
        <p className="text-gray-400 text-base md:text-lg poppins-thin">
          Custom digital solutions that deliver real results. We offer our
          clients personalized services to make them feel delighted.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 flex-wrap">
        {displayedServices.map((service) => (
          <div
            key={service._id}
            className="bg-[#103153] text-white p-6 rounded-2xl w-full md:w-[48%] lg:w-[28%]"
          >
            <div className="flex mb-4 justify-center">
              <div className="p-4 rounded">
                <img
                  src={`http://localhost:5000/images/${service.image}`} // Adjust the image URL as needed
                  alt={service.name}
                  className="w-12 h-12"
                />
              </div>
            </div>

            <h2 className="text-lg md:text-xl font-bold mb-4 poppins-thin">
              {service.name}
            </h2>
            <p className="text-gray-300 mb-6 text-sm md:text-base poppins-thin">
              {service.description}
            </p>
            <button className="border-[#F8AF2A] poppins-thin border text-[#F8AF2A] py-2 px-4 rounded-full hover:bg-[#F8AF2A] hover:text-white transition duration-300">
              Contact Us
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleShowAll}
          className="px-6 py-2 poppins-thin mt-11 bg-[#F8AF2A] text-white rounded-full hover:bg-yellow-600 transition duration-300"
        >
          {showAll ? "Show Less Services" : "See All Services"}
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
