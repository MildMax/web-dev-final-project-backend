const likeContent = (req, res) => {
    const likeBody = req.body;
    likeBody.timestamp = Date.now();

    // put into schema here

    // get new like Id here
    const like_id = "123";

    res.json({like_id});

}

const unlikeContent = (req, res) => {

    const like_id = req.params.like_id;

    // do delete here

    res.sendStatus(200);

}

const getLikes = (req, res) => {
    const post_id = req.params.post_id;

    // find likes for the post
    const likes = [];

    res.json({likes});
}

const likeController = (app) => {
    app.post('/content/like', likeContent);
    app.delete('/content/like/:like_id', unlikeContent);
    app.get('/content/like/:post_id', getLikes)
}

export default likeController;