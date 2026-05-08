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
}

function Mulligan() {
    const dispatch = useAppDispatch();
    const { pool } = useAppSelector((store) => store.choices);
    const names = pool
        .map((shape) => shape.name)
        .map((string) => string.split("-")[0]);

    // const fullShape = shapesList.filter((shape) => names.includes(shape.name));
    const rotatedList: ShapeType[] = [];

    // if(names.length) {

        names.forEach(name=> {
            const uniqueShape = shapesList.find(shape => shape.name === name) || blankShapeUnique
            rotatedList.push(uniqueShape.directions.sort(shuffle)[0])
        })
    // }

    // fullShape.forEach((shape) => {
    //     rotatedList.push(shape.directions.sort(shuffle)[0]);
    // });

    // dodaj da handle clikc sprosti trenutni oznacen lik
    function handleClick() {
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
