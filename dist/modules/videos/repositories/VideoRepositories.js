"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const videos_model_1 = __importDefault(require("../models/videos.model"));
const uuid_1 = require("uuid");
class VideoRepository {
    createVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, thumbnail, publishedAt } = req.body;
                const { user_id } = req.user;
                const video = {
                    video_id: (0, uuid_1.v4)(),
                    user_id,
                    title,
                    description,
                    thumbnail,
                    publishedAt,
                };
                yield videos_model_1.default.updateOne({ user_id }, { $push: { videos: video } });
                res.status(201).json({ message: 'Video created successfully!' });
            }
            catch (error) {
                console.error('Error creating video:', error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        });
    }
    ;
    getVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.user;
                const videosCollection = yield videos_model_1.default.findOne({ user_id });
                if (!videosCollection) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                const videos = videosCollection.videos;
                res.status(200).json({ videos, message: 'Videos returned successfully!' });
            }
            catch (error) {
                console.error('Error getting videos:', error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        });
    }
    ;
    deleteVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.user;
                const { video_id } = req.params;
                const updatedVideosCollection = yield videos_model_1.default.updateOne({ user_id }, { $pull: { videos: { video_id } } });
                if (updatedVideosCollection.modifiedCount === 0) {
                    return res.status(404).json({ message: 'Video not found or already deleted.' });
                }
                res.status(200).json({ message: 'Video deleted successfully!' });
            }
            catch (error) {
                console.error('Error deleting video:', error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        });
    }
    ;
    searchVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { search } = req.query;
                const videos = yield videos_model_1.default.aggregate([
                    { $unwind: '$videos' },
                    {
                        $match: {
                            $or: [
                                { 'videos.title': { $regex: search, $options: 'i' } },
                                { 'videos.description': { $regex: search, $options: 'i' } }
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
            }
            catch (error) {
                console.error('Error searching for videos:', error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        });
    }
}
exports.default = VideoRepository;
