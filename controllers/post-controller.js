import * as albumDao from "../database/album/album-dao.js";
import * as artistDao from "../database/artist/artist-dao.js";
import * as playlistDao from "../database/playlist/playlist-dao.js";
import * as trackDao from "../database/track/track-dao.js";
import * as showDao from "../database/show/show-dao.js";
import * as episodeDao from "../database/episode/episode-dao.js";
import * as likeDao from "../database/like/like-dao.js";
import * as commentDao from "../database/comment/comment-dao.js";


const createPost = async (req, res) => {
    const postBody = req.body;
    const type = postBody.type;
    const post_id = postBody.post_id;

    console.log(postBody);
    console.log("ATTEMPTING TO CREATE POSTS...");

    // check to see if post with given id already exists
    // if not, insert into appropriate dao here
    switch (type) {
        case 'album':
            console.log("looking within album...");
            const album = await albumDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED album posts");
            console.log(album);

            if (album === null) {
                await albumDao.createPost(postBody);
            }
            break;
        case 'artist':
            console.log("looking within artist...");
            const artist = await artistDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED artist posts");
            console.log(artist);

            if (artist === null) {
                await artistDao.createPost(postBody);
            }
            break;
        case 'playlist':
            console.log("looking within playlist...");
            const playlist = await playlistDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED playlist posts");
            console.log(playlist);

            if (playlist === null) {
                await playlistDao.createPost(postBody);
            }
            break;
        case 'track':
            console.log("looking within track...");
            const track = await trackDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED track posts");
            console.log(track);

            if (track === null) {
                await trackDao.createPost(postBody);
            }
            break;
        case 'show':
            console.log("looking within show...");
            const show = await showDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED show posts");
            console.log(show);

            if (show === null) {
                await showDao.createPost(postBody);
            }
            break;
        case 'episode':
            console.log("looking within episode...");
            const episode = await episodeDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED episode posts");
            console.log(episode);

            if (episode === null) {
                await episodeDao.createPost(postBody);
            }
    }
    res.sendStatus(200);
}

const getPost = async (req, res) => {

    const post_type = req.params.type;
    const post_id = req.params.post_id;

    let result = {}

    // get post here using id
    switch (post_type) {
        case 'album':
            console.log("looking within album...");
            result = await albumDao.getPost(post_id);
            // get likes
            // get comments
            break;
        case 'artist':
            console.log("looking within artist...");
            result = await artistDao.getPost(post_id);
            break;
        case 'playlist':
            console.log("looking within playlist...");
            result = await playlistDao.getPost(post_id);
            break;
        case 'track':
            console.log("looking within track...");
            result = await trackDao.getPost(post_id);
            break;
        case 'show':
            console.log("looking within show...");
            result = await showDao.getPost(post_id);
            break;
        case 'episode':
            console.log("looking within episode...");
            result = await episodeDao.getPost(post_id);
    }

    console.log(result)

    if (result !== null) {
        const likes = await likeDao.getLikesByPost(post_id);
        const comments = await commentDao.getCommentsByPost(post_id);
        result = {
            ...result._doc,
            likes,
            comments,
            status: "ok"
        }
        res.json(result);
    } else {
        res.json({status: "fail"});
    }
}

const postController = (app) => {
    app.post('/post', createPost);
    app.get('/post/:type/:post_id', getPost);
}

export default postController;