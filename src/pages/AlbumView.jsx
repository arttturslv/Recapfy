import playIcon from '../assets/playIcon.png'
import GoBackButton from '../components/GoBackButton'
import SongItem from '../components/SongItem'
import { getAllItems, getItemsByRange } from '../hooks/LocalStorage'
import Filter from '../components/Filter'

import { useEffect, useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import ErrorPage from './ErrorPage'

export default function AlbumView() {
    const [currentDataRange, setCurrentDataRange] = useState([])

    const [tracksLong, setTracksLong] = useState([])
    const [tracksMedium, setTracksMedium] = useState([])
    const [hasError, setHasError] = useState(null)

    useEffect(() => {
        let tracksLong, tracksMedium
        try {
            tracksLong = getItemsByRange('tracks', 'long_term').items
            tracksMedium = getItemsByRange('tracks', 'medium_term').items
        } catch (error) {
            setHasError(error)
        }
        setTracksLong(tracksLong)
        setTracksMedium(tracksMedium)
        setCurrentDataRange(tracksLong)
    }, [])

    if (hasError) {
        return (
            <ErrorPage
                pageTitle={'Músicas favoritas'}
                error={hasError}
                message={'Não conseguimos localizar seus dados.'}
            />
        )
    } else {
        return (
            <div className="flex h-[100vh] w-[100vw] flex-col overflow-hidden overflow-y-scroll text-[white] transition-all">
                <div className="px-6 pt-4">
                    <GoBackButton
                        Title={`Suas músicas favoritas`}
                    ></GoBackButton>

                    <div className="h-max flex-grow space-y-3 sm:px-6 pt-2 pb-16">
                        <Filter
                            filterByLong={() => setCurrentDataRange(tracksLong)}
                            filterByMedium={() =>
                                setCurrentDataRange(tracksMedium)
                            }
                        ></Filter>{' '}
                        <>
                            {currentDataRange &&
                                currentDataRange?.slice(0,50).map((e, i) => (
                                    <SongItem
                                        key={i}
                                        ImageSource={e?.album?.images[2]?.url}
                                        URL={e.external_urls.spotify}
                                        Title={e.name}
                                        Subtitle={e.album?.name}
                                        index={i}
                                    ></SongItem>
                                ))}
                        </>
                    </div>
                </div>
                <BottomNavigation></BottomNavigation>
            </div>
        )
    }
}
