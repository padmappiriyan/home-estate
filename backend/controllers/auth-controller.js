import bcrypt from 'bcryptjs';
import User from "../models/user-model.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';

// Utility function to generate JWT token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


const setCookie = (res, token) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PRODUCTION',
    sameSite: process.env.NODE_ENV === 'PRODUCTION' ? 'none' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
   
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist with this email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(existingUser._id);
    setCookie(res, token);

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      user: {
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const googlesignin = async (req, res, next) => {
  try {
    const { name, email, image } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      const token = generateToken(user._id);
      setCookie(res, token);

      return res.status(200).json({
        success: true,
        message: "User signed in successfully",
        user: {
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
        },
      });
    }

    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword =  bcrypt.hashSync(generatedPassword, 10);

    user = new User({
      username: name,
      email,
      password: hashedPassword,
      profilePicture: image,
    });

    await user.save();

    const token = generateToken(user._id);
    setCookie(res, token);

    res.status(201).json({
      success: true,
      message: "User signed in successfully",
      user: {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    next(error);
  }
};