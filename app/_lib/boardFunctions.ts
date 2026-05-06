export function isRowComplete(board: number[][]): boolean {
        for (let i = 0; i < board.length; i++) {
            if (!board[i].includes(0)) return true;
        }
        return false;
    }

export function changeBoardColor(board: number[][]) {
        const resBoard = board.map((row) => {
            return row.map((cell) => {
                if (cell !== 0) return 1;
                else return 0;
            });
        });
        return resBoard;
    }

export function isColumnComplete(board:number[][]): { isComplete: boolean; columns: number[] } {
        // return isRowComplete(rotateBoard(virtualBoard))
        const completedColums = [];
        let prazna = 0;
        for (let x = 0; x < board[0].length; x++) {
            prazna = 0;
            for (let y = 0; y < board.length; y++) {
                if (board[y][x] === 0) prazna++;
            }
            // if (!prazna) return true;
            if (prazna === 0) completedColums.push(x);
            // console.log("sdfsf");
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

export function deleteCompletedRows(board: number[][]): {newBoardDeletedRows:number[][], numberOfCompletedRows: number}  {
    let numberOfCompletedRows = 0;
    const newBoardDeletedRows = board.map((row) => {
                if (row.includes(0)) return row;
                else {
                    numberOfCompletedRows++
                    return row.map(() => 0);
                } 
            });
    return {newBoardDeletedRows, numberOfCompletedRows}
}

export function deleteCompletedColumns(board: number[][], completedColumns: number[]): number[][] {
    return board.map(row=> {
        return row.map((cell, i) => {
            if(completedColumns.includes(i)) return 0;
            else return cell;
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