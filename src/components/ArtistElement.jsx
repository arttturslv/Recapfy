export default function ArtistElement(
        {   ImageSource = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo60e0kxizsa07mMj7n8jIW9oxycvgs0Q-Gw&s", 
            ArtistName
        }) {
    return (
        <div className="flex-none flex flex-col items-center space-y-[0.1rem] ">
            <img className="rounded-full size-[5rem]" src={ImageSource} alt="" />
            <p className="font-medium text-[white] text-[0.7rem] text-center">{ArtistName}</p>
        </div>
    )
}