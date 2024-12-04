import { Link } from 'react-router-dom'
import playlistIcon from '../assets/playlistIcon.png'

export default function SongItem(
    {
        ImageSource="https://upload.wikimedia.org/wikipedia/pt/f/fb/Beatles-one.jpg", 
        Title, Subtitle, URL, duration, index}) {
    return (
        <Link className='flex flex-row items-center gap-2 y-2 rounded-md hover:bg-light/20'>
        <div className='flex items-center justify-between w-full'>
            <div className='flex gap-2'>
                <div className='flex justify-center items-center gap-2'>
                    <span className='text-sm w-4 text-center'>{index+1}</span>
                    <img className='size-12 rounded-md' src={ImageSource} alt="" />
                </div>
                <div>
                    <strong>{Title}</strong>
                    <p className='text-sm text-[white]/60 hover:text-[white]'>{Subtitle}</p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <span className='text-sm text-light/60'><p>{duration}</p></span>
                <button onClick={()=> window.open(URL,"_blank")} className='size-8'>
                    <img src={playlistIcon} alt="" />
                </button>
            </div>

        </div>
    </Link>
    )
}