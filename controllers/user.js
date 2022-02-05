import UserModel from "../models/userModel.js";
import CryptoJS from "crypto-js"; // Tomorrow's task for Hashing password for storing it into DB
import jwt from "jsonwebtoken";

// REGISTRATION
export const createUser = async (req, res) => {
  console.log(req.body);
  console.log(req.file); //file

  const username = req.body.username;
  const email = req.body.email;
  const password = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.PASS_SEC
  ).toString();
  const avatar = req.file.path;
  const isAdmin = req.body.isAdmin;
  // console.log(isAdmin);

  const newUserModel = new UserModel({
    username,
    email,
    password,
    avatar,
    isAdmin,
  });

  try {
    await newUserModel.save(); // CRYPTO-JS
    // res.status(200).json(newUserModel);
    res.redirect("/login");
  } catch (error) {
    // res.status(404).json({ message: error.message });
    console.log({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    // console.log(user);
    // !user && res.status(500).json("Wrong Credentials!");

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    // console.log(originalPassword, req.body.password);

    if (originalPassword === req.body.password) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      // console.log(accessToken);
      const storedToken = req.cookies.refreshToken;
      res
        .status(200)
        .cookie("refreshToken", accessToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .render("account", { accessToken, storedToken });
    }

    // const { password, ...others } = user._doc;
    // const userRes = others._doc;

    // json({ user, others, accessToken });
    /* res.cookie("jwt", accessToken, {
        // expires: new Date(date.now() + 3000),
        httpOnly: true
      }); */
  } catch (err) {
    res.status(500).render("unAuthorized");
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

// GET ACCOUNT DETAILS
export const getAccount = async (req, res) => {
  try {
    const accountDetail = await User.findById(req.params.id);
    // return accountDetail;
    res.status(200).json(accountDetail);
  } catch (err) {
    // return err;
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
