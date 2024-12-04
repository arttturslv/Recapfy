import playIcon from '../assets/playIcon.png'
import GoBackButton from '../components/GoBackButton'
import SongItem from '../components/SongItem'
import {getAllItems, getItemsByRange} from '../hooks/LocalStorage'
import Filter from '../components/Filter'

import { useEffect, useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'

export default function AlbumView() {


    const [currentDataRange, setCurrentDataRange] = useState([]);

    const [tracksLong, setTracksLong] = useState([])
    const [tracksMedium, setTracksMedium] = useState([])

    useEffect(() => {
        let tracksLong = getItemsByRange("tracks", "long_term").items;
        let tracksMedium = getItemsByRange("tracks", "medium_term").items;

        setTracksLong(tracksLong);
        setTracksMedium(tracksMedium);

        setCurrentDataRange(tracksLong);
    }, [])

  
    return (
        <div
            className="flex h-full flex-col overflow-y-scroll text-[white] px-6 pt-4 transition-all bg-gradient-to-t to-[#1A1615]  from-[#000]/60 "
        >
            <GoBackButton Title={`Suas músicas favoritas`}></GoBackButton>


            <div className="h-max flex-grow space-y-3  px-6 pt-2">
            <Filter 
                filterByLong={()=> setCurrentDataRange(tracksLong)}
                filterByMedium={()=> setCurrentDataRange(tracksMedium)}
            ></Filter>                    <>
                    {
                        currentDataRange &&
                        currentDataRange?.map((e, i)=> 
                            <SongItem key={i} ImageSource={e?.album?.images[2]?.url} URL={e.external_urls.spotify} Title={e.name} Subtitle={e.album?.name} index={i}  ></SongItem>
                        )
                    }
                    </>
            </div>
            <BottomNavigation></BottomNavigation>
        </div>
    )
}
