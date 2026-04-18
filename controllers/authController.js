import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import CafeteriaAttendant from '../models/CafeteriaAttendant.js';


// REGISTER NEW STAFF / ATTENDANT
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await CafeteriaAttendant.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new attendant
    const newAttendant = new CafeteriaAttendant({
      name,
      email,
      password: hashedPassword
    });

    await newAttendant.save();

    res.status(201).json({
      message: "Staff registered successfully",
      attendant: newAttendant
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// LOGIN STAFF
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const attendant = await CafeteriaAttendant.findOne({ email });

    if (!attendant) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, attendant.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // create JWT token
    const token = jwt.sign(
      { id: attendant._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      attendant
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};