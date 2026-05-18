import { selectShape, setIndex } from "../_lib/redux/boardSlice";
import { useAppDispatch, useAppSelector } from "../_lib/redux/hooks";
import Block from "./Block";
import InvisableBlock from "./InvisableBlock";

type ShapeType = {
    name: string;
    template: Array<number>[];
};

type ShapeProps = {
    shape: ShapeType;
    index: number
}

function Shape({ shape, index }: ShapeProps) {
    const dispatch = useAppDispatch();
    const { isGameOver } = useAppSelector((store) => store.game);

    function handleClick() {
        if (isGameOver) return;

        dispatch(selectShape(shape));
        dispatch(setIndex(index));
    }
    const shapeWidth = shape.template[0].length;
    return (
        <div
            onClick={handleClick}
            className="grid cursor-grab"
            style={{
                gridTemplateColumns: `repeat(${shapeWidth}, minmax(0, 1fr))`,
            }}
        >
            {shape.template.map((row) =>
                row.map((cell, i) =>
                    cell === 1 ? (
                        <Block index={index} key={i} />
                    ) : (
                        <InvisableBlock key={i} />
                    ),
                ),
            )}
        </div>
    );
}

export default Shape;

