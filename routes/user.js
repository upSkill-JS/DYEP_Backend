import express from 'express';
import { createUser, deleteAccount, loginUser, updateAccount } from '../controllers/user.js';
import { verifyTokenAndAuthorization } from '../controllers/verifyToken.js';

const router = express.Router();


router.post('/register', createUser )
router.post('/login', loginUser)
router.put('/:id', verifyTokenAndAuthorization, updateAccount)
router.delete('/:id', verifyTokenAndAuthorization, deleteAccount)

export default router;