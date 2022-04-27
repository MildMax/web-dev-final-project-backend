import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

import profileController from "./controllers/profile-controller.js";
import followController from "./controllers/follow-controller.js";
import commentController from "./controllers/comment-controller.js";
import likeController from "./controllers/like-controller.js";
import postController from "./controllers/post-controller.js";
import contentController from "./controllers/content-controller.js";

const database = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/webdev';
mongoose.connect(database);


const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN_URL || "http://localhost:3000"
}));
app.use(express.json({ limit: 100000 }));

const env = process.env.PRODUCTION ? true : false;

if (env) {
    app.set('trust proxy', 1)
} // trust first proxy
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: env }
}))

profileController(app);
followController(app);
commentController(app);
likeController(app);
postController(app);
contentController(app);

app.listen(4000);