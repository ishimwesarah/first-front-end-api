import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary storage for different types of files
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder;

    // Determine the folder based on the field name
    if (file.fieldname === "videos") {
      folder = "videos";
    } else if (file.fieldname === "documents") {
      folder = "documents";
    } else if (
      file.fieldname === "images" ||
      file.fieldname === "imagePreview"
    ) {
      folder = "images";
    } else {
      throw new Error("Invalid field name"); // Handle unexpected field names
    }

    return {
      folder: folder, // The folder in Cloudinary where files will be uploaded
      resource_type: "auto", // Automatically detect file type
      public_id: ${Date.now()}-${file.originalname.split(".")[0]}, // Custom file name
    };
  },
});

// Configure multer with Cloudinary storage
const configureMulter = () => {
  const upload = multer({
    storage,
    limits: {
      fileSize: 50 * 1024 * 1024, // Max file size of 50 MB
    },
    fileFilter(req, file, cb) {
      const allowedFormats = {
        videos: ["video/mp4", "video/mpeg", "video/mp3"],
        documents: [
          "application/pdf",
          "application/ppt",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        images: ["image/jpeg", "image/png", "image/gif"],
        imagePreview: ["image/jpeg", "image/png"], // Specify allowed formats for imagePreview
      };

      // Check if the file type is allowed
      if (
        allowedFormats[file.fieldname] &&
        allowedFormats[file.fieldname].includes(file.mimetype)
      ) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"), false); // Reject the file
      }
    },
  }).fields([
    { name: "videos", maxCount: 5 },
    { name: "documents", maxCount: 5 },
    { name: "images", maxCount: 5 },
    { name: "imagePreview", maxCount: 5 }, // Ensure this matches your frontend
  ]);

  return upload;
};

export default configureMulter;