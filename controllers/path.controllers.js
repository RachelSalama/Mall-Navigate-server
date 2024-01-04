const { Mall } = require("../models/Mall.model");
const { Store } = require("../models/Store.model");
const { Map } = require("../models/map.model");
const { dijkstraWithPath, getStoresInPath } = require("../utils/calculatePath");



exports.getPath = async (req, res, next) => {
  const body = req.body;
  console.log(body);
  const maps = await Map.findOne({ place_id: body.mall.id });
  // const matrix = initializeMatrix(maps.mallMap);
  const matrix = maps.mallMap;
  console.log("matrix:", matrix);
  const storeArr = body.stores;
  let storePathArr = await Promise.all(storeArr.map(async (store) => {
    return await Store.findOne({ name: store.name, place_id: body.mall.id });
  }));
  let targets = storePathArr.map(target => { return [target.doorCord.row, target.doorCord.col] })
  console.log("targets:" + targets[0]);
  let start = [body.startPoint.doorCord.row, body.startPoint.doorCord.col]
  console.log("start:" + start);
  let optimalPath = [];
  while (targets.length > 0) {
    const path = dijkstraWithPath(matrix, start, targets);
    if (path) {
      console.log("Path to the closest target:", path);
      optimalPath = [...optimalPath, ...path];
      console.log("Total Path:", optimalPath);
    } else {
      console.log("No path found to any target");
      return;
    }
    start = path[path.length - 1];
    targets = targets.filter(target => target.toString() !== start.toString());
    console.log(targets);
  }
  console.log(optimalPath)
  storePathArr = getStoresInPath(optimalPath, storePathArr)
  console.log("storePathArr:", storePathArr);
  res.setHeader('Content-Type', 'application/json');
  res.send({ path: optimalPath, mat: matrix, storePathArr: storePathArr });
}
