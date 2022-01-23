import mongoose  from "mongoose";

const jobSchema = mongoose.Schema({
    title: String,
    job_profile: String
})

var JobModel = mongoose.model('JobModel', jobSchema);

export default JobModel;
