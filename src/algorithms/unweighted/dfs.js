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

    dfs_helper(cell, visited, parents) {
        if (cell === this.end) {
            visited.push(this.end);
            return true;
        }

        visited.push(cell);

        let children = this.getChildren(cell);
        let unvisitedChildren = children.filter(child => !visited.includes(child));

        for (let i = 0; i < unvisitedChildren.length; i++) {
            parents[unvisitedChildren[i]] = cell;
            let found = this.dfs_helper(unvisitedChildren[i], visited, parents);
            if (found) return true;
        }

        return false;
    }

    startAlgorithm() {
        let visited = [];
        let parents = {};
        let found = this.dfs_helper(this.start, visited, parents);
        if(!found) return {
            found: false,
            exploredNodes: visited,
            path: []            
        }

        let path = [this.end];
        let parent = parents[this.end];
        while(parent) {
            path.push(parent);
            parent = parents[parent];
        }

        path.reverse();

        return { found, exploredNodes: visited, path };
    }
}

export default Graph;