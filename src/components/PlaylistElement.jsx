import { Link } from "react-router-dom";

export default function PlaylistElement ({imageSource, title, url, children}) {
    return (
        <Link target="_blank" to={url} className='w-32 sm:w-48 hover:bg-grey/20 py-3 px-2 sm:px-3 space-y-1 rounded-lg'> 
            <img 
            className='w-full rounded-md'
            src={imageSource} alt="" srcset="" />

            {children}
            {title && <p className='text-sm text-wrap font-medium'>{title}</p>}
        </Link> 
        )
}