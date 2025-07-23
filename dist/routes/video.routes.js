"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VideoRepositories_1 = __importDefault(require("../modules/videos/repositories/VideoRepositories"));
const login_1 = require("../middleware/login");
const videoRoutes = (0, express_1.Router)();
const videoRepository = new VideoRepositories_1.default;
videoRoutes.post('/create-video', login_1.login, (request, response) => {
    videoRepository.createVideo(request, response);
});
videoRoutes.get('/get-videos', login_1.login, (request, response) => {
    videoRepository.getVideos(request, response);
});
videoRoutes.get('/search', (request, response) => {
    videoRepository.searchVideos(request, response);
});
videoRoutes.delete('/delete-video/:video_id', login_1.login, (request, response) => {
    videoRepository.deleteVideos(request, response);
});
exports.default = videoRoutes;
