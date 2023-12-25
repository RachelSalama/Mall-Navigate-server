const { Mall } = require("../models/Mall.model");


exports.getMalls = async (req, res, next) => {
    const malls = await Mall.find({});
    res.send(malls);
};

exports.getMallById = async (req, res, next) => {
    const { params } = req;
    const mall = await Mall.find({ id: params.id });
    res.send(mall);
};


exports.postMall = async (req, res, next) => {
    const body = req.body;
    try {
        const newMall = new Mall(body);
        await newMall.save();
        res.status(201).send(newMall);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

