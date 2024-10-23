import React, { useState, useEffect } from "react";

const ServiceForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        image: null, // Reset image
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = service ? "PUT" : "POST";
    const url = service
      ? `http://localhost:5000/api/service/${service._id}`
      : "http://localhost:5000/api/service";

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await fetch(url, {
        method,
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to save service");
      }
      onClose(); // Close the form and refresh the service list
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        {service ? "Edit Service" : "Add New Service"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Service Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Service Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {service ? "Update Service" : "Add Service"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
