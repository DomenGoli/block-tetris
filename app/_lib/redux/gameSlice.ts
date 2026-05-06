import { createSlice } from "@reduxjs/toolkit";

type initialState = {
    isGameOver: boolean;
    score: number;
    highScore: number;
    newHighScore: boolean;
};

function loadHighScore(): number {
    const storedValue = localStorage?.getItem("highScore");
    return storedValue ? Number(JSON.parse(storedValue)) : 0;
}

const initialState = {
    isGameOver: false,
    score: 0,
    highScore: loadHighScore(),
    newHighScore: false,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setIsGameOver(state, action) {
            state.isGameOver = action.payload;
        },
        addToScore(state, action) {
            state.score = state.score + action.payload;
        },
        updateHighScore(state) {
            state.newHighScore = true;
            state.highScore = state.score;
            localStorage.setItem("highScore", JSON.stringify(state.highScore));
        },
        resetGame() {
            return { ...initialState };
        },
    },
});

export default gameSlice.reducer;
export const { setIsGameOver, addToScore, updateHighScore, resetGame } =
    gameSlice.actions;
