import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import JobModel from './models/jobModel.js';

/* Bug resolved after adding middleware app.use(bodyParser.json({ extended: true }))
-- Initially It was my missconception that urlencoded middleware is capable of parsing json post request,
I was wrong we explicitly need bodyParser.json({ extended: true }) to parse incoming json request
*/

const app = express();

dotenv.config();

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Connecting to the database...
mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT || 5000, () => console.log(`Success : Server running on port : http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error.message} did not connect`));

    
app.post('/job', async (req, res) => {
    const { title, job_profile } = req.body;

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