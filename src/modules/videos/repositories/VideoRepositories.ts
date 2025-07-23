import { Request, Response } from 'express';
import Video from "../models/videos.model";
import { v4 as uuidv4 } from 'uuid';

class VideoRepository {

  async createVideo(req: Request, res: Response) {
    try {
      const { title, description, thumbnail, publishedAt } = req.body;
      const { user_id } = (req as any).user;

      const video = {
        video_id: uuidv4(),
        user_id,
        title,
        description,
        thumbnail,
        publishedAt,
      };

      await Video.updateOne(
        { user_id },
        { $push: { videos: video } }
      );

      res.status(201).json({ message: 'Video created successfully!' });

    } catch (error) {
      console.error('Error creating video:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };


  async getVideos(req: any, res: Response) {
    try {
      const { user_id } = req.user;

      const videosCollection = await Video.findOne({ user_id });
      if (!videosCollection) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const videos = videosCollection.videos;
      res.status(200).json({ videos, message: 'Videos returned successfully!' });

    } catch (error) {
      console.error('Error getting videos:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };


  async deleteVideos(req: any, res: Response) {
    try {
      const { user_id } = req.user;
      const { video_id } = req.params;

      const updatedVideosCollection = await Video.updateOne(
        { user_id },
        { $pull: { videos: { video_id } } }
      );

      if (updatedVideosCollection.modifiedCount === 0) {
        return res.status(404).json({ message: 'Video not found or already deleted.' });
      }

      res.status(200).json({ message: 'Video deleted successfully!' });

    } catch (error) {
      console.error('Error deleting video:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };


  async searchVideos(req: Request, res: Response) {
    try {
      const { search } = req.query;

      const videos = await Video.aggregate([
        { $unwind: '$videos' },
        {
          $match: {
            $or: [
              { 'videos.title': { $regex: search as string, $options: 'i' } },
              { 'videos.description': { $regex: search as string, $options: 'i' } }
            ]
          }
        },
        {
          $project: {
            _id: 0,
            user_id: 1,
            video: '$videos',
          }
        }
      ]);

      res.status(200).json({
        message: 'Video search completed successfully!',
        videos
      });

    } catch (error) {
      console.error('Error searching for videos:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
}


export default VideoRepository;