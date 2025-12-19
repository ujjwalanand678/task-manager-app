import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import User from "../models/User.model.js";

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "user-profiles" },
        (error, result) => (error ? reject(error) : resolve(result))
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    return res.status(200).json({
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Upload failed" });
  }
};

