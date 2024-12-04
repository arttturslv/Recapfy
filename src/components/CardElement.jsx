import { Link } from "react-router-dom";

export default function CardElement({LinkTo, CardTitle, BgSource}) {
    return (
        <Link to={`/${LinkTo}`} className="w-[9rem] h-[5.5rem] min-w-[8rem] min-h-[5rem] relative m-1">
            <img className="w-full h-[100%] rounded-md" src={BgSource}></img>
            <h5 className="font-bold text-[white] absolute top-2 left-2">{CardTitle}</h5>
        </Link>
    )
}