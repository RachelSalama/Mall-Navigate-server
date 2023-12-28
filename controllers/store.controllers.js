const { Store } = require("../models/Store.model");

exports.getStores = async (req, res, next) => {
    const stores = await Store.find({});
    res.send(stores);
};


exports.getStoresByPlaceId = async (req, res, next) => {
    const { params } = req;
    const stores = await Store.find({ place_id: params.id });
    res.send(stores);
};


exports.postStore = async (req, res, next) => {
    const bodyarr = req.body;//shopArray{}
    bodyarr.map(async(body) => {
        try {
            const newStore = new Store(body);
            newStore.id = newStore._id;
            await newStore.save();
            res.status(201).send(newStore);
        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
    })
};