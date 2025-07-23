"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRepository_1 = __importDefault(require("../modules/users/repositories/UserRepository"));
const login_1 = require("../middleware/login");
const userRoutes = (0, express_1.Router)();
const userRepository = new UserRepository_1.default;
userRoutes.post('/sign-up', (req, res) => {
    userRepository.createUser(req, res);
});
userRoutes.post('/check-user', (req, res) => {
    userRepository.checkUserbyEmail(req, res);
});
userRoutes.post('/sign-in', (req, res) => {
    userRepository.login(req, res);
});
userRoutes.get('/get-user', login_1.login, (req, res) => {
    userRepository.getUser(req, res);
});
exports.default = userRoutes;
