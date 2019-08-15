import mongoose from 'mongoose';
import Blog from '../models/blog';

export function createBlog(req, res) {
  const blog = new Blog({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    picture: req.body.picture,
    user: req.body.user,
    date: new Date()
  });
  
  return blog
  .save()
  .then((newBlog) => {
    return res.status(201).json({
      success: true,
      message: 'New blog created successfully',
      Blog: newBlog,
    });
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  });
}

export function getAllBlog(req, res){
  Blog.find()
  //.select('_id title description')
  .then((allBlog) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all Blogs',
      Blog: allBlog,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  });
};

export function getUsersBlog(req, res){
  Blog.find({user: req.params.id})
  //.select('_id title description')
  .then((usersBlog) => {
    return res.status(200).json({
      success: true,
      message: `A list of user: ${req.params.id} blog entries`,
      Blog: usersBlog,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  });
};

export function deleteEntry(req, res){
  Blog.findByIdAndRemove(req.params.id)
  //.select('_id title description')
  .then((usersBlog) => {
    return res.status(200).json({
      success: true,
      message: `Deleted successfully`
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  });
};