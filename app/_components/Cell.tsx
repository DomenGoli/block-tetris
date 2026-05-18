import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
    commitBoard,
    selectShape,
    setIndex,
    setVirtualBoard,
} from "../_lib/redux/boardSlice";
import { useAppDispatch, useAppSelector } from "../_lib/redux/hooks";
import {  disableMulligan, enableMulligan, populatePool } from "../_lib/redux/choicesSlice";
import { getRandomShapes } from "../_lib/helper";
import {
    changeBoardColor,
    modifyCompletedColumns,
    modifyCompletedRows,
    isColumnComplete,
    isRowComplete,
    isSnapshotFreeSpace,
} from "../_lib/boardFunctions";
import { points } from "../_lib/pointsConfig";
import { addToScore, setIsGameOver, updateHighScore } from "../_lib/redux/gameSlice";

type CoordsType = {
    x: number;
    y: number;
};

// type ShapeType = {
//     name: string;
//     template: number[][];
// };

type CellProps = {
    coords: CoordsType;
    color: string;
    board: number[][];
    onSetBoard: Dispatch<SetStateAction<number[][]>>
}

function Cell({
    coords,
    board,
    onSetBoard,
    color = "black",
}: CellProps) {
    const dispatch = useAppDispatch();
    const {
        activeShape,
        virtualBoard,
        commitedBoard,
        index,
    } = useAppSelector((store) => store.board);
    const { pool } = useAppSelector((store) => store.choices);
    const {score, highScore} = useAppSelector(store=> store.game)
    const [isOverlap, setIsOverlap] = useState(false);

    const activeShapeWidth = activeShape.template[0].length;
    const activeShapeHight = activeShape.template.length;
    const boardRef = useRef(board);
    const poolRef = useRef(pool);

    function CheckIsFreeSpace() {
        const activePool =
            pool.filter((item) => item.name !== "blank").length === 1 // pool = stale state
                ? poolRef.current // ref je potreben zaradi stale stata poola
                : pool.filter((item, i) => item.name !== "blank" && i !== index);

        console.log(
            "----------------NEW SCAN INSTANCE--------------------------",
        );
        console.log("checked board state:");
        console.log(boardRef.current);
        console.log("Scaning for shapes:");
        console.log(activePool);

        let isFreeSpace = true;

        if (activePool.length === 0) return true;

        // Check each item. If it finds free, it stops
        for (let i = 0; i < activePool.length; i++) {
            const shape = activePool[i];
            const flatShape = shape.template.flat();
            console.log("Shape in flat form:");
            console.log(flatShape);

            const snapWidth = shape.template[0].length;
            const snapHight = shape.template.length;

            function recursion(row = 0) {
                //premika snapshot po rowu
                for (let i = 0; i < commitedBoard.length - snapWidth + 1; i++) {
                    //ustvari snapshot na koordinati X
                    const snapShot = [];
                    for (let y = 0; y < snapHight; y++) {
                        for (let x = 0; x < snapWidth; x++) {
                            const foo =
                                boardRef.current[y + row][x + i] !== 0 ? 1 : 0;
                            snapShot.push(foo);
                        }
                    }
                    console.log("SnapShots checked:");
                    console.log(snapShot);

                    // primerja snapshot z likom
                    if (isSnapshotFreeSpace(snapShot, shape.template)) {
                        isFreeSpace = true;
                        console.log(
                            `There is a free space for shape at row: ${row + 1}, column: ${i + 1}`,
                        );
                        console.log(shape.template);
                        return true;
                    } else isFreeSpace = false;
                }
                // ce ni prostora in returna po koncu loopa/vrstici
                // ponovno klicemo recursion vrstico z nasledno vrsto
                if (!isFreeSpace && row < virtualBoard.length - snapHight)
                    recursion(row + 1);
                // ce po koncu zadnje vrste ni prostora returnmao false
                else {
                    isFreeSpace = false;
                    return false;
                }
            }
            recursion();

            console.log("test" + " " + isFreeSpace);
            if (isFreeSpace) return true;
            console.log("test2");
        }
        console.log("isFree:" + isFreeSpace);
        return isFreeSpace;
    }
    //pozicija lika shape.template[0][0] je na boardu y=0 x=0
    // najdi vse y,x coordinate kjer je shape.temple === 1
    // primerjaj najdene coordinate z commitedBoard
    // ce ne najde v primerjavi overlap, returni isGameOver===false
    // ce najde overlap, premakni shapa za eno desno in iskanje (recursion??)
    // ce je najdena coordinata zunaj boarda, premakni lik eno dol in na zacetek in ponovi iskanje
    // ce so vse koordinate lika izven boarda returni isGameOver===true

    function isCommitedBoardOccupied(row: number, column: number) {
        if (commitedBoard[row][column] === 1) return 1;
        else return 0;
    }

    function displayShape() {
        setIsOverlap(false);
        if (activeShape.name === "blank") return;


        const newVirtualBoard = virtualBoard.map((row, y) => {
            function isShapeBlock(
                shapeRow: number,
                shapeColumn: number,
                boardRow: number,
                boardColumn: number,
            ) {
                if (activeShape.template.at(shapeRow)?.at(shapeColumn) === 1) {
                    if (isCommitedBoardOccupied(boardRow, boardColumn)) {
                        setIsOverlap(true);
                        return 3;
                    }
                    return 2;
                } else {
                    return isCommitedBoardOccupied(boardRow, boardColumn);
                }
            }

            // Top Left Corner
            if (
                coords.y <= 1 &&
                coords.x <= 1 &&
                activeShapeWidth > 1 &&
                activeShapeHight > 1
            ) {
                return row.map((_, x) => {
                    if (y === 0) {
                        if (x === 0) return isShapeBlock(0, 0, y, x);
                        if (x === 1) return isShapeBlock(0, 1, y, x);
                        if (x === 2) return isShapeBlock(0, 2, y, x);
                        if (x === 3) return isShapeBlock(0, 3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    }
                    if (y === 1) {
                        if (x === 0) return isShapeBlock(1, 0, y, x);
                        if (x === 1) return isShapeBlock(1, 1, y, x);
                        if (x === 2) return isShapeBlock(1, 2, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    }
                    if (y === 2) {
                        if (x === 0) return isShapeBlock(2, 0, y, x);
                        if (x === 1) return isShapeBlock(2, 1, y, x);
                        if (x === 2) return isShapeBlock(2, 2, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    }
                    if (y === 3) {
                        if (x === 0) return isShapeBlock(3, 0, y, x);
                        if (x === 1) return isShapeBlock(3, 1, y, x);
                        if (x === 2) return isShapeBlock(3, 2, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    }
                    if (y === 4) {
                        if (x === 0) return isShapeBlock(3, 0, y, x);
                        if (x === 1) return isShapeBlock(3, 1, y, x);
                        if (x === 2) return isShapeBlock(3, 2, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    } else return isCommitedBoardOccupied(y, x);
                });
            }

            //Top Edge
            else if (coords.y < activeShapeHight - 1) {
                return row.map((_, x) => {
                    if (y === 0) {
                        if (x === coords.x) return isShapeBlock(0, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(0, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(0, -3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    }
                    if (y === 1) {
                        if (x === coords.x) return isShapeBlock(1, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(1, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(1, -3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    }
                    if (y === 2) {
                        if (x === coords.x) return isShapeBlock(2, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(2, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(2, -3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    }
                    if (y === 3) {
                        if (x === coords.x) return isShapeBlock(3, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(3, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(3, -3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    }
                    if (y === 4) {
                        if (x === coords.x) return isShapeBlock(4, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(3, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(3, -3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    } else return isCommitedBoardOccupied(y, x);
                });
            }

            //Left Edge
            else if (coords.x < activeShapeWidth - 1) {
                if (activeShapeWidth === 5) {
                    if (y === coords.y) {
                        return row.map((cell, x) => {
                            if (x === 0) return isShapeBlock(-1, -5, y, x);
                            if (x === 1) return isShapeBlock(-1, -4, y, x);
                            if (x === 2) return isShapeBlock(-1, -3, y, x);
                            if (x === 3) return isShapeBlock(-1, -2, y, x);
                            if (x === 4) return isShapeBlock(-1, -1, y, x);
                            else return isCommitedBoardOccupied(y, x);
                        });
                    }
                }
                if (activeShapeWidth === 4) {
                    if (y === coords.y) {
                        return row.map((cell, x) => {
                            if (x === 0) return isShapeBlock(-1, -4, y, x);
                            if (x === 1) return isShapeBlock(-1, -3, y, x);
                            if (x === 2) return isShapeBlock(-1, -2, y, x);
                            if (x === 3) return isShapeBlock(-1, -1, y, x);
                            else return isCommitedBoardOccupied(y, x);
                        });
                    }
                }
                if (activeShapeWidth === 3) {
                    if (y === coords.y) {
                        return row.map((cell, x) => {
                            if (x === 0) return isShapeBlock(-1, -3, y, x);
                            if (x === 1) return isShapeBlock(-1, -2, y, x);
                            if (x === 2) return isShapeBlock(-1, -1, y, x);
                            else return isCommitedBoardOccupied(y, x);
                        });
                    }
                    if (y === coords.y - 1) {
                        return row.map((cell, x) => {
                            if (x === 0) return isShapeBlock(-2, -3, y, x);
                            if (x === 1) return isShapeBlock(-2, -2, y, x);
                            if (x === 2) return isShapeBlock(-2, -1, y, x);
                            else return isCommitedBoardOccupied(y, x);
                        });
                    }
                    if (y === coords.y - 2) {
                        return row.map((cell, x) => {
                            if (x === 0) return isShapeBlock(-3, -3, y, x);
                            if (x === 1) return isShapeBlock(-3, -2, y, x);
                            if (x === 2) return isShapeBlock(-3, -1, y, x);
                            else return isCommitedBoardOccupied(y, x);
                        });
                    }
                }
                if (activeShapeWidth === 2) {
                    if (y === coords.y) {
                        return row.map((cell, x) => {
                            if (x === 0) return isShapeBlock(-1, -2, y, x);
                            if (x === 1) return isShapeBlock(-1, -1, y, x);
                            else return isCommitedBoardOccupied(y, x);
                        });
                    }
                    if (y === coords.y - 1) {
                        return row.map((cell, x) => {
                            if (x === 0) return isShapeBlock(-2, -2, y, x);
                            if (x === 1) return isShapeBlock(-2, -1, y, x);
                            else return isCommitedBoardOccupied(y, x);
                        });
                    }
                    if (y === coords.y - 2) {
                        return row.map((cell, x) => {
                            if (x === 0) return isShapeBlock(-3, -2, y, x);
                            if (x === 1) return isShapeBlock(-3, -1, y, x);
                            else return isCommitedBoardOccupied(y, x);
                        });
                    }
                }
            }
            //cleanup pod
            if (y === coords.y + 1)
                return row.map((_, x) => {
                    return isCommitedBoardOccupied(y, x);
                });
            //cleanup nad likom
            if (y === coords.y - activeShapeHight)
                return row.map((_, x) => {
                    return isCommitedBoardOccupied(y, x);
                });

            //Non-Left/Top edge placements
            if (activeShapeWidth === 1) {
                if (y === coords.y) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-1, -1, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
                if (y === coords.y - 1) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-2, -1, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
                if (y === coords.y - 2) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-3, -1, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
                if (y === coords.y - 3) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-4, -1, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
                if (y === coords.y - 4) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-5, -1, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
            }

            if (activeShapeWidth === 2) {
                if (y === coords.y) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-1, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(-1, -2, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
                if (y === coords.y - 1) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-2, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(-2, -2, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
                if (y === coords.y - 2) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-3, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(-3, -2, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
            }
            if (activeShapeWidth === 3) {
                if (y === coords.y) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-1, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(-1, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(-1, -3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
                if (y === coords.y - 1) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-2, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(-2, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(-2, -3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
                if (y === coords.y - 2) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(-3, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(-3, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(-3, -3, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                }
            }
            if (activeShapeWidth === 4) {
                if (y === coords.y) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(0, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(0, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(0, -3, y, x);
                        if (x === coords.x - 3)
                            return isShapeBlock(0, -4, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                } else return row;
            }
            if (activeShapeWidth === 5) {
                if (y === coords.y) {
                    return row.map((_, x) => {
                        if (x === coords.x) return isShapeBlock(0, -1, y, x);
                        if (x === coords.x - 1)
                            return isShapeBlock(0, -2, y, x);
                        if (x === coords.x - 2)
                            return isShapeBlock(0, -3, y, x);
                        if (x === coords.x - 3)
                            return isShapeBlock(0, -4, y, x);
                        if (x === coords.x - 4)
                            return isShapeBlock(0, -5, y, x);
                        else return isCommitedBoardOccupied(y, x);
                    });
                } else return row;
            } else return row;
        });
        const columnComplete = isColumnComplete(newVirtualBoard);
        const completedColums = columnComplete.columns;

        //1. check rows
        const {newBoardModifiedRows} = modifyCompletedRows(newVirtualBoard, 4)
        //2. check columns (with checked rows board)
        const modifiedBoard = modifyCompletedColumns(newBoardModifiedRows, completedColums, 4)
        
        onSetBoard(modifiedBoard);
        dispatch(setVirtualBoard(modifiedBoard));
    }

    /**
     * Ko z cursorjem premikamo lik po boardu, zbrise prejsno pozicijo virtual lika(uncommited shape)
     * @function clearCells
     */
    function clearCells() {
        onSetBoard(commitedBoard);
        dispatch(setVirtualBoard(commitedBoard));
    }

    /**
     * handle placing shapes on board
     * @function commitShape
     */
    function commitShape() {
        /**
         * Clause guards
         */
        if(activeShape.name === "blank") return
        if (isOverlap) return;

        const blankShape = {
            name: "blank",
            template: [
                [0, 0],
                [0, 0],
            ],
        };

        const columnComplete = isColumnComplete(virtualBoard);
        const completedColums = columnComplete.columns;
        const numberOfCompletedColumns = completedColums.length;

        /**
         * za vsak upseno commitan shape dodamo tocke
         */
        dispatch(addToScore(points.commitShape));
        // dispatch(disableMulligan())

        if (isRowComplete(virtualBoard) && columnComplete.isComplete) {
            /**
             * Zbrise vrstice in stolpce v primeru obeh polnih
             */

            // zbrise vrstice
            const { newBoardModifiedRows, numberOfCompletedRows } =
                modifyCompletedRows(virtualBoard);
            
            // zbrise se stolpce
            const newBoardDeletedAllCompleted = modifyCompletedColumns(
                newBoardModifiedRows,
                completedColums,
            );
            dispatchAllBoardsState(newBoardDeletedAllCompleted);

            /**
             * Kalkuliramo in updejtamo tocke(score)
             */
            dispatch(
                addToScore(
                    points.completed *
                        (numberOfCompletedRows + numberOfCompletedColumns) +
                        (numberOfCompletedRows + numberOfCompletedColumns - 1) *
                            points.multiBonus,
                ),
            );
            
        } else if (isRowComplete(virtualBoard)) {
            /**
             * Zbrise vrstice ko so le te polne
             */
            const { newBoardModifiedRows, numberOfCompletedRows } =
                modifyCompletedRows(virtualBoard);
            dispatchAllBoardsState(newBoardModifiedRows);
            dispatch(
                addToScore(
                    points.completed * numberOfCompletedRows +
                        (numberOfCompletedRows - 1) * points.multiBonus,
                ),
            );

        } else if (columnComplete.isComplete) {
            /**
             * Zbrise stolpce ko se le ti polni
             */
            const newBoardDeletedColumns = modifyCompletedColumns(
                virtualBoard,
                completedColums,
            );
            dispatchAllBoardsState(newBoardDeletedColumns);
            dispatch(
                addToScore(
                    points.completed * numberOfCompletedColumns +
                        (numberOfCompletedColumns - 1) * points.multiBonus,
                ),
            );
            
        } else {
            /**
             * primer ko ni bilo polnih vrsic ali stolpcev
             */
            dispatchAllBoardsState(virtualBoard);
        }
        
        dispatch(selectShape(blankShape));
        const newPool = pool.map((ele, i) => {
            if (i === index) return blankShape;
            else return ele;
        });
        if (!newPool.some((ele) => ele.name !== "blank")) {
            const randomShapesList = getRandomShapes();
            poolRef.current = randomShapesList;

            dispatch(populatePool(randomShapesList));
            dispatch(enableMulligan())
        } else dispatch(populatePool(newPool));
        dispatch(setIndex(null));
        setIsOverlap(false);

        /**
         * ce zbrisemo vse blocke iz boarda, dobimo dodatni Full Clear Bonus
         */
        if (boardRef.current.flat().every((el: number) => el === 0))
            dispatch(addToScore(points.fullClearBonus));

        /**]
         * chackira ce je na boardu prostora za nase like, drugace konca igro in checkira highscore
         */
        if (!CheckIsFreeSpace()) {
            if (score > highScore) dispatch(updateHighScore());
            dispatch(setIsGameOver(true));
        }
    }

    /**
     * updates complete board state
     * @function dispatchAllBoardsState
     * @param board
     */
    function dispatchAllBoardsState(board: number[][]): void {
        dispatch(commitBoard(changeBoardColor(board)));
        dispatch(setVirtualBoard(changeBoardColor(board)));
        onSetBoard(changeBoardColor(board));
        boardRef.current = board;
    }

    return (
        <div
            onClick={commitShape}
            onMouseEnter={displayShape}
            onMouseLeave={clearCells}
            className="border-t border-l rounded-[0.7rem] border-stone-300 h-13 w-13 cursor-grabbing"
            style={{ backgroundColor: color }}
        ></div>
    );
}

export default Cell;
