import { useRef, useEffect } from 'react'
import chevronIcon from '../assets/chevronIcon.png'
import shareIcon from '../assets/shareIcon.png'

import SongItem from '../components/SongItem'

export default function FavArtists() {

    return (
        <div  className="text-[white] h-full space-y-4 flex flex-col pt-4 px-6 bg-dark">

            <div>
                <div className="flex flex-row justify-between">
                    <button className="flex items-center gap-2">
                        <img src={chevronIcon} alt="" />
                        <p className="font-bold">Artistas Favoritos</p>
                    </button>
                </div>

                <div className='flex flex-col items-center py-3 bg-gradient-to-t from-dark '>
                    <div className='flex justify-center py-2'>
                        <img src="https://i.imgur.com/BMW4nxr.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between pr-5">
                <div className='space-x-2'>
                    <button className='px-4 py-0.5 bg-green text-dark rounded-3xl '>1 ano</button>
                    <button className=' opacity-40 px-4 py-0.5 bg-grey text-white rounded-3xl '>6 meses</button>
                </div>
                <button className="flex items-center gap-2">
                    <img src={shareIcon} alt="" />
                </button>
            </div>

            <div className="flex-grow h-max">
                    <SongItem ArtistName="Michael Jackson" duration="15min"></SongItem>
                    <SongItem ArtistName="Michael Jackson" duration="15min"></SongItem>
                    <SongItem ArtistName="Michael Jackson" duration="15min"></SongItem>
                    <SongItem ArtistName="Michael Jackson" duration="15min"></SongItem>
                    <SongItem ArtistName="Michael Jackson" duration="15min"></SongItem>
                    <SongItem ArtistName="Michael Jackson" duration="15min"></SongItem>
            </div>

        </div>
    )
}