import { useEffect, useState } from 'react'
import ArtistElement from '../components/ArtistElement'
import CardElement from '../components/CardElement'
import { getAllItems, setToLocal, getFromLocal } from '../hooks/LocalStorage'
import BottomNavigation from '../components/BottomNavigation'
import {
    binarySearch,
    countArtistMentionInTrack,
    quickSort,
} from '../hooks/Utils'
import PlaylistElement from '../components/PlaylistElement'
import ErrorPage from './ErrorPage'

export default function Home() {
    const [topArtists, setTopArtists] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [topArtistsMostListened, setTopArtistsMostListened] = useState([])
    const [playlists, setPlaylists] = useState()
    const [user, setUser] = useState()

    const [hasError, setHasError] = useState(null)

    useEffect(() => {
        try {
            let artists = getAllItems('artists').items
            let tracks = getAllItems('tracks').items
            let playlists = getFromLocal('USER_PLAYLISTS')
            let user = getFromLocal('USER_PROFILE')

            let artistCounts = countArtistMentionInTrack(artists, tracks, 10)

            setTopArtistsMostListened(
                quickSort(artistCounts, (item) => item[0])
            )

            setToLocal('USER_ARTISTS_MOST_LISTENED', artistCounts)
            setTopTracks(tracks)
            setTopArtists(artists)
            setPlaylists(playlists)
            setUser(user)
        } catch (error) {
            setHasError(error)
        }
    }, [])

    if (hasError) {
        return (
            <ErrorPage
                pageTitle={'Home'}
                error={hasError}
                message={'Não conseguimos localizar seus dados.'}
            />
        )
    } else {
        return (
            <div className="h-[100dvh] w-[100vw] overflow-hidden overflow-y-scroll py-4 pb-16 text-[white]">
                <div className="flex-1 flex-grow px-4 space-y-2">
                    <div className="h-max flex-grow space-y-4 pt-2">
                        <h1 className="text-xl font-bold text-[rgb(255,255,255)]">
                            Artistas
                        </h1>
                        <div
                            id="artist-scroll-id"
                            className="flex w-[100vw] flex-row space-x-2 overflow-y-scroll pr-8"
                        >
                            {topArtists.length > 0 && topArtistsMostListened ? (
                                topArtists
                                    .filter(
                                        (
                                            value,
                                            index,
                                            self // retira valores duplicados ()
                                        ) =>
                                            index ===
                                            self.findIndex(
                                                (item) =>
                                                    item.name === value.name
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
                                <ArtistElement
                                    ArtistName={'Sem artistas'}
                                    ImageSource={
                                        'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
                                    }
                                ></ArtistElement>
                            )}
                        </div>
                    </div>

                    <div className="h-max flex-grow space-y-2">
                        <h4 className="text-xl font-bold">
                            Playlists públicas
                        </h4>
                        <div className="flex flex-row flex-wrap">
                            {playlists?.items.map((item) => {
                                if (
                                    item.owner.display_name === user.name &&
                                    item.name !==
                                        'My recommendation playlist' &&
                                    item.public === true
                                ) {
                                    return (
                                        <PlaylistElement
                                            key={item.id}
                                            url={item.external_urls.spotify}
                                            imageSource={item.images[0].url}
                                            title={item.name}
                                        />
                                    )
                                }
                            })}
                        </div>
                    </div>

                    <div className="h-max flex-grow space-y-3 ">
                        <h1 className="text-xl font-bold">Seus principais</h1>
                        <div className="flex flex-row flex-wrap gap-1">
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
                            <CardElement
                                LinkTo={'genres'}
                                BgSource="https://i.imgur.com/8DwxSys.png"
                                CardTitle="Todos"
                            ></CardElement>
                        </div>
                    </div>
                </div>
                <BottomNavigation></BottomNavigation>
            </div>
        )
    }
}
