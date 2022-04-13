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

const likeController = (app) => {
    app.post('/comment/like', likeContent);
    app.delete('/comment/like/:like_id', unlikeContent);
}

export default likeController;