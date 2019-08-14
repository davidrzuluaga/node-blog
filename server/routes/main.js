import express from 'express';
import { createBlog, getAllBlog } from '../controllers/blog';
const auth = require('./auth');

const router = express.Router();

router.use('/users', require('./users'));

router.post('/blog', auth.required, createBlog);
router.get('/blogs', getAllBlog);

export default router;