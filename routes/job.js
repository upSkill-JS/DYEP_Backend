import express from 'express';
import { createJob, getJobs, getJob, updateJob, jobCreate } from '../controllers/job.js';
import { deleteJob } from '../controllers/deleteJob.js';

const router = express.Router();

router.post('/', createJob )

router.get('/', getJobs )

router.get('/:id', getJob )

router.put('/:id', updateJob )

router.delete('/:id', deleteJob)

router.post('/jobCreate', jobCreate)

export default router;