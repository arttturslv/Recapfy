import { useRef, useEffect } from 'react'
import chevronIcon from '../assets/chevronIcon.png'
import playIcon from '../assets/playIcon.png'
import GoBackButton from '../components/GoBackButton'
import SongItem from '../components/SongItem'
import { getImageColor } from '../hooks/Utils'
export default function AlbumView(
    {
        ImageSource = "https://upload.wikimedia.org/wikipedia/pt/f/fb/Beatles-one.jpg", 
        Title="Rolling", SubTitle, OuvintesQNT, URL }) {
    const imageRef = useRef()
    const backgroundRef = useRef()

    useEffect(() => {
        if(imageRef.current && backgroundRef.current) {
            const [r,g,b,a] = getImageColor(imageRef.current)
            backgroundRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        }
    }, [imageRef])


    return (
        <div ref={backgroundRef} className="text-[white] h-full flex flex-col ">

            <div className="py-4 px-6 h-64 bg-dark ">
                <img crossOrigin='anonymous' ref={imageRef} className="left-0 top-0 opacity-90 w-full h-64 object-cover absolute" src={ImageSource} alt="" />

                <div className="z-10 relative flex flex-col justify-between h-[100%]">
                    <GoBackButton Title={`Album "${Title}"`}></GoBackButton>

                    <div>
                        <h3 className="font-black text-4xl">{Title}</h3>
                        <span className="text-sm"><strong>{SubTitle} • </strong> {OuvintesQNT/1000} mil ouvintes</span>
                    </div>
                    <button className="size-10 absolute -bottom-8 right-0">
                        <img src={playIcon} alt="" />
                    </button>
                </div>
            </div>
            
            <div className="space-y-3 pt-2 px-6 flex-grow h-max bg-[#000]/85">
                <h4 className=' font-bold'>Suas favoritas</h4>
                
                <div>
                    <SongItem Title="Easy" Subtitle="Troye Sivan" />
                    <SongItem Title="Easy" Subtitle="Troye Sivan" />
                    <SongItem Title="Easy" Subtitle="Troye Sivan" />
                    <SongItem Title="Easy" Subtitle="Troye Sivan" />
                    <SongItem Title="Easy" Subtitle="Troye Sivan" />
                    <SongItem Title="Easy" Subtitle="Troye Sivan" />
                </div>

            </div>

        </div>
    )
}