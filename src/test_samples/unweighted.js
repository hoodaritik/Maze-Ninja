const matrix = [ // 8 * 8 matrix && 1s are walls
    [0,0,0,0,0,0,0,0],
    [1,1,0,1,1,1,1,0],
    [0,1,0,0,1,1,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0],
    [0,1,0,0,0,1,0,0],
    [0,0,1,1,1,1,0,1],
    [1,1,1,0,0,0,0,0] // 7_3 must come
]

const objMatrix = matrix.map(row => {
    return row.map(cell => {
        return {
            isWall: cell === 1? false : false,
            weight: 1
        }
    })
})

export default objMatrix;