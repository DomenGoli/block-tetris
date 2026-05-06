import { createSlice } from "@reduxjs/toolkit";

//Types
type ShapeProps = {
    name: string,
    template: Array<number>[]
}

type InitialStateType = {
    commitedBoard: Array<number>[];
    virtualBoard: Array<number>[];
    activeShape: ShapeProps;
    index:number | null;
};

const initialState: InitialStateType = {
    commitedBoard: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    virtualBoard: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    activeShape: {
        name: "blank",
        template: [
            [0, 0],
            [0, 0]
        ],
    },
    index: null,
};

//Reducer
const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        selectShape(state, action) {
            state.activeShape = action.payload
        },
        setVirtualBoard(state, action) {
            state.virtualBoard = action.payload
        },
        commitBoard(state, action) {
            state.commitedBoard = action.payload
        },
        setIndex(state,action){
            state.index = action.payload
        },
        resetBoard(){
            return {...initialState}
        }
    },
});

//Exports
export default boardSlice.reducer;
export const {selectShape, setVirtualBoard, commitBoard, setIndex, resetBoard} = boardSlice.actions;
