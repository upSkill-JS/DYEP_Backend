import express from 'express';
import { getJobs, getJob, updateJob, jobCreate, deleteJob } from '../controllers/job.js';
import { verifyTokenAndAdmin } from '../controllers/verifyToken.js';

const router = express.Router();


router.get('/', getJobs )

router.get('/:id', getJob )

router.put('/:id', verifyTokenAndAdmin, updateJob )

router.delete('/:id', verifyTokenAndAdmin, deleteJob)

router.post('/jobCreate', verifyTokenAndAdmin, jobCreate)

export default router;