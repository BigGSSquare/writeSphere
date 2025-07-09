import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  try {
    console.log(req.body);

    const { username, password, firstname, lastname, bio } = req.body;

    // Validate required fields
    if (!username || !password || !firstname || !lastname) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(username)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    // Check for existing user
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      bio,
    });

    // Remove password logging for security
    console.log("User registered successfully:", username);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during registration",
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Both email and password are required",
      });
    }
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.USER_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Create user object without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
    };

    // Set token as cookie and respond
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 60 * 60 * 1000, // 1 hour (matches JWT expiration)
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Use secure in production
      })
      .json({
        success: true,
        message: `Welcome back, ${user.firstname}!`,
        user: userResponse,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed due to server error",
    });
  }
};

export const logout = async (_, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "logout successfull",
  });
};
