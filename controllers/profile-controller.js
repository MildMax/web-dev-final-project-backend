import {getToday} from "../utils/date-format.js";
import * as profileDao from "../database/profile/profile-dao.js";
import * as followDao from "../database/follow/follow-dao.js";
import * as commentDao from "../database/comment/comment-dao.js";
import * as likeDao from "../database/like/like-dao.js";

const createUser = async (req, res) => {
    const createData = req.body;

    const checkResult = await profileDao.getProfileByEmail(createData.email);

    if (checkResult !== null) {
        res.sendStatus(400);
    }

    const newUserData = {
        username: createData.username,
        name: createData.name,
        dob: createData.dob,
        email: createData.email,
        website: "",
        joined: getToday(),
        bio: "",
        password: createData.password,
        profilePicture: "",
        isArtist: false,
        artistId: "",
        isAdmin: false,
    }

    await profileDao.createProfile(newUserData);
    const profile = await profileDao.getProfileByEmail(createData.email);

    req.session.userData = {
        _id: profile._id,
        username: profile.username,
        isAdmin: profile.isAdmin
    }

    res.sendStatus(200);
}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const profile = await profileDao.getProfileByCredentials(email, password);

    if (profile === null) {
        res.sendStatus(403);
        return;
    }

    req.session.userData = {
        _id: profile._id,
        username: profile.username,
        isAdmin: profile.isAdmin
    }

    res.sendStatus(200);
}

const logout = (req, res) => {
    req.session.userData = undefined;
    res.sendStatus(200);
}

const getCurrentUser = (req, res) => {
    res.json(req.session.userData);
}

const getProfileData = async (req, res) => {
    const userId = req.params.id;
    const currUser = await profileDao.getProfileById(userId);
    const followers = await followDao.getFollowers(userId);
    const following = await followDao.getFollowing(userId);
    const comments = await commentDao.getCommentsByUser(userId);
    const likes = await likeDao.getLikesByUser(userId);

    const followerList = [];

    for (const follower of followers) {
        const followerProfile = await profileDao.getProfileById(follower.follower_id);
        followerList.push({
            _id: follower.follower_id,
            username: followerProfile.username,
            profilePicture: followerProfile.profilePicture
        })
    }

    const followingList = [];

    for (const follow of following) {
        const followingProfile = await profileDao.getProfileById(follow.followee_id);
        followingList.push({
            _id: follow.followee_id,
            username: followingProfile.username,
            profilePicture: followingProfile.profilePicture
        })
    }

    const userData = {
        ...(currUser._doc),
        followers: followerList,
        following: followingList,
        comments: comments,
        likes: likes
    }
    res.json(userData);
}

const putProfileData = async (req, res) => {
    const userId = req.params.id;
    const newData = req.body;
    await profileDao.updateProfile(userId, newData);

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

const profileController = (app) => {
    app.post('/profile', createUser);
    app.post('/profile/login', login);
    app.post('/profile/logout', logout)
    app.get('/profile', getCurrentUser);
    app.get('/profile/:id', getProfileData);
    app.put('/profile/:id', putProfileData);
    app.post('/profile/admin', registerAdmin);
}

export default profileController;