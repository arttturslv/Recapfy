import { Link } from 'react-router-dom'
import playlistIcon from '../assets/playlistIcon.png'

export default function SongItem(
    {
        ImageSource="https://upload.wikimedia.org/wikipedia/pt/f/fb/Beatles-one.jpg", 
        Title, Subtitle, URL, duration, index}) {
    return (
        <Link to={URL} target='_blank' className='flex flex-row items-center gap-2 py-2 px-2 rounded-md hover:bg-light/20'>
        <div className='flex items-center justify-between w-full'>
            <div className='flex gap-2 w-full'>
                <div className='flex flex-shrink-0 justify-center items-center gap-2'>
                    <span className='text-sm w-4 text-center'>{index+1}</span>
                    <img className='size-12 rounded-md' src={ImageSource} alt="" />
                </div>
                <div className='flex-grow w-[60%] overflow-hidden'>
                    <p>
                        <strong className='w-[80%] sm:text-md text-sm md:text-base truncate'>{Title}</strong>
                    </p>
                    <p className='w-full text-xs sm:text-sm text-[white]/60 hover:text-[white] truncate'>{Subtitle}</p>
                </div>
            </div>
        </div>
    </Link>
    )
}