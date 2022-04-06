import * as followDao from "../database/follow/follow-dao.js";

const addFollow = async (req, res) => {
    const follower_id = req.params.follower;
    const followee_id = req.params.followee;

    await followDao.addFollow(follower_id, followee_id);

    res.sendStatus(200);
}

const removeFollow = async (req, res) => {
    const follower_id = req.params.follower;
    const followee_id = req.params.followee;

    await followDao.removeFollow(follower_id, followee_id);

    res.sendStatus(200);
}

const followController = (app) => {
    app.post('/profile/:followee/follow/:follower', addFollow);
    app.delete('/profile/:followee/follow/:follower', removeFollow)
}

export default followController;