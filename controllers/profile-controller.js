const userData = require('../data/user-profile.json');
const externalUserData = require('../data/external-profile.json');

let currUserData = userData;
let currExternalUserData = externalUserData;

let users = [
    currUserData,
    currExternalUserData
]

const createUser = (req, res) => {
    const createData = req.body;
    const newUserData = {
        _id: (new Date()).getTime() + '',
        username: createData.username,
        name: createData.name,
        dob: createData.dob,
        email: createData.email,
        website: "",
        joined: "2022-03-18",
        bio: "",
        password: createData.password,
        followerCount: 0,
        followingCount: 0,
        profilePicture: "/images/blank-profile-picture.png",
        isArtist: false,
        isAdmin: false,
        comments: [],
        music: [],
        likes: []
    }
    users.push(newUserData);

    req.session.userData = {
        _id: newUserData._id,
        username: newUserData.username
    }

    res.sendStatus(200);

}

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.filter(u => username === u.username && password === u.password)

    if (!user) {
        res.sendStatus(404);
    }

    const userData = {
        _id: user._id,
        username: user.username
    }

    req.session.userData = userData

    res.json(req.session.userData);
}

const getCurrentUser = (req, res) => {
    console.log(req.session.userData)
    res.json(req.session.userData);
}

const getProfileData = (req, res) => {
    const userId = req.params.id;
    const currUser = users.find(u => u._id === userId);
    res.json(currUser);
}

const putProfileData = (req, res) => {
    const userId = req.params.id;
    const newData = req.body;
    let currUser = users.find(u => u._id === userId);
    console.log(currUser)
    currUser = {
        ...currUser,
        ...newData
    }
    users = users.map(u => u._id === currUser._id ? currUser : u);

    console.log(users)

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
    app.post('/profile', createUser);
    app.post('/profile/login', login);
    app.get('/profile', getCurrentUser);
    app.get('/profile/:id', getProfileData);
    app.put('/profile/:id', putProfileData);
    app.post('/profile/admin', registerAdmin);
}