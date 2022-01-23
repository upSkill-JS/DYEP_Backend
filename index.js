import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import JobModel from './models/jobModel.js';

// (1) To create a post route for Admin --- for creating job application in mongo DB database.
/* -- importing npm package
-- connection to mongoDB
-- environmental variable // SIGNIFICANCE
>>> Geting the port from environmental variable... 
>>> Securing password and username...

-- post route build...
>>> FOLDER STRUCTURE...
*/

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Connecting to the database...
mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT || 5000, () => console.log(`Success : Server running on port : http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error.message} did not connect`));

    
app.post('/job', async (req, res) => {
    const { title, job_profile } = req.body;
    console.log(title);
    

    const newJobModel = new JobModel({ title, job_profile });

    try {
        await newJobModel.save();
        res.status(200).json(newJobModel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} )


app.get('/job', async(req, res) => {
    res.send('Success')
})