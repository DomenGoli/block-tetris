import { clearSelection, selectBomb, selectShape } from "../_lib/redux/boardSlice";
import { useAppDispatch, useAppSelector } from "../_lib/redux/hooks";

type BombType = {
    name: string;
    template: number[][];
    capacity: number;
};

// const blank = {
//         name: "blank",
//         template: [
//             [0, 0],
//             [0, 0]
//         ],
//     }

function Weapon({ bomb }: { bomb: BombType }) {
    const dispatch = useAppDispatch();
    const {activeShape } = useAppSelector(store=> store.board)
    const { isGameOver } = useAppSelector(store=> store.game)
    const { inventar } = useAppSelector((store) => store.arsenal);


    function handleClick() {
        if(isGameOver) return
        
        if(activeShape.name === bomb.name) {
            dispatch(clearSelection());
            dispatch(selectBomb(false));
        }
        else {

            dispatch(selectShape(bomb));
            dispatch(selectBomb(true));
        }
    }

    
    function getStyle(){
        if(activeShape.name === bomb.name) return {backgroundColor: "white", color: "black"}
    }

    return (
        <div className="">
            <button
                className="border-t border-l rounded-[0.4rem] py-1 w-35  cursor-pointer enabled:hover:bg-white enabled:hover:text-black disabled:cursor-default disabled:text-stone-500"
                style={getStyle()}
                onClick={handleClick}
                disabled={inventar[bomb.name] === 0}
            >{`${bomb.name} (${inventar[bomb.name]}/${bomb.capacity})`}</button>
        </div>
    );
}

export default Weapon;
