export const BlogCard = ({ blog, onClick }) => {
  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl 
        transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {blog.images?.[0] && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={`${blog.images?.[0]}`}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 
            flex items-center justify-center text-white font-medium"
          >
            {blog.author?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <span className="text-sm font-medium text-gray-800">
              {blog.author?.name}
            </span>
            <p className="text-xs text-gray-500">
              {formatDate(blog.createdAt)}
            </p>
          </div>
        </div>

        <div>
          <h2
            className="text-xl font-bold text-gray-800 line-clamp-2 mb-2 
            group-hover:text-blue-600 transition-colors"
          >
            {blog.title}
          </h2>
          <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
            {blog.content}
          </p>
        </div>

        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium
                  hover:bg-blue-100 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button className="text-gray-500 hover:text-blue-600 transition-colors">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-blue-600 transition-colors">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-blue-600 transition-colors">
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-blue-600 transition-colors">
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// components/BlogModal.jsx
export const BlogModal = ({ blog, onClose }) => {
  const formatDate = (date) => new Date(date).toLocaleString();

  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {blog.images?.[0] && (
          <img
            src={`${blog.images?.[0]}`}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg">
            {blog.author?.name?.[0] || "A"}
          </div>
          <div>
            <h3 className="font-medium">{blog.author?.name}</h3>
            <time className="text-gray-500">{formatDate(blog.createdAt)}</time>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 whitespace-pre-wrap mb-6">{blog.content}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {blog.comments?.length > 0 && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <div className="space-y-4">
              {blog.comments.map((comment, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      {comment.author?.name?.[0] || "A"}
                    </div>
                    <span className="font-medium">{comment.author?.name}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
