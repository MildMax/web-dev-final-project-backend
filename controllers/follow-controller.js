import * as followDao from "../database/follow/follow-dao.js";

const addFollow = async (req, res) => {
    const data = req.body;

    console.log(data)

    const follower_id = data.follower_id;
    const follower_name = data.follower_name;
    const followee_id = data.followee_id;
    const followee_name = data.followee_name;

    await followDao.addFollow(follower_id, follower_name, followee_id, followee_name);

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