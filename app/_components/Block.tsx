import { useAppSelector } from "../_lib/redux/hooks"

function Block({index}:{index:number}) {
    const {index:storedIndex} = useAppSelector(store=> store.board)

    function getColor(){
        if(storedIndex===index) return "var(--selected)"
        else return "var(--choices)"
    }

    return (
        <div className={`border-t border-l rounded-[0.7rem] h-13 w-13 border-stone-300`} style={{backgroundColor: getColor()}}>
            
        </div>
    )
}

export default Block

// oklch(55.5% 0.163 48.998)
// oklch(76.9% 0.188 70.08)