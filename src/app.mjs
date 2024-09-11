import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import passport from 'passport';
import medilab from './routes/medilab/index.mjs';
import './strategies/passport-jwt.mjs';

// initialize express session
const app = express();
const port = process.env.PORT || 3000;

// cors
app.use(cors({
    origin: '*',
    credentials: true,
    maxAge: 1 * 24 * 60 * 60 // 1 day
}))

// handle preflight requests
app.options((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin, Set-Cookie , Access-Control-Request-Method, Access-Control-Request-Headers');
    res.sendStatus(204);
});

// for production
app.set('trust proxy', 1);

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

// passport setup
app.use(passport.initialize());

// middleware
app.use(express.json()); // accept json data
app.use(express.urlencoded({ extended: true })); // accept url encoded data

// main route
app.get('/', (req, res) => {
   res.send('Hello World!');
});

// sub routes
app.use('/medilab', medilab);

// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ result: false, message: 'something Borken', data: err.stack });
})

// app listen
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});