import {getToday} from "../utils/date-format.js";
import * as profileDao from "../database/profile/profile-dao.js";
import * as followDao from "../database/follow/follow-dao.js";
import * as commentDao from "../database/comment/comment-dao.js";
import * as likeDao from "../database/like/like-dao.js";
import * as albumDao from "../database/album/album-dao.js";
import * as artistDao from "../database/artist/artist-dao.js";
import * as playlistDao from "../database/playlist/playlist-dao.js";
import * as trackDao from "../database/track/track-dao.js";
import * as showDao from "../database/show/show-dao.js";
import * as episodeDao from "../database/episode/episode-dao.js";

const createUser = async (req, res) => {
    const createData = req.body;

    const existingEmail = await profileDao.getProfileByEmail(createData.email);

    if (existingEmail !== null) {
        res.json({
            status: "fail",
            message: "This email address belongs to another account"
        });
        return;
    }

    const existingUsername = await profileDao.getProfileByUsername(createData.username);

    if (existingUsername !== null) {
        res.json({
            status: "fail",
            message: "This username is already taken"
        })
        return;
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

    const likedPosts = [];
    const promises = [];

    for (const l of likes) {
        const promise = getProfileLikeData(l, likedPosts);
        promises.push(promise)
    }

    const followerList = [];

    for (const follower of followers) {
        const promise = getFollowData(follower.follower_id, followerList);
        promises.push(promise);
    }

    const followingList = [];

    for (const follow of following) {
        const promise = getFollowData(follow.followee_id, followingList);
        promises.push(promise)
    }

    await Promise.all(promises);

    const userData = {
        ...(currUser._doc),
        followers: followerList,
        following: followingList,
        comments: comments,
        likes: likedPosts
    }

    // if user is artist, retrieve artist name to be displayed in profile
    if (userData.isArtist) {
        userData.music = []
    }

    res.json(userData);
}

const putProfileData = async (req, res) => {
    const userId = req.params.id;
    const newData = req.body;

    if (newData.email) {
        const existingEmail = await profileDao.getProfileByEmail(newData.email);

        if (existingEmail !== null && String(existingEmail._id) !== req.session.userData._id) {
            res.json({
                status: "fail",
                message: "This email address belongs to another account"
            });
            return;
        }
    }

    await profileDao.updateProfile(userId, newData);

    res.sendStatus(200);
}

const registerAdmin = (req, res) => {
    const key = process.env.REGISTER_KEY;
    const data = req.body;
    const userKey = data.key;
    if (userKey === key) {
        req.session.userData.isAdmin = true;
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

const getProfilePicture = async (req, res) => {
    const user_id = req.params.id;

    const profile = await profileDao.getProfileById(user_id);

    if (profile !== null) {
        res.json({profilePicture: profile.profilePicture})
    } else {
        res.sendStatus(404);
    }
}

const getProfileLikeData = async (l, likedPosts) => {
    let result = null;
    switch (l.type) {
        case "track":
            result = await trackDao.getPost(l.post_id);
            break;
        case "album":
            result = await albumDao.getPost(l.post_id);
            break;
        case "artist":
            result = await artistDao.getPost(l.post_id);
            break;
        case "show":
            result = await showDao.getPost(l.post_id);
            break;
        case "episode":
            result = await episodeDao.getPost(l.post_id);
            break;
        case "playlist":
            result = await playlistDao.getPost(l.post_id);
            break;
    }

    const postLikes = await likeDao.getLikesByPost(l.post_id);
    const likeCount = postLikes.length;
    const postComments = await commentDao.getCommentsByPost(l.post_id);
    const commentCount = postComments.length;

    if (result !== null) {
        likedPosts.push({
            ...result._doc,
            type: l.type,
            likes: likeCount,
            comments: commentCount
        })
    }
}

const getFollowData = async (id, followList) => {
    const followerProfile = await profileDao.getProfileById(id);
    followList.push({
        _id: id,
        username: followerProfile.username,
        profilePicture: followerProfile.profilePicture
    })
}

const profileController = (app) => {
    app.post('/profile', createUser);
    app.post('/profile/login', login);
    app.post('/profile/logout', logout)
    app.get('/profile', getCurrentUser);
    app.get('/profile/:id', getProfileData);
    app.put('/profile/:id', putProfileData);
    app.post('/profile/admin', registerAdmin);
    app.get('/profile/picture/:id', getProfilePicture);
}

export default profileController;