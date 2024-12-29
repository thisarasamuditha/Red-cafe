import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import userItemRoutes from './routes/userItemRoutes.js';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/user-items', userItemRoutes);

app.use("/", (req, res) => {
    res.send("hello world");
});

app.listen(5001, () => {
    console.log("server is running on port 5001");
});