import React, { useEffect } from 'react'
import '../styles/Grid.css'
import bfsGraph from '../algorithms/unweighted/bfs'
import dfsGraph from '../algorithms/unweighted/dfs'
import DjikstraGraph from '../algorithms/weighted/djikstra'
import AstarGraph from '../algorithms/weighted/astar'

function Grid({ rows, columns }) {
    let grid = [];
    let start = `${Math.floor(rows / 2)}_${Math.floor(columns / 3)}`;
    let end = `${Math.floor(rows / 2)}_${Math.floor(2 * columns / 3)}`;

    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < columns; j++) {
            grid[i].push({
                weight: 1,
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
        setMouseDown("", false);
    }

    function cellMouseEnterHandler(id) {
        if (isMouseDown) {
            let [i, j] = [parseInt(id.split('_')[0]), parseInt(id.split('_')[1])]
            grid[i][j].isWall = true;
            markWallOnGrid(id);
        }

        if (isMouseDowninStartPoint) {
            document.getElementById(start).innerText = "";
            start = id;
            document.getElementById(start).innerText = "S";
        }

        if (isMouseDowninEndPoint) {
            document.getElementById(end).innerText = "";
            end = id;
            document.getElementById(end).innerText = "E";
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

    function simulateBFS() {
        let bfsGrid = new bfsGraph(start, end, grid);
        let { path, exploredNodes } = bfsGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    function simulateDFS() {
        let dfsGrid = new dfsGraph(start, end, grid);
        let { path, exploredNodes } = dfsGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    function simulateDjikstra() {
        let djikstraGrid = new DjikstraGraph(start, end, grid);
        let { path, exploredNodes } = djikstraGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
        console.log(path);
    }

    function simulateAstar() {
        let astarGrid = new AstarGraph(start, end, grid);
        let { exploredNodes, path } = astarGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
        console.log(exploredNodes);
    }

    function markEndPoints() {
        document.getElementById(start).innerText = "S"
        document.getElementById(end).innerText = "E"
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
    })

    return (
        <div>
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
                                        key={column_index}
                                    >
                                    </div>
                                })
                            }
                        </div>
                    )
                })
            }

            <div className="actions-btns">
                <button onClick={simulateBFS}>Simulate BFS</button>
                <button onClick={simulateDFS}>Simulate DFS</button>
                <button onClick={simulateDjikstra}>Simulate Djikstra</button>
                <button onClick={simulateAstar}>Simulate A*</button>
            </div>
        </div>
    )
}

export default Grid
