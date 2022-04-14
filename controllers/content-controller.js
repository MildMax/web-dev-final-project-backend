import * as followDao from "../database/follow/follow-dao.js";

const getAnonymousContent = (req, res) => {

    // use comment/ like DAO's to find most recent posts, select ~20, and return content

    // collect post ids and content type from comment/like daos
    // if content type of like is comment, ignore
    const post_ids = [];

    // collect posts from appropriate dao (probably via switch on "type" from like/content
    const posts = [];

    res.json({posts});

}

const getNonAnonymousContent = async (req, res) => {

    const user_id = req.params.user_id;

    // aggregate posts with post_ids and content_type
    const post_ids = [];

    // use follow dao to find users that the given user is following and select the most recent 5 likes/
    // comments for that user
    const following = await followDao.getFollowing(user_id);

    for (const f of following) {
        const id = f.followee_id;
        // search comments
        // search users
        // aggregate top 5
    }

    // use comment/like dao's to find most recent posts by user, select min(~20, 20 - len(

    // if still less than 20 posts, use logic from getAnonymousContent to fill remainder of posts
    // good for cases when user is brand new

    // find posts
    const posts = []

    res.json({posts});
}

const contentController = (app) => {
    app.get('/content', getAnonymousContent);
    app.get('/content/:user_id', getNonAnonymousContent);
}

export default contentController;