import React from "react";

const ContactUs = () => {
  return (
    <div className="flex justify-center items-center px-4 bg-[#F9FAFB] py-16">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Side: Form */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-600 mt-4 mb-12 text-lg">
            Our friendly team would love to hear from you.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Name */}
            <div className="flex flex-col">
              <label
                htmlFor="first-name"
                className="text-[#101010]  font-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2 rounded-md focus:outline-none focus:border-[#103153]"
                aria-label="First name"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label
                htmlFor="last-name"
                className="text-[#101010]  font-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2 rounded-md focus:outline-none focus:border-[#103153]"
                aria-label="Last name"
              />
            </div>

            {/* Email */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label htmlFor="email" className="text-[#101010]  font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2 rounded-md focus:outline-none focus:border-[#103153]"
                aria-label="Email"
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label
                htmlFor="phone-number"
                className="text-[#101010]  font-semibold"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone-number"
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2  rounded-md focus:outline-none focus:border-[#103153]"
                aria-label="Phone number"
              />
            </div>

            {/* Message */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label
                htmlFor="message"
                className="text-[#101010]  font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2 rounded-md h-32 focus:outline-none focus:border-[#103153]"
                aria-label="Message"
              ></textarea>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center col-span-1 md:col-span-2">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-600">
                I accept the Terms
              </label>
            </div>
          </form>

          {/* Submit Button */}
          <button className="block bg-[#F8AF2A] text-white px-3 py-2 rounded-full w-40 mt-6 text-center text-lg font-medium transition duration-300 ease-in-out hover:bg-yellow-600">
            Contact Us
          </button>
        </div>

        {/* Right Side: Map with matching height */}
        <div className="h-full">
          <iframe
            className="w-full h-full min-h-[450px] rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.4842714007123!2d72.36365137481681!3d31.26269725982886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3923a3b76e01b86d%3A0xdda9568c468f6252!2sInnobrains%20technologies!5e0!3m2!1sen!2s!4v1726726087354!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
