import { createSlice } from "@reduxjs/toolkit";

//Types

type ShapeType = {
    name: string;
    template: number[][];
};

type InitialStateType = {
    numberOfShapes:number;
    pool: ShapeType[]
}


//Initial State
const initialState:InitialStateType = {
    numberOfShapes:3,
    pool: []
}

//Reducer
const choicesSlice = createSlice({
    name: "choices",
    initialState,
    reducers: {
        decreaseChoiceNumber(state){
            state.numberOfShapes--
        },
        populatePool(state,action){
            state.pool = action.payload
        }
    }
})

//Export
export default choicesSlice.reducer
export const {decreaseChoiceNumber, populatePool} = choicesSlice.actions

