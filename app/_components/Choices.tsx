import { useAppSelector } from "../_lib/redux/hooks";
import Mulligan from "./Mulligan";
import Shape from "./Shape";

function Choices() {
    const { pool, isMulliganActive } = useAppSelector((store) => store.choices);
    

    const blankShape = {
        name: "blank",
        template: [
            [0, 0],
            [0, 0],
        ],
    };

    return (
        <div className="flex flex-col items-center gap-5">
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
            {isMulliganActive && <Mulligan />}
        </div>
    );
}

export default Choices;
