import mongoose  from "mongoose";

const jobSchema = mongoose.Schema({
    title: String,
    job_profile: String,
    creator: String,
    categories: { type: mongoose.Schema.Types.ObjectId, ref: "CategoryModel" } ,
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel' }
})
// Important concept in NoSQL DB
// Schema design -- pattern relationship model - model (1 - many relation) Job - Category, job - image, 
// Schema Validation
// Aggregation Query

var JobModel = mongoose.model('JobModel', jobSchema);

export default JobModel;


