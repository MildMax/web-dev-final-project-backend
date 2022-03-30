const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'PUT', 'POST'],
    credentials: true
}));
app.use(express.json());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

require('./profileHandler')(app);

app.listen(4000);