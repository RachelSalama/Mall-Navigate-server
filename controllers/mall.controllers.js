const { Mall } = require("../models/Mall.model");


exports.getMalls = async (req, res, next) => {
    const malls = await Mall.find({});
    res.send(malls);
};

exports.getMallById = async (req, res, next) => {
    const { id } = req.params;
    console.log({id});
    const mall = await Mall.find({id});
    console.log(await mall);
    res.send(mall);
};


exports.postMall = async (req, res, next) => {
    const body = req.body;
    const owner_id = res.locals.place_id;
    try {
        if (owner_id != body.ownerId) throw new Error("wrong owner");
        const newMall = new Mall(body);
        newMall.id = newMall._id;
        await newMall.save();
        res.status(201).send(newMall);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

