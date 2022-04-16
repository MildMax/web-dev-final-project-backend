import * as commentDao from "../database/comment/comment-dao.js";

const addComment = async (req, res) => {

    const commentBody = req.body;
    commentBody.timestamp = Date.now()
    // put into schema here
    const comment = await commentDao.addComment(commentBody);

    // get new comment Id here
    const comment_id = comment.id;

    res.json({comment_id});

}

const deleteComment = async (req, res) => {
    const comment_id = req.params.comment_id;
    // do delete here
    const status = await commentDao.deleteComment(comment_id);
    res.send(status);


    res.sendStatus(200);
}

const getComments = async (req, res) => {
    const post_id = req.params.post_id;

    // find all comments on a post, sort, send back as an array
    const comments = await commentDao.getCommentsByPost(post_id);

    console.log("SUCCESSFULLY GRABBED COMMENTS");
    console.log(comments);

    res.json({comments})
}

const commentController = (app) => {
    app.post('/comment', addComment);
    app.delete('/comment/:comment_id', deleteComment);
    app.get('/comment/:post_id', getComments);
}

export default commentController;