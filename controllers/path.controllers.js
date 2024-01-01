const { Mall } = require("../models/Mall.model");
const { Store } = require("../models/Store.model");
const { Map } = require("../models/map.model");
const { dijkstraWithPath } = require("../utils/calculatePath");



exports.getPath = async (req, res, next) => {
  const body = req.body;
  console.log(body);
  const maps = await Map.findOne({ place_id: body.mall.id });
  // const matrix = initializeMatrix(maps.mallMap);
  const matrix = maps.mallMap;
  console.log("matrix:", matrix);
  const storeArr = body.stores;
  let targets = await Promise.all(storeArr.map(async (store) => {
    return await Store.findOne({ name: store.name, place_id: body.mall.id });
  }));
  targets = targets.map(target => { return [target.doorCord.row, target.doorCord.col] })
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
  res.setHeader('Content-Type', 'application/json');
  res.send({ path: optimalPath });
}

// function initializeMatrix(maps) {
//   // if (!Array.isArray(maps)) {
//   //   console.error('Invalid input. Expected an array.');
//   //   return null;
//   // }
//   console.log("maps initializeMatrix:"+maps);
//   console.log(maps.length);
//   const matrix = new Array(maps.length);

//   for (let i = 0; i < maps.length; i++) {
//     const mapElement = maps[i];

//     if (!Array.isArray(mapElement)) {
//       console.error(`Invalid element at index ${i}. Expected an array.`);
//       return null;
//     }

//     // Initialize a sub-array for each element
//     matrix[i] = new Array(mapElement.length);

//     for (let j = 0; j < mapElement.length; j++) {
//       const subArray = mapElement[j];

//       if (typeof subArray !== 'object' || !subArray.content) {
//         console.error(`Invalid sub-array at index ${i}.${j}. Expected an object with 'content' property.`);
//         return null;
//       }

//       // Extract the content property and assign it to the matrix
//       matrix[i][j] = subArray.content;
//     }
//   }

//   // Display the initialized matrix
//   console.log('Initialized Matrix:', matrix);
//   return matrix;
// }
