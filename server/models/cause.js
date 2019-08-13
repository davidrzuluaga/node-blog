import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const causeSchema = new mongoose.Schema({
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
  user_id: {
    type: String,
    required: true,
  },
});
export default mongoose.model('Cause', causeSchema);