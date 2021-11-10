import React, { useEffect } from 'react'
import '../styles/Grid.css'
import DjikstraGraph from '../algorithms/weighted/djikstra'
import AstarGraph from '../algorithms/weighted/astar'

function Grid({ rows, columns, range }) {
    let grid = [];
    let start = `${Math.floor(rows / 2)}_${Math.floor(columns / 3)}`;
    let end = `${Math.floor(rows / 2)}_${Math.floor(2 * columns / 3)}`;

    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < columns; j++) {
            grid[i].push({
                weight: Math.floor(Math.random() * range),
                isWall: false
            })
        }
    }

    let isMouseDown = false;
    let isMouseDowninStartPoint = false;
    let isMouseDowninEndPoint = false;

    function setMouseDown(cell_id, val) {
        if (val) {
            if (cell_id === start) isMouseDowninStartPoint = true;
            else if (cell_id === end) isMouseDowninEndPoint = true;
            else isMouseDown = true;
        } else {
            isMouseDown = false;
            isMouseDowninStartPoint = false;
            isMouseDowninEndPoint = false;
        }
    }

    function markWallOnGrid(id) {
        document.getElementById(id).classList.add('wall');
    }

    function cellMouseDownHandler(id) {
        setMouseDown(id, true);
        if (id !== start && id !== end) {
            let [i, j] = [parseInt(id.split('_')[0]), parseInt(id.split('_')[1])]
            grid[i][j].isWall = true;
            markWallOnGrid(id);
        }
    }

    function cellMouseUpHandler() {
        setMouseDown(false);
    }

    function cellMouseEnterHandler(id) {

        if (isMouseDown) {
            let [i, j] = [parseInt(id.split('_')[0]), parseInt(id.split('_')[1])];
            grid[i][j].isWall = true;
            markWallOnGrid(id);
        }


        if (isMouseDowninStartPoint) {
            let [i, j] = [parseInt(start.split('_')[0]), parseInt(start.split('_')[1])];
            document.getElementById(start).innerText = grid[i][j].weight;
            document.getElementById(start).classList.remove("start-point");
            start = id;
            document.getElementById(start).innerText = "S";
            document.getElementById(start).classList.add("start-point");
        }

        if (isMouseDowninEndPoint) {
            let [i, j] = [parseInt(end.split('_')[0]), parseInt(end.split('_')[1])];
            document.getElementById(end).innerText = grid[i][j].weight;
            document.getElementById(end).classList.remove("end-point");
            end = id;
            document.getElementById(end).innerText = "E";
            document.getElementById(end).classList.add("end-point");
        }
    }

    function markCellSequence(sequence, nextSequence, classType) {
        if (sequence === null) return;
        let i = 0;

        let interval = setInterval(() => {
            if (i === sequence.length) {
                clearInterval(interval);
                markCellSequence(nextSequence, null, 'path');
            } else {
                document.getElementById(sequence[i++]).classList.add(classType);
            }
        }, 10);
    }

    function markEndPoints() {
        document.getElementById(start).innerText = "S"
        document.getElementById(start).classList.add("start-point")
        document.getElementById(end).innerText = "E"
        document.getElementById(end).classList.add("end-point")
    }


    function simulateDjikstra() {
        let djikstraGrid = new DjikstraGraph(start, end, grid);
        let { path, exploredNodes } = djikstraGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    function simulateAstar() {
        let astarGrid = new AstarGraph(start, end, grid);
        let { exploredNodes, path } = astarGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    function clearTraversal() {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("visited");
            cell.classList.remove("path");
        })
    }

    useEffect(() => {
        document.addEventListener('mouseup', () => {
            setMouseDown("", false);
        })

        markEndPoints();

        return () => {
            document.removeEventListener('mouseup', () => {
                setMouseDown("", false);
            })
        }
    }, [])

    return (
        <div className="grid-top-container">
            <div className="grid-container">
                {
                    grid.map((row, row_index) => {
                        return (
                            <div className="row" key={row_index}>
                                {
                                    row.map((cell, column_index) => {
                                        let id = `${row_index}_${column_index}`;
                                        return <div
                                            className="cell"
                                            id={id}
                                            onMouseDown={() => cellMouseDownHandler(id)}
                                            onMouseUp={() => cellMouseUpHandler()}
                                            onMouseEnter={() => cellMouseEnterHandler(id)}
                                            style={{ backgroundColor: `rgba(50,255,200,${grid[row_index][column_index].weight/range})` }}
                                            key={column_index}
                                        >
                                            {grid[row_index][column_index].weight}
                                        </div>
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>

            <div className="action-btns">
                <h3>Run Algorithms</h3>
                <button onClick={simulateDjikstra}>Simulate Djikstra</button>
                <button onClick={simulateAstar}>Simulate A*</button>
                <button onClick={clearTraversal}>Clear Traversal</button>
            </div>
        </div>
    )
}

export default Grid
