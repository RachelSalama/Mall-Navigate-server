const util = require('util');

function* dijkstra(matrix, start, targets) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function is_valid(x, y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }

    function neighbors(x, y) {
        const result = [];
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (is_valid(nx, ny) && matrix[nx][ny] === 0) {
                result.push([nx, ny]);
            }
        }
        return result;
    }

    function heuristic(a, b) {
        if (!a || !b || a.length !== 2 || b.length !== 2) {
            return Infinity;
        }
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }

    const priorityQueue = [{ priority: 0, item: start, path: [start] }];

    function enqueue(priority, item, path) {
        priorityQueue.push({ priority, item, path });
        priorityQueue.sort((a, b) => a.priority - b.priority);
    }

    function dequeue() {
        return priorityQueue.shift();
    }

    const visited = new Set();

    while (priorityQueue.length > 0) {
        const { item: current, path } = dequeue();

        if (!current || visited.has(current.toString())) {
            continue;
        }

        visited.add(current.toString());

        if (targets.some(target => target.toString() === current.toString())) {
            const targetIndex = targets.findIndex(target => target.toString() === current.toString());
            targets.splice(targetIndex, 1);
            yield { target: current, path };
        }

        const [x, y] = current;
        for (const neighbor of neighbors(x, y)) {
            const neighborPriority = path.length + heuristic(neighbor, targets[0]);
            const neighborPath = [...path, neighbor];
            enqueue(neighborPriority, neighbor, neighborPath);
        }
    }
}

function printPath(target, path) {
    console.log(`Move to target ${target} - Path: ${path.map(coord => `[${coord.join(', ')}]`).join(' -> ')}`);
}

module.exports = { dijkstra, printPath };

