import React, { useEffect, useState } from 'react'
import '../styles/Grid.css'
import DjikstraGraph from '../algorithms/weighted/djikstra'
import AstarGraph from '../algorithms/weighted/astar'

function Grid({ rows, columns, range }) {
    let grid = [];

    for(let i = 0; i < rows; i++) {
        grid.push([]);
        for(let j = 0; j < columns; j++) {
            grid[i].push({
                weight: Math.floor(Math.random() * range),
                isWall: false
            })
        }
    }

    let isMouseDown = false;
    
    function setMouseDown(val) {
        isMouseDown = val;
    }

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

    function simulateDjikstra() {
        let djikstraGrid = new DjikstraGraph('0_0', '9_9', grid);
        let { path, exploredNodes } = djikstraGrid.startAlgorithm();
        markCellSequence(exploredNodes, path, 'visited');
    }

    function simulateAstar() {
        let astarGrid = new AstarGraph('0_0', '9_9', grid);
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
                                        {grid[row_index][column_index].weight}
                                    </div>
                                })
                            }
                        </div>
                    )
                })
            }

            <div className="actions-btns">
                <button onClick={simulateDjikstra}>Simulate Djikstra</button>
                <button onClick={simulateAstar}>Simulate A*</button>
            </div>
        </div>
    )
}

export default Grid
