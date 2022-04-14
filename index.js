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

mongoose.connect('mongodb://localhost:27017/webdev');

const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000" // configure from env vars
}));
app.use(express.json());

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

profileController(app);
followController(app);
commentController(app);
likeController(app);
postController(app);
contentController(app);

app.listen(4000);