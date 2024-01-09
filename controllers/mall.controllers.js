const { Mall } = require("../models/Mall.model");


exports.getMalls = async (req, res, next) => {
console.log("delete");

    const malls = await Mall.find({});
    res.send(malls);
};

exports.getMallById = async (req, res, next) => {
    const { id } = req.params;
    console.log({ id });
    const mall = await Mall.find({ id });
    console.log(await mall);
    res.send(mall);
};


exports.postMall = async (req, res, next) => {

    const body = req.body;
    const owner_id = res.locals.place_id;
    try {
        const newMall = new Mall(body);
        newMall.id = newMall._id;
        newMall.ownerId = owner_id;
        await newMall.save();
        res.status(201).send(newMall);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.deleteMall = async (req, res) => {
    // const mallId = req.params.id;
console.log("delete");

    // try   {

        let data = await Mall.deleteOne({ _id: req.params.id })
        //if success -n=1
        res.json(data)

        console.log(req)
        // if (data.n === 1) {
        //     console.log("Mall deleted successfully");
        //     return res.json({ message: 'Mall deleted successfully' });
        // } else {
        //     console.log("Mall not found ");

        //     return res.status(404).json({ message: 'Mall not found' });
        // }
  
}
