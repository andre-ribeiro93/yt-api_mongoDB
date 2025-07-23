import { config } from 'dotenv';
import express from 'express'
import cors from 'cors';
import userRoutes from './routes/user.routes';
import videoRoutes from './routes/video.routes';
import mongoose from 'mongoose';


config();

const app = express();
const PORT = process.env.PORT;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoutes);
app.use('/videos', videoRoutes);

const { HOST_NAME, HOST_PASSWORD, HOST_CLUSTER, HOST_DATABASE, MONGO_DB_PARAMS } = process.env;
const URI = `mongodb+srv://${HOST_NAME}:${HOST_PASSWORD}@${HOST_CLUSTER}/${HOST_DATABASE}?${MONGO_DB_PARAMS}`;

mongoose.connect(URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });