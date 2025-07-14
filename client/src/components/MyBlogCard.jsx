import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

const MyBlogCard = ({ blog, onDelete }) => {
  return (
    <div className="flex items-center gap-4 bg-[#0f0f10]/80 backdrop-blur-md border border-[#a55050]/30 rounded-xl p-4 shadow-lg hover:shadow-2xl transition w-full max-w-4xl mx-auto mb-4">
      <img
        src={blog.thumbnail}
        alt="Thumbnail"
        className="w-28 h-20 object-cover rounded-md border border-[#a55050]/40 shadow-sm"
      />
      <div className="flex-grow">
        <h3 className="text-lg text-white font-semibold">{blog.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-1">{blog.subtitle}</p>
        <p className="text-xs text-gray-500 mt-1">
          Created on: {moment(blog.createdAt).format("DD MMM YYYY")}
        </p>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <Link to={`/edit/${blog._id}`}>
          <FaRegEdit className="text-[#a55050] hover:text-white transition text-lg cursor-pointer" />
        </Link>
        <FaRegTrashAlt
          className="text-[#a55050] hover:text-white transition text-lg cursor-pointer"
          onClick={() => onDelete(blog._id)}
        />
      </div>
    </div>
  );
};

export default MyBlogCard;
