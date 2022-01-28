// server/models/Profile.js
// Schema - attribute that validate data storing
const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
    // Mongoose provide lot of prebuilt tools for validation that makes our data more consistence and enhance data integrations
    firstName : { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    age: { type: Number, default: 0 },
    team: { type: String, default: '', trim: true },
    position: { type: String, default: '', trim: true }
})

module.exports = mongoose.model('Profile', Profile);

// Data querying is done in controller
const express = require('express');
const router = express.Router()

const Profile = require('../models/Profile.js')

router.get('/profile', (req, res) => {

    Profile.find() // Query for every data in our mongoDB Profile collection
    .then(profiles => {
        // success Block
        res.json({
            confirmation: 'success',
            data: profiles
        }) 
    })
    .catch(err =>{
        // error Block
        res.status(404).json({ confirmation: 'fail', message: err.message })
    })
})

module.exports = router;


// In database I have to learn about primary and foreign key and its equivalent in MongoDB as _id and reference
// reference in mongoDB is useful for better schema design 
// $lookup -- to join different collections in mongoDB Database

// $populate -- alternative for $lookup in mongoose ODM used for referencing collections in mongoDB Database
// aggregation query in Mongoose for dabase computation


