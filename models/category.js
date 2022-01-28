import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category: { type: Array }
})

var CategoryModel = mongoose.model('CategoryModel', categorySchema);

export default CategoryModel;