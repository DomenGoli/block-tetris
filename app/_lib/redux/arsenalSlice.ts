import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//1 type

type InventarType = {
    [key:string]: number
    // "grenade": number;
    // "shell": number;
    // "rocket": number;
    // "cluster": number;
    // "nuke": number;
}

type IntialStateType = {
    // selectedBomb: BombType | null;
    inventar: InventarType;
    // grenade: number;
    // shell: number;
    // rocket: number;
    // cluster: number;
    // nuke: number;
}

type InputsType = {
    name: string;
    amount: number;
}
//IntialState
const initialState:IntialStateType = {
    // selectedBomb: null,
    inventar: {
        "grenade": 0,
        "shell": 0,
        "rocket": 0,
        "cluster": 0,
        "nuke": 0
    }
}
//reducer
const arsenalSlice = createSlice({
    name: "arsenal",
    initialState,
    reducers: {
        changeBombInventory: {
            prepare(name, amount){
                return {payload: {name, amount}}
            },
            reducer(state, action: PayloadAction<InputsType>) {
                switch(action.payload.name){
                case("grenade"):
                    // if(state.inventar["grenade"])
                    state.inventar = {...state.inventar, "grenade": state.inventar.grenade + action.payload.amount};
                    break;
                case("shell"):
                    state.inventar = {...state.inventar, "shell": state.inventar.shell + action.payload.amount}
                    break;
                case("rocket"):
                    state.inventar = {...state.inventar, "rocket": state.inventar.rocket + action.payload.amount}
                    break;
                case("cluster"): 
                    state.inventar = {...state.inventar, "cluster": state.inventar.cluster + action.payload.amount}
                    break;
                case("nuke"): 
                    state.inventar = {...state.inventar, "nuke": state.inventar.nuke + action.payload.amount};
                    break;
                // default 
            }
            }
        }
        // spendBomb(state, action){
        //     switch(action.payload){
        //         case("grenade"):
        //             state.inventar = {...state.inventar, "grenade": state.inventar["grenade"] - 1};
        //             break;
        //         case("shell"):
        //             state.inventar = {...state.inventar, "shell": state.inventar["shell"] - 1}
        //             break;
        //         case("rocket"):
        //             state.inventar = {...state.inventar, "rocket": state.inventar["rocket"] - 1}
        //             break;
        //         case("cluster"): 
        //             state.inventar = {...state.inventar, "cluster": state.inventar["cluster"] - 1}
        //             break;
        //         case("nuke"): 
        //             state.inventar = {...state.inventar, "nuke": state.inventar["nuke"] - 1};
        //             break;
        //         // default 
        //     }
        // }
    }
})
//export
export default arsenalSlice.reducer
export const {changeBombInventory} = arsenalSlice.actions