import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import BlogForm from "./BlogForm";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId)
        );
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setShowForm(true);
  };

  const handleAddNewBlog = () => {
    setEditBlog(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchBlogs();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {showForm ? (editBlog ? "Edit Blog" : "Add New Blog") : "Blogs"}
        </h1>
        {!showForm && (
          <button
            onClick={handleAddNewBlog}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Blog
          </button>
        )}
      </div>

      {showForm ? (
        <BlogForm blog={editBlog} onClose={handleFormClose} />
      ) : (
        <>
          <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="border-b-1">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Duration</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBlogs.map((blog) => (
                    <tr key={blog._id} className="border-t">
                      <td className="px-4 py-2">
                        <img
                          src={`http://localhost:5000${blog.image}`} // Fixed image path
                          alt={blog.title}
                          className="w-16 h-16 rounded-md"
                          onError={(e) => {
                            e.target.src = "/images/default-image.jpg"; // Optional: Handle image error
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">{blog.title}</td>
                      <td className="px-4 py-2">{blog.category}</td>
                      <td className="px-4 py-2">{blog.duration}</td>
                      <td className="px-4 py-2">{blog.description}</td>
                      <td className="px-4 py-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span>
              Showing {indexOfFirstBlog + 1}-
              {Math.min(indexOfLastBlog, blogs.length)} of {blogs.length}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
