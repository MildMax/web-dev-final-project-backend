const createPost = (req, res) => {
    const postBody = req.body;
    const type = postBody.type;

    // check to see if post with given id already exists


    // if not, insert into appropriate dao here

    res.sendStatus(200);
}

const getPost = (req, res) => {

    const post_id = req.params.post_id;

    // get post here using id
    const result = {}

    res.json(result);
}

const postController = (app) => {
    app.post('/post');
    app.get('/post/:post_id');
}

export default postController;