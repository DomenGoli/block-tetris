"use client";

import Board from "./Board";
import Choices from "./Choices";
import { useAppDispatch, useAppSelector } from "../_lib/redux/hooks";
import { useEffect, useState } from "react";
import { enableMulligan, populatePool } from "../_lib/redux/choicesSlice";
import { shapesList } from "../_lib/shapeList";
import { getRandomShapes } from "../_lib/helper";
import { resetBoard } from "../_lib/redux/boardSlice";
import { resetGame } from "../_lib/redux/gameSlice";
import Arsenal from "./Arsenal";
import { resetBombs } from "../_lib/redux/arsenalSlice";

function Game() {
    const [rerenderBoard, forceRerenderBoard] = useState(Math.random);
    const dispatch = useAppDispatch();
    const { isGameOver, score, highScore, newHighScore } = useAppSelector(
        (store) => store.game,
    );
    const numberOfUniqueShapes = shapesList.length;

    function handleClick() {
        dispatch(enableMulligan())
        dispatch(resetGame());
        dispatch(resetBoard());
        dispatch(resetBombs())
        forceRerenderBoard(Math.random())

    }

    useEffect(
        function () {
            const randomShapesList = getRandomShapes();
            dispatch(populatePool(randomShapesList));
        },
        [dispatch, numberOfUniqueShapes, rerenderBoard],
    );

    return (
        <div className="w-screen h-screen flex items-center mt-20 flex-col gap-10">
            <div className="flex gap-17">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-104">
                        <Board key={rerenderBoard}/>
                    </div>
                    <Choices />
                </div>
                <div className="flex flex-col gap-4.5 w-50">
                    <div className="">
                        <p className="text-2xl">Score: {score}</p>
                        <p className="text-2xl">High Score: {highScore}</p>
                    </div>
                    <div className="h-23">
                        {isGameOver && <p className="text-4xl">Game Over</p>}
                        {isGameOver && newHighScore && (
                            <p className="text-2xl">New High Score</p>
                        )}
                        {isGameOver && (
                            <button
                                onClick={handleClick}
                                className="border-2 cursor-pointer rounded-2xl p-3 hover:bg-white hover:text-black"
                            >
                                New Game
                            </button>
                        )}
                    </div>
                    <div>
                        <Arsenal />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
