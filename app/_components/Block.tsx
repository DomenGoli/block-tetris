import { useAppSelector } from "../_lib/redux/hooks"

function Block({index}:{index:number}) {
    const {index:storedIndex} = useAppSelector(store=> store.board)

    function getColor(){
        if(storedIndex===index) return "bg-amber-500"
        else return "bg-amber-700"
    }

    return (
        <div className={`border h-13 w-13 ${getColor()}`}>
            
        </div>
    )
}

export default Block