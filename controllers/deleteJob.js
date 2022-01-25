import JobModel from "../models/jobModel.js";
import mongoose from "mongoose";

export const deleteJob = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await JobModel.findOneAndDelete(id);

    res.json({ message: " Resource successfully deleted"});
}
