import express from 'express';
import { createJob, getJobs, getJob, updateJob } from '../controllers/job.js';
import { deleteJob } from '../controllers/deleteJob.js';

const router = express.Router();

router.post('/', createJob )

router.get('/', getJobs )

router.get('/:id', getJob )

router.put('/:id', updateJob )

router.delete('/:id', deleteJob)

export default router;