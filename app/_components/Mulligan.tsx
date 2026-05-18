import { unique } from "next/dist/build/utils";
import { shuffle } from "../_lib/helper";
import { selectShape, setIndex } from "../_lib/redux/boardSlice";
import { disableMulligan, populatePool } from "../_lib/redux/choicesSlice";
import { useAppDispatch, useAppSelector } from "../_lib/redux/hooks";
import { shapesList } from "../_lib/shapeList";

type ShapeType = {
    name: string;
    template: number[][];
};

const blankShape = {
    name: "blank",
    template: [
        [0, 0],
        [0, 0],
    ],
};

const blankShapeUnique = {
    name: "blank",
    id: 0,
    weight: 0.5,
    directions: [
        {
            name: "blank",
            id: 0,
            template: [
                [0, 0],
                [0, 0],
            ],
        },
    ],
};

function Mulligan() {
    const dispatch = useAppDispatch();
    const { pool } = useAppSelector((store) => store.choices);
    console.log("pool:");
    console.log(pool);
    // const names = pool
    //     .map((shape) => shape.name)
    //     .map((string) => string.split("-")[0]);
    // const filteredNames = pool.map((shape) => shape.name);

    // const fullShape = shapesList.filter((shape) => names.includes(shape.name));
    const rotatedList: ShapeType[] = [];

    // if(names.length) {

    // names.forEach((name) => {
    //     const uniqueShape =
    //         shapesList.find((shape) => shape.name === name) || blankShapeUnique;
    //     rotatedList.push(
    //         uniqueShape.directions
    //             .filter((dir) => {
    //                 if(uniqueShape.directions.length > 1) return !filteredNames.includes(dir.name)
    //                 else return dir
    //             })
    //             .sort(shuffle)[0],
    //     );
    // });

    pool.forEach((shape) => {
        const uniqueShape = shapesList.find(ele => ele.name === shape.name.split("-")[0]) || blankShapeUnique
        if (uniqueShape.directions.length === 1) rotatedList.push(uniqueShape.directions[0])
        else {
            const directionsOptions = uniqueShape.directions.filter(ele => ele.name !== shape.name)
            rotatedList.push(directionsOptions?.sort(shuffle)[0])
        }
        
    })
    // }

    // fullShape.forEach((shape) => {
    //     rotatedList.push(shape.directions.sort(shuffle)[0]);
    // });

    // dodaj da handle clikc sprosti trenutni oznacen lik
    function handleClick() {
        console.log(pool);
        dispatch(disableMulligan());
        dispatch(selectShape(blankShape));
        dispatch(setIndex(null));
        dispatch(populatePool(rotatedList));
    }

    return (
        <div>
            <button
                className="border cursor-pointer rounded-2xl p-3"
                onClick={handleClick}
            >
                Zavrti
            </button>
        </div>
    );
}

export default Mulligan;
