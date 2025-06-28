import multer from "multer";
import { storage } from "../utils/cloudinary.js"; // ✅ get storage from named export

const upload = multer({ storage });

export default upload;
