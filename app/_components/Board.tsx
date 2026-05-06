import { useState } from "react";
import { useAppSelector } from "../_lib/redux/hooks";
import Cell from "./Cell";


function Board() {
    const {virtualBoard} = useAppSelector(store=>store.board)
    const [board, setBoard] = useState(()=>virtualBoard)

    function getColor(cell:number){
        switch(cell){
            case 1: return "green"
            case 2: return "orange"
            case 3: return "red"
            case 0: return "white"
            default: return "white"
        }
    }

    return (
        <div className="grid grid-cols-8 bg-cyan-700">
            {board.map((row, y) => (
                row.map((cell,x) => (
                    <Cell color={getColor(cell)} onSetBoard={setBoard} coords={{x,y}} key={x} board={board} />
                ))
                
            ))}
        </div>
    );
}

export default Board;
