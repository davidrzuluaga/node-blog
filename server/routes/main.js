import express from 'express';
import { createBlog, getAllBlog, getUsersBlog, deleteEntry } from '../controllers/blog';
const auth = require('./auth');

const router = express.Router();

router.use('/users', require('./users'));

router.post('/blog', auth.required, createBlog);
router.get('/blogs', getAllBlog);
router.get('/blog/:id', auth.required, getUsersBlog);
router.delete('/blog/:id', auth.required, deleteEntry);

export default router;