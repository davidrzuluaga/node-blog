import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const blogSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});
export default mongoose.model('Blog', blogSchema);