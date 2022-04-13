import * as followDao from "../database/follow/follow-dao.js";

const addFollow = async (req, res) => {
    const data = req.body;

    const follower_id = data.follower_id;
    const followee_id = data.followee_id;

    console.log(follower_id)
    console.log(followee_id)

    await followDao.addFollow(follower_id, followee_id);

    res.sendStatus(200);
}

const removeFollow = async (req, res) => {
    const data = req.body;

    console.log(data)

    const follower_id = data.follower_id;
    const followee_id = data.followee_id;

    await followDao.removeFollow(follower_id, followee_id);

    res.sendStatus(200);
}

const followController = (app) => {
    app.post('/profile/follow', addFollow);
    app.delete('/profile/follow', removeFollow)
}

export default followController;