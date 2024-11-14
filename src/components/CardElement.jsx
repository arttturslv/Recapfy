import { Link } from "react-router-dom";

export default function CardElement({CardTitle}) {
    return (
        <Link to={'/album'} className="w-[8rem] h-[5.5rem] min-w-[8rem] min-h-[5rem] relative m-1">
            <img className="w-full h-[100%] rounded-md" src="https://st4.depositphotos.com/5647624/21667/i/450/depositphotos_216679232-stock-photo-abstract-bright-green-background.jpg"></img>
            <h5 className="font-bold text-[white] absolute top-2 left-2">{CardTitle}</h5>
        </Link>
    )
}