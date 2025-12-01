import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// generate JWT token
const createJwtToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_TOKEN_KEY,
    { expiresIn: "7d" }
  );
};



export const userRegister = async (req, res, next) => {
  const { name, email, password, adminInviteToken, profileImageUrl } = req.body;
  try {
    // validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // check if the user exists
    let userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message:
          "user is already registered with this email, please use a different email",
      });
    }
    //Determine user role : Admin if correct tocken is provided else member
    let role = "member";
    if (
      adminInviteToken &&
      adminInviteToken === process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }
    //password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
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
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const userLogin = async (req, res, next) => {
  //data aquired from the frontend/client/postman
  const { email, password } = req.body;
  try {
    //find the registered email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User is not registered" });
    }

    //compare password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = createJwtToken(user);
    // we dont want to send password and role in response.
    // Convert mongoose document to plain object
    const userObj = user.toObject();
    delete userObj.password; // remove password
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      role: user.role,
      data: userObj,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: createJwtToken(updatedUser),
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
