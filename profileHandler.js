const userData = require('./data/user-profile.json');
const externalUserData = require('./data/external-profile.json');

let userDataTemp = undefined;
let currentProfile = {};

const getUserProfile = (req, res) => {
    if (!req.session.userData) {
        req.session.userData = userData;
    }
    console.log(req.session.userData);
    res.json(req.session.userData);
}

const getProfile = (req, res) => {
    const userId = req.params.id;
    const intUserId = parseInt(userId);
    if (intUserId === externalUserData._id) {
        currentProfile = externalUserData;
    }
    res.json(currentProfile);
}

const putUserProfileData = (req, res) => {
    const newProfileData = req.body;
    const oldData = req.session.userData;
    console.log(oldData);
    req.session.userData = {
        ...oldData,
        ...newProfileData
    }

    console.log(req.session.userData);

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
    app.get('/profile', getUserProfile);
    app.get('/profile/:id', getProfile);
    app.put('/profile', putUserProfileData);
    app.post('/profile/register', registerAdmin);
}