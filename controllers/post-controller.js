import * as albumDao from "../database/album/album-dao.js";
import * as artistDao from "../database/artist/artist-dao.js";
import * as playlistDao from "../database/playlist/playlist-dao.js";
import * as trackDao from "../database/track/track-dao.js";
import * as showDao from "../database/show/show-dao.js";
import * as episodeDao from "../database/episode/episode-dao.js";


const createPost = async (req, res) => {
    const postBody = req.body;
    const type = postBody.type;

    console.log(postBody);
    console.log("ATTEMPTING TO GRAB POSTS...");

    // check to see if post with given id already exists
    // if not, insert into appropriate dao here
    switch (type) {
        case 'album':
            console.log("looking within album...");
            const album = await albumDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED album posts");
            console.log(album);

            if (album === null) {
                const newAlbum = albumDao.createPost(post_id);
                res.json({newAlbum})
            }
        case 'artist':
            console.log("looking within artist...");
            const artist = await artistDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED artist posts");
            console.log(artist);

            if (artist === null) {
                const newArtist = artistDao.createPost(post_id);
                res.json({newArtist})
            }
        case 'playlist':
            console.log("looking within playlist...");
            const playlist = await playlistDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED playlist posts");
            console.log(playlist);

            if (playlist === null) {
                const newPlaylist = playlistDao.createPost(post_id);
                res.json({newPlaylist})
            }
        case 'track':
            console.log("looking within track...");
            const track = await trackDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED track posts");
            console.log(track);

            if (track === null) {
                const newTrack = trackDao.createPost(post_id);
                res.json({newTrack})
            }
        case 'show':
            console.log("looking within show...");
            const show = await showDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED show posts");
            console.log(show);

            if (show === null) {
                const newShow = showDao.createPost(post_id);
                res.json({newShow})
            }
        case 'episode':
            console.log("looking within episode...");
            const episode = await episodeDao.getPost(post_id);
            console.log("SUCCESSFULLY GRABBED episode posts");
            console.log(episode);

            if (episode === null) {
                const newEpisode = episodeDao.createPost(post_id);
                res.json({newEpisode})
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
        case 'artist':
            console.log("looking within artist...");
            result = await artistDao.getPost(post_id);
        case 'playlist':
            console.log("looking within playlist...");
            result = await playlistDao.getPost(post_id);
        case 'track':
            console.log("looking within track...");
            result = await trackDao.getPost(post_id);
        case 'show':
            console.log("looking within show...");
            result = await showDao.getPost(post_id);
        case 'episode':
            console.log("looking within episode...");
            result = await episodeDao.getPost(post_id);
    }

    res.json(result);
}

const postController = (app) => {
    app.post('/post', createPost);
    app.get('/post/:type/:post_id', getPost);
}

export default postController;