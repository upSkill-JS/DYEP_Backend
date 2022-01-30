import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
    country:{
        type: String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
});

var LocationModel = new mongoose.model('LocationModel', locationSchema);
export default LocationModel;