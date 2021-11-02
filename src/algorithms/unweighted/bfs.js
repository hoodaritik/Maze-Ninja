class Node {
    constructor(cellData) {
        this.isWall = cellData.isWall;
    }
}

class Graph {
    constructor(start, end, cellArr) {
        this.rows = cellArr.length;
        this.columns = cellArr[0].length;
        this.matrix = {};
        this.start = start;
        this.end = end;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[`${i}_${j}`] = new Node(cellArr[i][j]);
            }
        }
    }

    getChildren(node) {
        let [i_str, j_str] = node.split('_');
        let i = parseInt(i_str);
        let j = parseInt(j_str);

        let children = [];
        let di_dj_arr = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        di_dj_arr.forEach(([di, dj]) => {
            if (i + di >= 0 && j + dj >= 0 && i + di < this.rows && j + dj < this.columns && !this.matrix[`${i + di}_${j + dj}`].isWall) children.push(`${i + di}_${j + dj}`);
        })

        return children;
    }

    startAlgorithm() {
        let visited = [];
        let parents = {};
        let found = false;

        let pendingNodes = [];
        pendingNodes.push(this.start);
        parents[this.start] = null;

        while(pendingNodes.length) {
            let currNode = pendingNodes[0];
            
            if(currNode === this.end) {
                visited.push(this.end);
                found = true;
                break;
            }

            let children = this.getChildren(currNode);

            let unvisitedChildren = children.filter(child => !visited.includes(child));

            for(let i = 0; i < unvisitedChildren.length; i++) {
                parents[unvisitedChildren[i]] = currNode;
                if(!pendingNodes.includes(unvisitedChildren[i])) pendingNodes.push(unvisitedChildren[i]);
            }

            visited.push(currNode);
            pendingNodes.shift();
        }

        if(!found) {
            return {
                exploredNodes: visited,
                path: [],
                found
            }
        }

        let path = [this.end];
        let parent = parents[this.end];
        while(parent) {
            path.push(parent);
            parent = parents[parent];
        }

        path.reverse();

        return {
            exploredNodes: visited,
            path,
            found
        }
    }
}

export default Graph;