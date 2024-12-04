import { useRef, useEffect, useState } from 'react'
import chevronIcon from '../assets/chevronIcon.png'
import shareIcon from '../assets/shareIcon.png'
import { getFromLocal } from '../hooks/LocalStorage'
import { getImageColor } from '../hooks/Utils'
import GoBackButton from '../components/GoBackButton'
import BottomNavigation from '../components/BottomNavigation'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts'
import { getAllItems } from '../hooks/LocalStorage'
export default function Profile() {
    const [artists, setArtists] = useState([])
    const [allGenres, setAllGenres] = useState([])
    const [graphData, setGraphData] = useState()
    const [totalTracks, setTotalTracks] = useState()
    const [totalArtists, setTotalArtists] = useState()

    useEffect(() => {
        let artists = getAllItems('artists')
        let tracks = getAllItems('tracks')

        let artistsItems = artists.items

        setTotalTracks(tracks.long_total)
        setTotalArtists(artists.long_total)

        countGenres(artistsItems)
        setArtists(artistsItems)
    }, [])

    //para calcular o tempo gasto por genero, tenho que pegar os artistas e pegar todos os generos
    // e depois contar quantas vezes cada um aparece.
    var highestValue = 0
    function countGenres(allArtists) {
        const genres = new Map()
        for (const artist of allArtists) {
            for (const genre of artist.genres) {
                if (genres.has(genre)) {
                    let val = genres.get(genre)
                    val++
                    genres.set(genre, val)

                    if (highestValue < val) {
                        highestValue == val
                    }
                } else {
                    genres.set(genre, 1)
                }
            }
        }

        let array = Array.from(genres)

        let arrayOrdenado = array.sort((a, b) => b[1] - a[1])

        setAllGenres(arrayOrdenado)

        const result = arrayOrdenado.slice(0, 6).map(([name, value]) => ({
            name,
            value,
        }))

        console.log(result)

        setGraphData(result)
    }

    const [user, setUser] = useState(getFromLocal('USER_PROFILE'))

    const imageRef = useRef()
    const backgroundRef = useRef()

    useEffect(() => {
        const fetchData = async () => {
            if (user.profile_image != null) {
                console.log('ee: ', user.profile_image)

                let divWithBackgroundImage =
                    imageRef.current.style.backgroundImage
                let imageURL = user.profile_image

                const [r, g, b, a] = await getImageColor(imageURL)

                backgroundRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
            }
        }
        fetchData()
    }, [imageRef.current, backgroundRef.current])

    function ArtistPopularity() {
        console.log(artists[0])
        let popularity = 0
        for (const artist of artists) {
            popularity += artist.popularity
        }

        return popularity / artists.length
    }

    return (
        <div className="flex flex-col bg-dark text-[white]">
            <div ref={backgroundRef} className="pt-4">
                <div className="px-6">
                    <GoBackButton>
                        <button className="flex items-center gap-2">
                            <img src={shareIcon} alt="" />
                        </button>
                    </GoBackButton>
                </div>

                <div className="flex flex-col items-center bg-gradient-to-t from-dark py-3">
                    <div>
                        <img
                            crossOrigin="anonymous"
                            ref={imageRef}
                            className="h-44 w-auto rounded-full"
                            src={user.profile_image}
                            alt=""
                        />
                        <h4 className="text-center text-2xl font-bold">
                            {user.name}
                        </h4>
                    </div>
                    <div className="flex w-[80%] justify-around text-center">
                        <span>
                            <strong>{user.followers}</strong>
                            <p className="text-sm text-[white]/80">FOLLOWERS</p>
                        </span>
                        <span>
                            <strong>34</strong>
                            <p className="text-sm text-[white]/80">FOLLOWERS</p>
                        </span>
                    </div>
                </div>
            </div>

            <div className="h-max flex-grow">
                <div className="h-max flex-grow space-y-3 px-6 pt-2">
                    <h4 className="font-bold">Gêneros mais ouvidos</h4>
                    <span className="flex h-48 items-center justify-center">
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

                <div className="h-max flex-grow space-y-3 px-6 pt-2">
                    <h4 className="font-bold">Suas estatisticas</h4>
                    <div className="flex gap-2 py-2 flex-row flex-wrap">
                        <span className="rounded-lg bg-[#212121] px-4 py-2 text-center">
                            <strong className="text-lg">
                                ≅{ new Intl.NumberFormat('de-DE').format(totalTracks * 3)}
                            </strong>
                            <p className="text-sm text-[white]/80">
                                Minutos ouvidos
                            </p>
                        </span>
                        <span className="rounded-lg bg-[#212121] px-4 py-2 text-center">
                            <strong className="text-lg">
                                {ArtistPopularity()}
                            </strong>
                            <p className="text-sm text-[white]/80">
                                Popularidade dos artistas
                            </p>
                        </span>

                        <span className="rounded-lg bg-[#212121] px-4 py-2 text-center">
                            <strong className="text-lg">
                                ≅{ new Intl.NumberFormat('de-DE').format(totalArtists)}
                            </strong>
                            
                            <p className="text-sm text-[white]/80">
                                Artistas ouvidos
                            </p>
                        </span>
                    </div>
                </div>
            </div>
            <BottomNavigation></BottomNavigation>
        </div>
    )
}
