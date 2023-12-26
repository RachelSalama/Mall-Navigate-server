const { Map } = require("../models/map.model");

exports.getMaps = async (req, res, next) => {
    const maps = await Map.find({});
    res.send(maps);
};


exports.getMapsByPlaceId = async (req, res, next) => {
    const { params } = req;
    const maps = await Map.find({ place_id: params.id });
    res.send(maps);
};


exports.postMap = async (req, res, next) => {
    const body = req.body;
    const place_id = res.locals.place_id;
    try {
        const newMap = new Map(body);
        newMap.place_id = place_id;
        newMap.id = newMap._id;
        await newMap.save();
        res.status(201).send(newMap);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};