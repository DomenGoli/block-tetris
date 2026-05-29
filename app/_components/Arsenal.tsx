import { bombList } from "../_lib/bombList"
import Weapon from "./Weapon"

function Arsenal() {
    return (
        <div className="flex flex-col gap-1">
            <div className="w-35 flex">
            <label className="w-35 text-center">Destroy blocks</label>
            </div>
        <div className="flex flex-col gap-2">
            {bombList.map((bomb, i) => <Weapon key={i} bomb={bomb} />)}
        </div>
        </div>
    )
}

export default Arsenal