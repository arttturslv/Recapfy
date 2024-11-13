import playlistIcon from '../assets/playlistIcon.png'

export default function SongItem(
    {
        ImageSource="https://upload.wikimedia.org/wikipedia/pt/f/fb/Beatles-one.jpg", 
        Title, Subtitle, URL}) {
    return (
        <div className='flex flex-row items-center gap-2 p-2 rounded-md hover:bg-light/20'>
        <span className='text-sm'>1</span>
        <div className='flex items-center justify-between w-full'>
            <div className='flex gap-2'>
                <img className='size-12 rounded-md' src={ImageSource} alt="" />
                <div>
                    <strong>{Title}</strong>
                    <p className='text-sm text-[white]/60 hover:text-[white]'>{Subtitle}</p>
                </div>
            </div>
            <button onClick={()=> console.log(URL)} className='size-8'>
                <img src={playlistIcon} alt="" />
            </button>
        </div>
    </div>
    )
}