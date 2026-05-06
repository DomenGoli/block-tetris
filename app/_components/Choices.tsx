import { useAppSelector } from "../_lib/redux/hooks";
import Shape from "./Shape";

function Choices() {
    const { pool } = useAppSelector((store) => store.choices);
    
    const blankShape = {
            name: "blank",
            template: [
                [0, 0],
                [0, 0],
            ],
        };

    return (
        <div className="flex flex-wrap gap-5">
            <div>
                <Shape shape={pool[0] || blankShape} index={0} />
            </div>
            <div>
                <Shape shape={pool[1] || blankShape} index={1} />
            </div>
            <div>
                <Shape shape={pool[2] || blankShape} index={2} />
            </div>
        </div>
    );
}

export default Choices;
