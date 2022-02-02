import UserModel from "../models/userModel.js";
import CryptoJS from "crypto-js"; // Tomorrow's task for Hashing password for storing it into DB
import jwt from "jsonwebtoken";

// REGISTRATION
export const createUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.PASS_SEC
  ).toString();
  const isAdmin = req.body.isAdmin;

  const newUserModel = new UserModel({ username, email, password, isAdmin });

  try {
    await newUserModel.save(); // CRYPTO-JS
    res.status(200).json(newUserModel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Credentials!");

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(500).json("Wrong Credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    // const userRes = others._doc;

    res.status(200).json({ user, others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE USER'S ACCOUNT
export const updateAccount = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(500).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE USER'S ACCOUNT
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

