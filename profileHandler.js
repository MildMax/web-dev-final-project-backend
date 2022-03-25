const userData = require('./data/user-profile.json');
const externalUserData = require('./data/external-profile.json');

const getUserProfile = (req, res) => {
    req.session.userData = userData;
    res.json(req.session.userData);
}

const getProfile = (req, res) => {
    const userId = req.params.id;
    const intUserId = parseInt(userId);
    if (intUserId === userData._id) {
        req.session.currentProfile = userData;
    } else if (intUserId === externalUserData._id) {
        req.session.currentProfile = externalUserData;
    }
    res.json(req.session.currentProfile);
}

module.exports = (app) => {
    app.get('/profile', getUserProfile);
    app.get('/profile/:id', getProfile);
}