const userData = require('./data/user-profile.json');
const externalUserData = require('./data/external-profile.json');

let userDataTemp = undefined;
let currentProfile = {};

const getUserProfile = (req, res) => {
    if (userDataTemp === undefined) {
        userDataTemp = userData;
    }
    res.json(userDataTemp);
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
    const oldData = userDataTemp;
    userDataTemp = {
        ...oldData,
        ...newProfileData
    }

    res.sendStatus(200);
}

module.exports = (app) => {
    app.get('/profile', getUserProfile);
    app.get('/profile/:id', getProfile);
    app.put('/profile', putUserProfileData);
}