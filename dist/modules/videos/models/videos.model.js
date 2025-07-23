"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const videoSchema = new mongoose_1.default.Schema({
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
const videoCollectionSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true,
    },
    videos: [videoSchema],
});
const Video = mongoose_1.default.model('Video', videoCollectionSchema);
exports.default = Video;
