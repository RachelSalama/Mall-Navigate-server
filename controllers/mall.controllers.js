const { Mall } = require("../models/Mall.model");


exports.getMalls = async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
};

exports.getMallById = async (req, res, next) => {
    const { params } = req;
    const mall = await Mall.find({ id: params.id });
    res.send(mall);
};


exports.postMap = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.userId;
    try {
        const newMap = new Map(body);
        newMap.user_id = userId;
        newMap.id = newToy._id;
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

