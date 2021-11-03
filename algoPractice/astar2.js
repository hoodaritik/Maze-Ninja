class NodeElement {

    constructor(row, col, difficulty, isWall, aStarInstance) {
        this.row = row
        this.col = col
        this.wall = isWall
        this.difficulty = difficulty
        this.through = ''
        this.heuristic = Infinity
        this.eucledianDistance = Infinity
        this.difficultySums = ''
        this.aStar = aStarInstance
        this.neighbours = []
    }



    heuristicCalculation(node) {
        this.eucledianDistance = this.aStar.eucledianDistance(this)
        let difficultySums
        difficultySums = this.difficulty + Number(node.difficultySums)
        if (this.difficultySums === '') {
            this.difficultySums = difficultySums
            this.through = node
        } else if (this.difficultySums > difficultySums) {
            this.difficultySums = difficultySums
            this.through = node
        } else {

        }


        return this.heuristic = this.eucledianDistance + this.difficultySums
    }

    neighboursCalculation(openQueue) {
        let neighbours = []
        let enqueuedNode
        let newNode

        if (this.row < this.aStar.rows - 1) {
            enqueuedNode = openQueue.find(node => node.row === this.row + 1 && node.col === this.col)
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row + 1 && node.col === this.col))
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this)
                    neighbours.push(newNode)
                }
            } else {
                enqueuedNode.heuristicCalculation(this)
            }
        }
        if (this.col < this.aStar.columns - 1) {
            enqueuedNode = openQueue.find(node => node.row === this.row && node.col === this.col + 1)
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row && node.col === this.col + 1))
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this)
                    neighbours.push(newNode)
                }
            } else {
                enqueuedNode.heuristicCalculation(this)
            }
        }
        if (this.row > 0) {
            enqueuedNode = openQueue.find(node => node.row === this.row - 1 && node.col === this.col)
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row - 1 && node.col === this.col))
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this)
                    neighbours.push(newNode)
                }
            } else {
                enqueuedNode.heuristicCalculation(this)
            }
        }
        if (this.col > 0) {
            enqueuedNode = openQueue.find(node => node.row === this.row && node.col === this.col - 1)
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row && node.col === this.col - 1))
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this)
                    neighbours.push(newNode)
                }
            } else {
                enqueuedNode.heuristicCalculation(this)
            }
        }
        return neighbours

    }
}

class AStar {

    constructor(start, end, grid) {
        this.grid = grid
        this.rows = this.grid.length
        this.columns = this.grid[0].length
        this.nodes = []
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (i === start[0] && j === start[1]) {
                    this.start = new NodeElement(i, j, grid[i][j].difficulty, grid[i][j].wall, this)
                    this.nodes.push(this.start)
                } else if (i === end[0] && j === end[1]) {
                    this.end = new NodeElement(i, j, grid[i][j].difficulty, grid[i][j].wall, this)
                    this.nodes.push(this.end)
                } else {
                    this.nodes.push(new NodeElement(i, j, grid[i][j].difficulty, grid[i][j].wall, this))
                }
            }
        }
        this.openQueue = [this.start]
        this.alreadyChecked = []

        this.optimalPath = []
    }

    startAlgorithm() {
        this.openQueue[0].heuristicCalculation(this.openQueue[0])

        while (this.openQueue.length > 0) {
            if (this.openQueue[0] === this.end) {
                break
            }
            let neighbours = this.openQueue[0].neighboursCalculation(this.openQueue)
            let queue = this.openQueue
            this.alreadyChecked.push(queue.shift())
            let newQueue = queue.concat(neighbours)
            let sortedNeighbours = newQueue.sort(function (a, b) { return a.heuristic - b.heuristic })
            this.openQueue = sortedNeighbours
        }
        if (this.openQueue.length !== 0) { this.retrieveOptimalPath(this.openQueue[0]) }
    }


    retrieveOptimalPath(node) {
        this.optimalPath.push(node)
        if (node.through !== this.start) {
            this.retrieveOptimalPath(node.through)
        } else {
            this.optimalPath.push(this.start)
        }
    }



    eucledianDistance(node) {
        return Math.sqrt(Math.pow(Math.abs(node.row - this.end.row), 2) + Math.pow(Math.abs(node.col - this.end.col), 2))
    }

}

let grid = [];
let rows = 25
let columns = 25
let start = `${Math.floor(rows/2)}_${Math.floor(columns/3)}`;
let end = `${Math.floor(rows/2)}_${Math.floor(2*columns/3)}`;

for(let i = 0; i < rows; i++) {
    grid.push([]);
    for(let j = 0; j < columns; j++) {
        grid[i].push({
            difficulty: 1,
            wall: false
        })
    }
}

let aStarInstance = new AStar([12,13],[12,24],grid);
console.log(aStarInstance.optimalPath);  