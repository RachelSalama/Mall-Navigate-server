const { Map } = require("../models/map.model");

exports.getMaps = async (req, res, next) => {
    const maps = await Map.find({});
    res.send(maps);
};


exports.getMapsByPlaceId = async (req, res, next) => {
    const { params } = req;
    const toys = await Toy.find({ place_id: params.id });
    res.send(toys);
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