import Djikstra from "../algorithms/djikstra.js";
import Astar from '../algorithms/astar.js'

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

let djikstraGraph = new Djikstra('0_0','9_9',objArr);
let djikstraResponse = djikstraGraph.startAlgorithm();

let astarGraph = new Astar('0_0','9_9',objArr);
let astarResponse = astarGraph.startAlgorithm()


// console.log([1,2] === [1,2]);
// console.log(djikstraResponse.path === astarResponse.path);

console.log(astarResponse.path, djikstraResponse.path);