import React, { useEffect, useState } from 'react'
import '../styles/Grid.css'
import bfsGraph from '../algorithms/unweighted/bfs'

function Grid({ grid }) {
    // let isMouseDown = false;
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
        }, 50);
    }

    function simulateBFS() {
        let bfsGrid = new bfsGraph('0_0', '7_7', grid);
        let { path, exploredNodes } = bfsGrid.startAlgorithm();
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
                <button>Simulate DFS</button>
                <button>Simulate Djikstra</button>
                <button>Simulate A*</button>
            </div>
        </div>
    )
}

export default Grid
