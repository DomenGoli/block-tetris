import { useState } from "react";
import { useAppSelector } from "../_lib/redux/hooks";
import Cell from "./Cell";

function Board() {
    const { virtualBoard } = useAppSelector((store) => store.board);
    const [board, setBoard] = useState(() => virtualBoard);

    function getColor(cell: number) {
        switch (cell) {
            case 1:
                return "var(--commited)";
            case 2:
                return "var(--active)";
            case 3:
                return "var(--overlap)";
            case 4:
                return "var(--complete)";
            case 0:
                return "var(--empty)";
            default:
                return "var(--empty)";
        }
    }

    return (
            <div className="grid grid-cols-8 border-stone-300">
                {board.map((row, y) =>
                    row.map((cell, x) => (
                        <Cell
                            color={getColor(cell)}
                            onSetBoard={setBoard}
                            coords={{ x, y }}
                            key={x}
                            board={board}
                        />
                    )),
                )}
            </div>
    );
}

export default Board;
