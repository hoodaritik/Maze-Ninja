const weightArr = [
    [0, 5, 11, 13, 16, 5, 4, 19, 10, 18],
    [16, 1, 6, 17, 2, 7, 1, 15, 16, 4],
    [4, 8, 11, 7, 11, 8, 4, 16, 11, 1],
    [1, 13, 3, 17, 11, 9, 14, 8, 3, 5],
    [3, 16, 11, 13, 1, 3, 12, 14, 12, 13],
    [1, 3, 5, 16, 7, 6, 15, 15, 14, 3],
    [12, 18, 4, 15, 16, 8, 16, 17, 4, 1],
    [12, 5, 15, 10, 9, 19, 18, 7, 4, 7],
    [17, 3, 14, 16, 5, 14, 3, 19, 4, 19],
    [2, 11, 18, 10, 19, 2, 19, 13, 19, 0]
]

class Node {
    constructor(weight, isWall) {
        this.weight = weight;
        this.isWall = false;
    }
}

class Graph {
    constructor(weightArr, walls) {
        this.matrix = {};
        this.rows = weightArr.length;
        this.columns = weightArr[0].length;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[`${i}_${j}`] = new Node(weightArr[i][j]);
            }
        }
    }

    setWalls(wallsArr) {
        for (let i = 0; i < wallsArr.length; i++) {
            let node = wallsArr[i];
            this.matrix[node].weight = Infinity;
            this.matrix[node].isWall = true;
        }
    }

    /* Djikstra methods */
    shortestDistanceNode(distances, visited) {
        let shortest = null;

        for (let node in distances) {
            let currentIsShortest = shortest === null || distances[shortest] > distances[node];

            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }

        return shortest;
    }

    getChildren(node) {
        let [i_str, j_str] = node.split('_');
        let i = parseInt(i_str);
        let j = parseInt(j_str);

        let children = [];
        let di_dj_arr = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        di_dj_arr.forEach(([di, dj]) => {
            if (i + di >= 0 && j + dj >= 0 && i + di < this.rows && j + dj < this.columns && !this.matrix[`${i+di}_${j+dj}`].isWall) children.push(`${i+di}_${j+dj}`);
        })

        return children;

    }

    startDjikstra(start, end) {
        let distances = {}; // { id(string): distance(number) }
        // distances[end] = Infinity;

        let startNodeChildren = this.getChildren(start);
        for(let i = 0; i < startNodeChildren.length; i++) {
            let child = startNodeChildren[i];
            distances[child] = this.matrix[child].weight;
        }

        // console.log(distances);

        let parents = {};
        // parents[end] = null;
        for(let i = 0; i < startNodeChildren.length; i++) {
            let child = startNodeChildren[i];
            parents[child] = start;
        }

        // console.log(parents);

        let visited = [];

        let currNode = this.shortestDistanceNode(distances, visited);

        // console.log(currNode);

        while(currNode) {
            let distance = distances[currNode];
            let children = this.getChildren(currNode);

            // console.log(distance, children);
            
            for(let i = 0; i < children.length; i++) {
                let child = children[i];
                if(child === start) continue;

                let newDistance = distance + this.matrix[child].weight;

                if(!distances[child] || distances[child] > newDistance) {
                    distances[child] = newDistance;
                    parents[child] = currNode;
                }
            }

            visited.push(currNode);
            currNode = this.shortestDistanceNode(distances, visited);
        }

        let shortestPath = [end];

        if(parents[end] === null) {
            return {
                path: [],
                exploredNodes: visited
            }
        }

        let parent = parents[end];
        while(parent) {
            shortestPath.push(parent);
            parent = parents[parent];
        }

        shortestPath.reverse();

        return {
            path: shortestPath,
            exploredNodes: visited
        }

    }
}

let g = new Graph(weightArr);
// let walls = ['2_0','2_1','2_2','1_2','0_2']
// g.setWalls(walls);
// console.log(g.getChildren('1_1'));
console.log(g.startDjikstra('1_1', '9_9'));
