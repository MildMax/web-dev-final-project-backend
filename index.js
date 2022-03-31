const express = require('express');
const cors = require('cors');
const session = require('express-session');

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

require('./profileHandler')(app);

app.listen(4000);