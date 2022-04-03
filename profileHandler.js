const userData = require('./data/user-profile.json');
const externalUserData = require('./data/external-profile.json');

let currUserData = userData;
let currExternalUserData = externalUserData;

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!req.session.userData) {
        req.session.userData = {
            _id: currUserData._id,
            username: currUserData.username
        }
    }
    res.json(req.session.userData);
}

const getProfileData = (req, res) => {
    const userId = req.params.id;
    const intUserId = parseInt(userId);
    if (intUserId === currExternalUserData._id) {
        res.json(currExternalUserData);
    } else if (intUserId === currUserData._id) {
        res.json(currUserData);
    } else {
        res.json({});
    }
}

const putProfileData = (req, res) => {
    const userId = req.params.id;
    const intUserId = parseInt(userId);
    const newData = req.body;
    console.log(newData)
    if (intUserId === currExternalUserData._id) {
        const oldData = currExternalUserData;
        currExternalUserData = {
            ...oldData,
            ...newData
        }
    } else if (intUserId === currUserData._id) {
        const oldData = currUserData;
        currUserData = {
            ...oldData,
            ...newData
        }
    }
    res.sendStatus(200);
}

const registerAdmin = (req, res) => {
    const key = process.env.REGISTER_KEY;
    const data = req.body;
    const userKey = data.key;
    if (userKey === key) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

module.exports = (app) => {
    app.post('/profile/login', login);
    app.get('/profile/:id', getProfileData);
    app.put('/profile/:id', putProfileData);
    app.post('/profile/admin', registerAdmin);
}