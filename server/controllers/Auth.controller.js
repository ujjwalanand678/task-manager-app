import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

// generate JWT token
const createJwtToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_TOKEN_KEY,
    { expiresIn: "7d" }
  );
};

//REGISTER USER

export const userRegister = async (req, res) => {
  const { name, email, password, adminInviteToken } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // check email
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email",
      });
    }

    // Determine admin role
    let role = "member";
    if (
      adminInviteToken &&
      adminInviteToken === process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CLOUDINARY UPLOAD (if profile image exists)
    let profileImageUrl = null;
    let profileImagePublicId = null;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "user-profiles",
            resource_type: "image",
            transformation: [{ width: 800, height: 800, crop: "limit" }],
          },
          (error, result) => (error ? reject(error) : resolve(result))
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      profileImageUrl = uploadResult.secure_url;
      profileImagePublicId = uploadResult.public_id;
    }

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImageUrl,
      profileImagePublicId,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//LOGIN USER

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User is not registered",
      });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });

    const token = createJwtToken(user);

    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      role: user.role,
      data: sanitizedUser,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//GET PROFILE 
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // name & email update
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // password update
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    //CLOUDINARY IMAGE UPDATE
    if (req.file) {
      // delete old image if exists
      if (user.profileImagePublicId) {
        await cloudinary.uploader.destroy(user.profileImagePublicId);
      }

      // upload new image
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "user-profiles",
            resource_type: "image",
            transformation: [{ width: 800, height: 800, crop: "limit" }],
          },
          (error, result) => (error ? reject(error) : resolve(result))
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      user.profileImageUrl = uploadResult.secure_url;
      user.profileImagePublicId = uploadResult.public_id;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImageUrl: updatedUser.profileImageUrl,
      },
      token: createJwtToken(updatedUser),
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
