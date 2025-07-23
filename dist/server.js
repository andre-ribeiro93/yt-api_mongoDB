"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const video_routes_1 = __importDefault(require("./routes/video.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/user', user_routes_1.default);
app.use('/videos', video_routes_1.default);
const { HOST_NAME, HOST_PASSWORD, HOST_CLUSTER, HOST_DATABASE, MONGO_DB_PARAMS } = process.env;
const URI = `mongodb+srv://${HOST_NAME}:${HOST_PASSWORD}@${HOST_CLUSTER}/${HOST_DATABASE}?${MONGO_DB_PARAMS}`;
mongoose_1.default.connect(URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
