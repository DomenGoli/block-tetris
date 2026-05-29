export function isRowComplete(board: number[][]): boolean {
        for (let i = 0; i < board.length; i++) {
            if (!board[i].includes(0)) return true;
        }
        return false;
    }



export function changeBoardColor(board: number[][], color=1) {
        const resBoard = board.map((row) => {
            return row.map((cell) => {
                if (cell !== 0) return color;
                else return 0;
            });
        });
        return resBoard;
    }

export function isColumnComplete(board:number[][]): { isComplete: boolean; columns: number[] } {
        const completedColums = [];
        let prazna = 0;
        for (let x = 0; x < board[0].length; x++) {
            prazna = 0;
            for (let y = 0; y < board.length; y++) {
                if (board[y][x] === 0) prazna++;
            }
            if (prazna === 0) completedColums.push(x);
        }
        if (completedColums.length > 0)
            return { isComplete: true, columns: completedColums };
        else return { isComplete: false, columns: [] };
    }

export function isSnapshotFreeSpace(snapShot: number[], shape: number[][]) {
    const flatShape = shape.flat()

    for(let i=0; i<snapShot.length; i++) {
        if(flatShape[i] === 1) {
            if(snapShot[i] === 1) return false
        }
    }

    return true
}

function isOverlap(board: number[][]): boolean {
    return board.flat().includes(3)
}

export function modifyCompletedRows(board: number[][], modifier=0): {newBoardModifiedRows:number[][], numberOfCompletedRows: number}  {
    let numberOfCompletedRows = 0;
    if(modifier && isOverlap(board)) return {newBoardModifiedRows: board, numberOfCompletedRows};
    
    const newBoardModifiedRows = board.map((row) => {
                if (row.includes(0)) return row;
                else {
                    numberOfCompletedRows++
                    return row.map(() => modifier);
                } 
            });
    return {newBoardModifiedRows, numberOfCompletedRows}
}

export function modifyCompletedColumns(board: number[][], completedColumns: number[], modifier=0): number[][] {
    if(modifier && isOverlap(board)) return board.map(row=> {
        return row.map(cell => {
            if(cell === 4) return 1
            else return cell
        })
    });

    return board.map(row=> {
        return row.map((cell, i) => {
            // Fix za brisanje potencialno completed rows ko premikamo lik po X osi
            if(!isRowComplete(board) && !completedColumns.includes(i)) {
                if(cell === 4) return 1
            }

            // ZBriSI
            // if(!isColumnComplete(board).isComplete) {
            //     if(cell === 4) return 1
            // }
            // Fix za brisanje potencialno completed rows ko premikamo lik po Y osi
            // if(board.flat().includes(2)) {
            //     if(cell === 4) return 1
            // };

            if(completedColumns.includes(i)) return modifier;
            else return cell;
        })
    })
}

export function deployBomb(board: number[][]): number[][] {
    return board.map(row => {
        return row.map(cell=> {
            if(cell === 5 || cell ===3) return 0
            else return cell
        })
    })
}






















    // function rotateBoard(board: number[][]) {
    //     for (let i = 0; i < board.length; i++) {
    //         for (let j = 0; i < i + 1; j++) {
    //             [board[i][j], board[j][i]] = [board[j][i], board[i][j]];
    //         }
    //     }
    //     // Step 2: Reverse each row
    //     for (let i = 0; i < board.length; i++) {
    //         board[i].reverse();
    //     }
    //     return board;
    // }