import JobModel from "../models/jobModel.js";
import CategoryModel from "../models/category.js";
import mongoose from "mongoose";

export const createJob = async (req, res) => {
    const { title, job_profile } = req.body;

    const newJobModel = new JobModel({ title, job_profile });

    try {
        await newJobModel.save();
        res.status(200).json(newJobModel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} 

export const getJobs = async(req, res) => {
    try {
        const JobInfo = await JobModel.find();

        res.status(200).json(JobInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getJob = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);  

    const specificJob = await JobModel.findById(id);

    res.status(200).json(specificJob);   
}

export const updateJob = async(req, res) => {
    const { id } = req.params;
    const { title, job_profile } = req.body;
    const updateJob = { title, job_profile }; 

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await JobModel.findByIdAndUpdate(id, req.body, { new: true })  
    /* Significance of passing { new : true } =>
       => By default mongoose will return the record before update, In reality we want the record after updating
       => So by passing this alias { new: true } we are telling mongoose to return the record to us after updating.
    */  
       
    res.json( updateJob );
}

export const jobCreate = (req, res) => {
    console.log("working");
    const body = req.body;
    const { categories, ...others } = body;

    // const newCategory = new CategoryModel(categories);
    // const newLocation = new Location(req.body.location);
    res.json({ others : others, categories: categories  });


} 

