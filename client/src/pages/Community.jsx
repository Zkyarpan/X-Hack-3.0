import { useState, useEffect } from "react";
import { BlogCard, BlogModal } from "../components/BlogCard";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const data = await response.json();
      setBlogs(data.Result || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setPreviewImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => formDataToSend.append("images", file));
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch(`${baseUrl}/api/blogs/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({ title: "", content: "", tags: "", images: [] });
        setPreviewImages([]);
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 gap-4">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-8 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Community Blogs</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2 bg-[#2D775C] text-white rounded-lg hover:bg-[#2D775C] 
                transition-colors"
            >
              Create Post
            </button>
          </div>

          {showAddForm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
                <div className="sticky top-0 bg-white p-6 border-b z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D775C] to-[#2D775C] bg-clip-text text-transparent">
                      Create New Blog Post
                    </h2>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter an engaging title..."
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D775C] 
              focus:ring-2 focus:ring-[#2D775C] transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <textarea
                      placeholder="Share your thoughts..."
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D775C] 
              focus:ring-2 focus:ring-[#2D775C] transition-all min-h-[200px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="Add tags separated by commas (e.g. farming, agriculture, organic)"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D775C] 
              focus:ring-2 focus:ring-[#2D775C] transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    <label
                      className="flex items-center gap-3 px-6 py-4 border-2 border-dashed border-gray-300 
              rounded-xl cursor-pointer hover:border-[#2D775C] hover:bg-[#2D775C]transition-all"
                    >
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">Add Images</p>
                        <p className="text-sm text-gray-500">
                          Upload one or more images
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {previewImages.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt="preview"
                              className="rounded-xl h-24 w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-white shadow-lg rounded-full p-1.5
                      opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 
              font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#2D775C] text-white rounded-xl hover:bg-[#2D775C] 
              font-medium transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Create Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-4 border-[#2D775C] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onClick={() => setSelectedBlog(blog)}
                />
              ))}
            </div>
          )}

          {selectedBlog && (
            <BlogModal
              blog={selectedBlog}
              onClose={() => setSelectedBlog(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
