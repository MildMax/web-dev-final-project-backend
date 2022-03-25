const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
app.use(cors());
app.use(express.json());

const sess = {
    secret: 'ASAMPLESECRET',
    cookie: { secure: false }
}

app.use(session(sess));

require('./profileHandler')(app);

app.listen(4000);