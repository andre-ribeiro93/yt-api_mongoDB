import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  video_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const videoCollectionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  videos: [videoSchema],
});

const Video = mongoose.model('Video', videoCollectionSchema);

export default Video;