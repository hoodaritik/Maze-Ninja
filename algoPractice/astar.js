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

        if (this.row < this.aStar.matrixLength - 1) {
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
        if (this.col < this.aStar.matrixLength - 1) {
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
        this.matrixLength = this.grid.length
        this.nodes = []
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (i === start[0] && j === start[1]) {
                    this.start = new NodeElement(i, j, grid[i][j].weight, grid[i][j].isWall, this)
                    this.nodes.push(this.start)
                } else if (i === end[0] && j === end[1]) {
                    this.end = new NodeElement(i, j, grid[i][j].weight, grid[i][j].isWall, this)
                    this.nodes.push(this.end)
                } else {
                    this.nodes.push(new NodeElement(i, j, grid[i][j].weight, grid[i][j].isWall, this))
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

const objArr = weightArr.map(row => {
    return row.map(weight => {
        return {
            weight,
            isWall: false
        }
    })
})

let a = new AStar([0,0],[9,9],objArr)
a.startAlgorithm()
let optimalPath = a.optimalPath
let alreadyChecked = a.alreadyChecked
let path = optimalPath.map(node => {return `${node.row}_${node.col}`})
let exploredNodes = alreadyChecked.map(node => {return `${node.row}_${node.col}`})
path.reverse();
console.log(path, exploredNodes);
