import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes';

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

mongoose.connect('mongodb://localhost:27017/Todo')

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
