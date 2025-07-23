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
const users_model_1 = __importDefault(require("../models/users.model"));
const videos_model_1 = __importDefault(require("../../videos/models/videos.model"));
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserRepository {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
                const newUser = {
                    user_id: (0, uuid_1.v4)(),
                    name,
                    email,
                    password: hashedPassword,
                };
                const videosCollection = {
                    user_id: newUser.user_id,
                    videos: []
                };
                const existingUser = yield users_model_1.default.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists.' });
                }
                yield users_model_1.default.create(newUser);
                yield videos_model_1.default.create(videosCollection);
                res.status(201).json({ message: 'User created successfully!' });
            }
            catch (error) {
                console.error('Error creating user:', error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        });
    }
    ;
    checkUserbyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return res.status(400).json({ error: 'Email is required' });
                }
                const user = yield users_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({
                        exists: false,
                        user: null,
                        error: 'User not found'
                    });
                }
                return res.status(200).json({
                    exists: true,
                    user: {
                        name: user.name,
                    }
                });
            }
            catch (error) {
                console.error('Error checking user by email:', error);
                res.status(500).json({ error: 'Internal server error.' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield users_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                const isPasswordValid = yield (0, bcrypt_1.compare)(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid password.' });
                }
                const token = (0, jsonwebtoken_1.sign)({
                    user_id: user.user_id,
                    email: user.email
                }, process.env.SECRET, { expiresIn: '1d' });
                return res.status(200).json({ token: token, message: 'Authentication created successfully!' });
            }
            catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        });
    }
    ;
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.user;
                const user = yield users_model_1.default.findOne({ user_id });
                if (!user) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                const foundUser = {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                };
                return res.status(200).json({ user: foundUser });
            }
            catch (error) {
                console.error('Error getting user:', error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        });
    }
    ;
}
exports.default = UserRepository;
