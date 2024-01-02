function dijkstraWithPath(matrix, start, targets) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // right, left, down, up

  function isValid(x, y) {
    return x >= 0 && x < rows && y >= 0 && y < cols && matrix[x][y].content === 0;
  }

  function calculateDistance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
  }

  const priorityQueue = [[0, start, [start]]]; // [distance, node, path]
  const visited = new Set();

  while (priorityQueue.length > 0) {
    const [distance, current, path] = priorityQueue.shift();

    if (visited.has(JSON.stringify(current))) {
      continue;
    }

    visited.add(JSON.stringify(current));

    if (targets.some(target => JSON.stringify(target) === JSON.stringify(current))) {
      return path; // return the path to the closest target
    }

    for (const [dx, dy] of directions) {
      const nextX = current[0] + dx;
      const nextY = current[1] + dy;

      if (isValid(nextX, nextY)) {
        const newDistance = distance + 1;
        const newPath = [...path, [nextX, nextY]];
        priorityQueue.push([newDistance, [nextX, nextY], newPath]);
      }
    }

    priorityQueue.sort((a, b) => a[0] - b[0]); // sort by distance
  }

  return null; // no path found
}


// function exampleUsageWithPath() {
//   const matrix = [
//     [0, 0, 0, 0, 1],
//     [0, 1, 1, 0, 0],
//     [0, 0, 1, 0, 1],
//     [0, 1, 0, 0, 0],
//     [0, 0, 0, 1, 0],
//   ];

//   let start = [0, 0];
//   let targets = [
//     [4, 4],
//     [2, 3],
//     [4, 2],
//     [4, 3],
//     [1, 1],
//     [2, 0]
//   ];

//   while (targets.length > 0) {
//     const path = dijkstraWithPath(matrix, start, targets);
//     if (path) {
//       console.log("Path to the closest target:", path);
//     } else {
//       console.log("No path found to any target");
//       return;
//     }  
//     start = path[path.length - 1];
//     targets = targets.filter(target => target.toString() !== start.toString());
//     console.log(targets);
//   }
// }



module.exports = { dijkstraWithPath };

