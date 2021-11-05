class grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];

        for (let i = 0; i < rows; i++) {
            this.matrix.push([]);
            for (let j = 0; j < columns; j++) {
                this.matrix[i].push({
                    weight: 1,
                    isWall: false
                })
            }
        }
    }

    dehash(cell) {
        let [i_str, j_str] = cell.split('_');
        return [parseInt(i_str), parseInt(j_str)];
    }

    getNeighbours(cell, visited) {
        let [i, j] = this.dehash(cell);
        let di_dj_Arr = [[0, 1], [1, 0]];

        let neighbours = [];

        di_dj_Arr.forEach(([di, dj]) => {
            if (i + di >= 0 && j + dj >= 0 && i + di < this.rows && j + dj < this.columns)
                neighbours.push(`${i + di}_${j + dj}`);
        })

        return neighbours;
    }

    constructMaze_helper(cell, visited) {
        visited.push(cell);
        let neighbours = this.getNeighbours(cell);

        if(neighbours.length === 1) this.constructMaze_helper(neighbours[0], visited);
        else if(neighbours.length === 2) {
            let randomNumber = Math.random();
            if(randomNumber <= 0.5) this.constructMaze_helper(neighbours[0], visited);
            else this.constructMaze_helper(neighbours[1], visited);
        }
    }

    constructMaze() {
        let start = '0_0';
        let output = [];
        this.constructMaze_helper(start, output);
        return output;
    }
}

export default grid;