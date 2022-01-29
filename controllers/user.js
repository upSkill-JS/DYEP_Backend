import UserModel from "../models/userModel.js";
import CryptoJS from "crypto-js"; // Tomorrow's task for Hashing password for string it into DB
// import mongoose from "mongoose";


export const createUser = async (req, res) => {
    const body = req.body;

    const newUserModel = new UserModel(body);

    try {
        await newUserModel.save();
        res.status(200).json(newUserModel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} 

