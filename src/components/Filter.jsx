import { useState } from "react"

export default function Filter({filterByLong, filterByMedium}) {
    const [active, setActive] = useState(true);

    function switchActive(fn) {
        fn();
        setActive(!active)
    }

    return (
        <div className="space-x-2">
            <button onClick={()=>switchActive(filterByLong)} className={`${active?"bg-green text-dark": "bg-grey text-white"} rounded-3xl px-4 py-0.5  transition-colors  duration-300`}>
                1 ano
            </button>
            <button onClick={()=>switchActive(filterByMedium)} className={`${!active?"bg-green text-dark": "bg-grey text-white"} text-white rounded-3xl px-4 py-0.5  transition-colors duration-300`}>
                6 meses
            </button>
        </div>
    )
}
