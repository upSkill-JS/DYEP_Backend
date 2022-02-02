import JobModel from "../models/jobModel.js";
import CategoryModel from "../models/category.js";
import mongoose from "mongoose";
import LocationModel from "../models/locationModel.js";


/* export const createJob = async (req, res) => {
    const { title, job_profile } = req.body;

    const newJobModel = new JobModel({ title, job_profile });

    try {
        await newJobModel.save();
        res.status(200).json(newJobModel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} */

export const getJobs = async(req, res) => {
    try {
        const JobInfo = await JobModel.find()
                                      .select("title job_profile categories")
                                      .populate("categories")
                                      .populate("location")
                                      .exec();

        res.status(200).json(JobInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getJob = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))  return res.status(404).send(`No post with id: ${id}`);  

    const specificJob = await JobModel.findById(id)
                                       .populate("categories")
                                       .populate("location")
                                       .exec();
    res.status(200).json(specificJob);   
}

export const updateJob = async(req, res) => {
    const { id } = req.params;
    const { location, categories, ...others } = req.body;
    // const updateJob = { title, job_profile }; 

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const mainModel = await JobModel.findById(id);

    // for updating the location
    if(mainModel.location){
        var updatedLocation = await LocationModel.findByIdAndUpdate(mainModel.location, location, { new: true });
    }
    else{
        const newLocation = new LocationModel(location);
        updatedLocation = await newLocation.save();
        await JobModel.findByIdAndUpdate(id, { location: updatedLocation._id }, { new: true } );
    }

    // for updating the category
    if(mainModel.categories){
        var updatedCategory = await CategoryModel.findByIdAndUpdate(mainModel.categories, categories, { new: true })
    }
    else{
        const newCategory = CategoryModel({category: categories});
        updatedCategory = await newCategory.save();
        await JobModel.findByIdAndUpdate(id, { categories: updatedCategory._id }, { new: true });
    }

    const updatedJob = await JobModel.findByIdAndUpdate(id,others, { new: true });  
    /* Significance of passing { new : true } =>
       => By default mongoose will return the record before update, In reality we want the record after updating
       => So by passing this alias { new: true } we are telling mongoose to return the record to us after updating.
    */  
       
    res.json( { updatedJob, updatedCategory, updatedLocation } );
}

// export const jobCreate = async (req, res) => {
//     // console.log("working");
//     const body = req.body;
//     const { categories, ...others } = body;

//     const newCategory = new CategoryModel({ category : categories }); // save -> document -> _id -> JobMode
//     const newJob = new JobModel(others);

//     // Save to DB
//     try {
//         const savedCategory = await newCategory.save();
//         const id = savedCategory._id;
//         newJob.categories = id;
//         const savedJob = await newJob.save();
//         res.json({ savedJob, newCategory, categories, others });
//     } catch(err) {
//         res.status(500).json({ message : err.message });
//     }
// } 

export const jobCreate = async (req, res) => {
    const body = req.body;
    const { location, categories, ...others } = body;

    const newLocation = new LocationModel(location);
    const newCategory = new CategoryModel({ category : categories }); // save -> document -> _id -> JobMode
    const newJob = new JobModel(others);

    // Save to DB
    try {
        const savedLocation = await newLocation.save();
        const savedCategory = await newCategory.save();
        const id = savedCategory._id;
        newJob.categories = id;
        newJob.location = savedLocation._id
        const savedJob = await newJob.save();
        res.json({ savedJob, newCategory, savedLocation });
    } catch(err) {
        res.status(500).json({ message : err.message });
    }
}
