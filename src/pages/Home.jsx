import { useEffect, useState } from 'react'
import ArtistElement from '../components/ArtistElement'
import CardElement from '../components/CardElement'
import { getAllItems, setToLocal } from '../hooks/LocalStorage'
import BottomNavigation from '../components/BottomNavigation'
import {
    binarySearch,
    countArtistMentionInTrack,
    quickSort,
} from '../hooks/Utils'

export default function Home() {
    const [topArtists, setTopArtists] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [topArtistsMostListened, setTopArtistsMostListened] = useState([])

    useEffect(() => {
        let artists = getAllItems('artists').items
        let tracks = getAllItems('tracks').items

        console.log('searched for: ', artists.length)
        console.log('searched for: ', tracks.length)

        let artistCounts = countArtistMentionInTrack(artists, tracks, 10)

        setTopArtistsMostListened(quickSort(artistCounts, (item) => item[0]))

        setToLocal('USER_ARTISTS_MOST_LISTENED', artistCounts)

        console.dir('1: ', artistCounts)

        setTopTracks(tracks)
        setTopArtists(artists)
    }, [])

    return (
        <div className="h-[100vh] w-[100vw] overflow-hidden overflow-y-scroll py-4 pb-16 text-[white]">
            <div className="flex-1 flex-grow px-4">
                <div className="space-y-1">
                    <h1 className="text-xl font-bold text-[rgb(255,255,255)]">
                        Artistas
                    </h1>
                    <div
                        id="artist-scroll-id"
                        className="flex w-[100vw] flex-row space-x-2 overflow-y-scroll pr-8"
                    >
                        {topArtists && topArtistsMostListened ? (
                            topArtists
                                .filter(
                                    (
                                        value,
                                        index,
                                        self // retira valores duplicados ()
                                    ) =>
                                        index ===
                                        self.findIndex(
                                            (item) => item.name === value.name
                                        )
                                )
                                .filter((item) => {
                                    console.log(item.name)
                                    return binarySearch(
                                        topArtistsMostListened,
                                        (item) => item[0],
                                        item.name,
                                        0,
                                        topArtistsMostListened.length - 1
                                    )
                                })
                                .map((item) => {
                                    return (
                                        <ArtistElement
                                            ArtistName={item.name}
                                            ImageSource={item.images[2].url}
                                        ></ArtistElement>
                                    )
                                })
                        ) : (
                            <h3>Você não tem artistas favoritos</h3>
                        )}
                    </div>
                </div>
                <div className="space-y-1">
                    <h1 className="text-xl font-bold">Seus gêneros</h1>
                    <div className="flex">
                        <CardElement
                            LinkTo={'genres'}
                            BgSource="https://i.imgur.com/8DwxSys.png"
                            CardTitle="Todos"
                        ></CardElement>
                    </div>
                </div>
                <div className="space-y-1">
                    <h1 className="text-xl font-bold">Seus principais</h1>
                    <div className="flex flex-wrap">
                        <CardElement
                            LinkTo={'artists'}
                            BgSource="https://i.imgur.com/VKF0XlT.png"
                            CardTitle="Artistas"
                        ></CardElement>
                        <CardElement
                            LinkTo={'album'}
                            BgSource="https://i.imgur.com/HTSFrew.png"
                            CardTitle="Músicas"
                        ></CardElement>
                    </div>
                </div>
            </div>
            <BottomNavigation></BottomNavigation>
        </div>
    )
}
