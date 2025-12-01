import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import User from "../models/User.model.js";

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get the logged-in user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Upload stream to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_FOLDER || "my-app",
          resource_type: "image",
          overwrite: true,
          transformation: [{ width: 800, height: 800, crop: "limit" }],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    const imageUrl = uploadResult.secure_url;
    const publicId = uploadResult.public_id;

    // Delete old Cloudinary image if exists
    if (user.profileImagePublicId) {
      try {
        await cloudinary.uploader.destroy(user.profileImagePublicId, {
          resource_type: "image",
        });
      } catch (err) {
        console.error("Failed to delete previous image:", err.message);
      }
    }

    // Save new image to user
    user.profileImageUrl = imageUrl;
    user.profileImagePublicId = publicId;
    await user.save();

    return res.status(200).json({ imageUrl, publicId });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
