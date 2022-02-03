import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoute from './routes/job.js';
import userRoute from './routes/user.js';

const app = express();

app.set('view engine', 'ejs');

dotenv.config();

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Form Stuff

// Static Files

// Setup Views


// Routes
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('*', (req, res) => {
    res.render('404');
})
app.use('/job', jobRoute)
app.use('/user', userRoute)

// Connecting to the database...
// mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connect('mongodb://localhost:27017/empDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(process.env.PORT || 5000, () => console.log(`Success : Server running on port : http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error.message} did not connect`));
