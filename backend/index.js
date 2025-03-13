import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import './passportConfig.js';
import connectToMongo from './db.js';
import auth from './routes/authRoutes.js';


dotenv.config();
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ 
    origin: [process.env.FRONTEND_URL],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true }));

app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(port, () => console.log("App listening..."));