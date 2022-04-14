const addComment = (req, res) => {

    const commentBody = req.body;
    commentBody.timestamp = Date.now()

    // put into schema here

    // get new comment Id here
    const comment_id = "123";

    res.json({comment_id});

}

const deleteComment = (req, res) => {
    const comment_id = req.params.comment_id;

    // do delete here

    res.sendStatus(200);
}

const getComments = (req, res) => {
    const post_id = req.params.post_id;

    // find all comments on a post, sort, send back as an array
    const comments = []

    res.json({comments})
}

const commentController = (app) => {
    app.post('/comment', addComment);
    app.delete('/comment/:comment_id', deleteComment);
    app.get('/comment/:post_id', getComments);
}

export default commentController;