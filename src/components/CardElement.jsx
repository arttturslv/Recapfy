import { Link } from "react-router-dom";

export default function CardElement({LinkTo, CardTitle, BgSource}) {
    return (
        <Link to={`/${LinkTo}`} className="flex min-h-24 max-h-24 min-w-14  sm:min-w-20 max-w-56 flex-grow relative m-1">
            <img className="w-full h-[100%] rounded-md object-cover" src={BgSource}></img>
            <h5 className="font-bold text-[white] absolute top-2 left-2">{CardTitle}</h5>
        </Link>
    )
}