import * as followDao from "../database/follow/follow-dao.js";
import * as likeDao from "../database/like/like-dao.js";
import * as commentDao from "../database/comment/comment-dao.js";
import * as albumDao from "../database/album/album-dao.js";
import * as artistDao from "../database/artist/artist-dao.js";
import * as playlistDao from "../database/playlist/playlist-dao.js";
import * as trackDao from "../database/track/track-dao.js";
import * as showDao from "../database/show/show-dao.js";
import * as episodeDao from "../database/episode/episode-dao.js";

const getAnonymousContent = async (req, res) => {

    // collect post ids and content type from comment/like daos
    const likes = await likeDao.getLastTwentyLikes();
    const comments = await commentDao.getLastTwentyComments();

    const combined = [
        ...likes,
        ...comments
    ]

    const combinedLength = combined.length;
    const lim = Math.min(20, combinedLength);

    const combinedTotal = combined.sort((a, b) => b.timestamp - a.timestamp).slice(0, lim);
    const noDuplicates = Array.from(new Set(combinedTotal.map(a => a.post_id)))
        .map(id => {
            return combinedTotal.find(a => a.post_id === id)
        })

    const posts = [];

    for (const v of noDuplicates) {
        let result = null;
        switch(v.type) {
            case "track":
                result = await trackDao.getPost(v.post_id);
                break;
            case "album":
                result = await albumDao.getPost(v.post_id);
                break;
            case "artist":
                result = await artistDao.getPost(v.post_id);
                break;
            case "show":
                result = await showDao.getPost(v.post_id);
                break;
            case "episode":
                result = await episodeDao.getPost(v.post_id);
                break;
            case "playlist":
                result = await playlistDao.getPost(v.post_id);
                break;
        }
        if (result !== null) {
            posts.push({
                ...result._doc,
                type: v.type
            });
        }
    }

    res.json({posts});

}

const getNonAnonymousContent = async (req, res) => {

    const user_id = req.params.user_id;

    const userLikes = await likeDao.getLikesByUser(user_id);
    const userComments = await commentDao.getCommentsByUser(user_id);

    // use follow dao to find users that the given user is following and select the most recent 5 likes/
    // comments for that user
    const following = await followDao.getFollowing(user_id);
    let likes = [];
    let comments = [];

    for (const f of following) {
        const id = f.followee_id;
        const followerLikes = await likeDao.getLikesByUser(id);
        const followerComments = await commentDao.getCommentsByUser(id);
        likes = [...likes, ...followerLikes];
        comments = [...comments, ...followerComments];
    }

    const combined = [...userLikes, ...userComments, ...likes, ...comments];
    const combinedLength = combined.length;
    const lim = Math.min(20, combinedLength);
    const combinedTotal = combined.sort((a, b) => b.timestamp - a.timestamp).slice(0, lim);
    const noDuplicates = Array.from(new Set(combinedTotal.map(a => a.post_id)))
        .map(id => {
            return combinedTotal.find(a => a.post_id === id)
        })

    const posts = [];
    for (const v of noDuplicates) {
        let result = null;
        switch(v.type) {
            case "track":
                result = await trackDao.getPost(v.post_id);
                break;
            case "album":
                result = await albumDao.getPost(v.post_id);
                break;
            case "artist":
                result = await artistDao.getPost(v.post_id);
                break;
            case "show":
                result = await showDao.getPost(v.post_id);
                break;
            case "episode":
                result = await episodeDao.getPost(v.post_id);
                break;
            case "playlist":
                result = await playlistDao.getPost(v.post_id);
                break;
        }
        if (result !== null) {
            posts.push({
                ...result._doc,
                type: v.type
            });
        }
    }

    res.json({posts});
}

const contentController = (app) => {
    app.get('/content', getAnonymousContent);
    app.get('/content/:user_id', getNonAnonymousContent);
}

export default contentController;