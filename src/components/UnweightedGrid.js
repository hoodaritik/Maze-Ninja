import React, { useEffect, useState } from 'react'
import '../styles/Grid.css'
import bfsGraph from '../algorithms/unweighted/bfs'
import dfsGraph from '../algorithms/unweighted/dfs'
import DjikstraGraph from '../algorithms/weighted/djikstra'
import AstarGraph from '../algorithms/weighted/astar'

function Grid({ grid }) {
    const [isMouseDown, setMouseDown] = useState(false);

    function markWallOnGrid(id) {
        document.getElementById(id).classList.add('wall');
    }

    function cellMouseDownHandler(id) {
        setMouseDown(true);
        let [i, j] = [parseInt(id.split('_')[0]), parseInt(id.split('_')[1])]
        grid[i][j].isWall = true;
        markWallOnGrid(id);
    }

    function cellMouseUpHandler() {
        setMouseDown(false);
    }

    function cellMouseEnterHandler(id) {
        if (isMouseDown) {
            let [i, j] = [parseInt(id.split('_')[0]), parseInt(id.split('_')[1])]
            grid[i][j].isWall = true;
            markWallOnGrid(id);
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
        let bfsGrid = new bfsGraph('2_2', '7_7', grid);
        let { path, exploredNodes } = bfsGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    function simulateDFS() {
        let dfsGrid = new dfsGraph('2_2', '7_7', grid);
        let { path, exploredNodes } = dfsGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    function simulateDjikstra() {
        let djikstraGrid = new DjikstraGraph('2_2', '7_7', grid);
        let { path, exploredNodes } = djikstraGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    function simulateAstar() {
        let astarGrid = new AstarGraph('2_2', '7_7', grid);
        let { exploredNodes, path } = astarGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    useEffect(() => {
        document.addEventListener('mouseup', () => {
            setMouseDown(false);
        })
    }, [])

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
