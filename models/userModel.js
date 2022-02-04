// MVP -- Minimum Viable Product -- frontend --> EJS Bootstrap -- scratch CSS -- HTML 
// final -- production -- frontend -- React
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
        avatar: { type: String },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }, 
    { timestamps: true }
);

var UserModel = mongoose.model( "UserModel", UserSchema );
export default UserModel;