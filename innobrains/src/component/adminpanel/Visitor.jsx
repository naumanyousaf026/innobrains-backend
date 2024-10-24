import React, { useState, useEffect } from "react";
import axios from "axios";

const Visitor = () => {
  const [submissions, setSubmissions] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/visitor");
        console.log("API response:", response.data); // Log the API response structure

        // Check the response structure and update the state accordingly
        if (Array.isArray(response.data)) {
          setSubmissions(response.data); // If the data is already an array
        } else if (
          response.data.visitors &&
          Array.isArray(response.data.visitors)
        ) {
          setSubmissions(response.data.visitors); // If the data is wrapped in an object with a 'visitors' array
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        setError("Error fetching visitor data");
        console.error("Error fetching visitor data:", error);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Visitor Data</h1>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border-b px-4 py-2 text-left">Full Name</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">Phone Number</th>
              <th className="border-b px-4 py-2 text-left">Message</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="border px-4 py-2">
                    {`${submission.FirstName} ${submission.LastName}`}
                  </td>
                  <td className="border px-4 py-2">{submission.email}</td>
                  <td className="border px-4 py-2">{submission.number}</td>
                  <td className="border px-4 py-2">{submission.message}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No visitor data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Visitor;
