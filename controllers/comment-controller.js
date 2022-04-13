const addComment = (req, res) => {

    const commentBody = req.body;
    commentBody.timestamp = Date.now()

    // put into schema here

    // get new comment Id here
    const comment_id = "123";

    res.json({comment_id});

}

const deleteComment = (req, res) => {
    const id = req.params.comment_id;

    // do delete here

    res.sendStatus(200);


}

const commentController = (app) => {
    app.post('/comment', addComment);
    app.delete('/comment/:comment_id', deleteComment)
}

export default commentController;