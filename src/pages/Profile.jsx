import { useRef, useEffect, useState } from 'react'
import shareIcon from '../assets/shareIcon.png'
import { getFromLocal } from '../hooks/LocalStorage'
import { getImageColor } from '../hooks/Utils'
import GoBackButton from '../components/GoBackButton'
import BottomNavigation from '../components/BottomNavigation'
import { countGenres } from '../hooks/Utils'
import StaticsElement from '../components/StaticsElement'
import ErrorPage from './ErrorPage'

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts'
import { getAllItems } from '../hooks/LocalStorage'
import PlaylistElement from '../components/PlaylistElement'
export default function Profile() {
    const [artists, setArtists] = useState([])
    const [allGenres, setAllGenres] = useState([])
    const [graphData, setGraphData] = useState()
    const [totalTracks, setTotalTracks] = useState()
    const [totalArtists, setTotalArtists] = useState()
    const [hasError, setHasError] = useState()
    const [playlists, setPlaylists] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        let artists, tracks, playlists, user;
        try {
            artists = getAllItems('artists')
            playlists = getFromLocal('USER_PLAYLISTS');
            user = getFromLocal('USER_PROFILE');
            let genresCount = countGenres(artists.items)
            formatDataForGraph(genresCount)
            setAllGenres(genresCount)
            tracks = getAllItems('tracks')
        } catch (error) {
            setHasError(error)
        }

        setTotalTracks(tracks?.long_total)
        setTotalArtists(artists?.long_total)
        setArtists(artists?.items);
        setPlaylists(playlists)
        setUser(user)


    }, [])

    function formatDataForGraph(data) {
        const result = data.slice(0, 5).map(([name, value]) => ({
            name,
            value,
        }))

        setGraphData(result)
    }


    const imageRef = useRef()
    const backgroundRef = useRef()
    const backgroundRef2 = useRef()

    useEffect(() => {
        const fetchData = async () => {
            if (user.profile_image != null) {
                let imageURL = user.profile_image

                const [r, g, b, a] = await getImageColor(imageURL)
                backgroundRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
                backgroundRef2.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
            }
        }
        fetchData()
    }, [imageRef.current, backgroundRef.current])

    function ArtistPopularity() {
        let popularity = 0
        for (const artist of artists) {
            popularity += artist.popularity
        }
        return popularity / artists.length
    }

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
        <div className="h-[100vh] w-[100vw] overflow-hidden overflow-y-scroll pb-16 text-[white]">
            <div ref={backgroundRef} className="pt-4">
                <div className="px-6">
                    <GoBackButton>
                        <button className="flex items-center gap-2">
                            <img src={shareIcon} alt="" />
                        </button>
                    </GoBackButton>
                </div>

                <div className="flex flex-col items-center bg-gradient-to-t from-dark/40 pb-10">
                    <div className="sm:flex sm:items-center sm:gap-6">
                        <img
                            crossOrigin="anonymous"
                            ref={imageRef}
                            className="h-44 w-auto rounded-full shadow-2xl sm:h-48"
                            src={user?.profile_image}
                            alt=""
                        />
                        <div>
                            <h4 className="text-center text-2xl font-bold sm:text-6xl">
                                {user?.name}
                            </h4>
                            <div className="flex max-sm:justify-around max-sm:text-center">
                                <span className="sm:flex sm:items-center sm:gap-1">
                                    <strong>{user?.followers}</strong>
                                    <p className="text-center text-sm text-[white]/80 max-sm:uppercase">
                                        seguidores
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-max flex-grow bg-dark pb-10">
                <div
                    ref={backgroundRef2}
                    className="h-max flex-grow space-y-2 bg-gradient-to-t from-dark to-dark/60 px-6 pt-2"
                >
                    <h4 className="font-bold text-xl">Gêneros mais ouvidos</h4>
                    <span className="flex h-40 items-center justify-center sm:h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart
                                cx="50%"
                                cy="50%"
                                outerRadius="60%"
                                data={graphData}
                            >
                                <PolarGrid />
                                <PolarAngleAxis
                                    style={{ fontSize: '12' }}
                                    dataKey="name"
                                />
                                <Radar
                                    name="Radar de gêneros musicais"
                                    dataKey="value"
                                    stroke="#1DB954"
                                    fill="#1DB954"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </span>
                </div>

                <div className="h-max flex-grow space-y-2 px-6 pt-2">
                    <h4 className="font-bold text-xl">Playlists públicas</h4>
                    <div className="flex flex-row flex-wrap sm:gap-2 py-2">
                        {playlists?.items.map((item) => {
                            if (
                                item.owner.display_name === user.name &&
                                item.name !== 'My recommendation playlist' &&
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

                <div className="h-max flex-grow space-y-2 px-6 pt-2">
                    <h4 className="font-bold text-xl">Suas estatisticas</h4>
                    <div className="flex flex-row flex-wrap gap-2 py-2">
                        <StaticsElement
                            title={new Intl.NumberFormat('de-DE').format(
                                totalTracks * 3
                            )}
                            subtitle={'Minutos ouvidos'}
                        ></StaticsElement>

                        <StaticsElement
                            title={'≅' + totalTracks}
                            subtitle={'Músicas ouvidas'}
                        ></StaticsElement>

                        <StaticsElement
                            title={ArtistPopularity()}
                            subtitle={'Popularidade dos artistas'}
                        ></StaticsElement>

                        <StaticsElement
                            title={new Intl.NumberFormat('de-DE').format(
                                totalTracks
                            )}
                            subtitle={'Artistas ouvidos'}
                        ></StaticsElement>
                    </div>
                </div>
            </div>
            <BottomNavigation></BottomNavigation>
        </div>
    )
}
}
