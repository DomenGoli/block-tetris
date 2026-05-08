import { createSlice } from "@reduxjs/toolkit";

//Types

type ShapeType = {
    name: string;
    template: number[][];
};

type InitialStateType = {
    numberOfShapes:number;
    pool: ShapeType[];
    isMulliganActive: boolean;
}


//Initial State
const initialState:InitialStateType = {
    numberOfShapes:3,
    pool: [],
    isMulliganActive: true,
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
        },
        disableMulligan(state){
            state.isMulliganActive = false
        },
        enableMulligan(state){
            state.isMulliganActive = true
        },
    }
})

//Export
export default choicesSlice.reducer
export const {decreaseChoiceNumber, populatePool, disableMulligan, enableMulligan} = choicesSlice.actions

