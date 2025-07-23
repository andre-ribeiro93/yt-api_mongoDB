"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided!' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET); //descriptografando o token //
        req.user = decoded;
        next(); //serve para dizer que caso o token estaja validado, deve-se dar continuidade no processo.
    }
    catch (error) {
        return res.status(401).json({ message: 'Access denied!' });
    }
};
exports.login = login;
