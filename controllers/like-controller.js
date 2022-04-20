import * as likeDao from "../database/like/like-dao.js";

const likeContent = async (req, res) => {
    const likeBody = req.body;
    likeBody.timestamp = Date.now();

    // put into schema here
    const like = await likeDao.likeContent(likeBody);

    // get new like Id here
    const like_id = like.id;

    res.json({like_id});

}

const unlikeContent = async (req, res) => {

    const like_id = req.params.like_id;

    // do delete here
    const status = await likeDao.unlikeContent(like_id);

    res.send(status);

}

const getLikes = async (req, res) => {
    const post_id = req.params.post_id;

    console.log("attempting to grab likes...");
    // find likes for the post
    const likes = await likeDao.getLikesByPost(post_id);

    console.log("successfully grabbed likes");
    console.log(likes);
    res.json({likes});
}

const likeController = (app) => {
    app.post('/content/like', likeContent);
    app.delete('/content/like/:like_id', unlikeContent);
    app.get('/content/like/:post_id', getLikes)
}

export default likeController;