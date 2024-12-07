import { Link } from "react-router-dom"

export default function ArtistElement(
        {   ImageSource = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo60e0kxizsa07mMj7n8jIW9oxycvgs0Q-Gw&s", 
            ArtistName
        }) {
    return (
        <Link to={`/artists/${ArtistName}`} className="flex-none flex flex-col justify-center items-center space-y-[0.1rem]">
            <div className="lg:h-44 sm:h-32 h-28 w-auto aspect-square">
            <img className="rounded-full size-[100%] i" src={ImageSource} alt="" />

            </div>
            <p className="font-medium text-[white] text-[0.7rem] text-center">{ArtistName}</p>
        </Link>
    )
}