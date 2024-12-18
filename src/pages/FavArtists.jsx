import SongItem from '../components/SongItem'
import GoBackButton from '../components/GoBackButton'
import Filter from '../components/Filter'
import { useState, useEffect } from 'react'
import { countGenres } from '../hooks/Utils'
import BottomNavigation from '../components/BottomNavigation'
import ErrorPage from './ErrorPage'

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
} from 'recharts'

import { getItemsByRange } from '../hooks/LocalStorage'

export default function FavArtists() {
    const [allGenres, setAllGenres] = useState([])
    const [graphData, setGraphData] = useState()

    const [currentDataRange, setCurrentDataRange] = useState([])

    const [artistsLong, setArtistLong] = useState([])
    const [artistsMedium, setArtistMedium] = useState([])

    const [hasError, setHasError] = useState(null)

    useEffect(() => {
        let artistsLong, artistsMedium

        try {
            artistsLong = getItemsByRange('artists', 'long_term').items
            artistsMedium = getItemsByRange('artists', 'medium_term').items
        } catch (error) {
            setHasError(error)
        }

        setArtistLong(artistsLong)
        setArtistMedium(artistsMedium)
        setCurrentDataRange(artistsLong)
    }, [])

    useEffect(() => {
        try {
            if (currentDataRange?.length > 0) {
                let genresCount = countGenres(currentDataRange)
                formatDataForGraph(genresCount)
                setAllGenres(genresCount)
            }
        } catch (error) {
            setHasError(error)
        }
    }, [currentDataRange])

    function formatDataForGraph(data) {
        const result = data.slice(0, 5).map(([name, value]) => ({
            name,
            value,
        }))

        setGraphData(result)
    }

    if (hasError) {
        return (
            <ErrorPage
                pageTitle={'Visão de artistas favoritos'}
                error={hasError}
                message={'Não conseguimos localizar seus dados.'}
            />
        )
    } else {
        return (
            <div className="flex h-[100vh] w-[100vw] flex-col space-y-4 overflow-hidden overflow-y-scroll py-4 pb-16 text-[white]">
                <div className="space-y-2 px-6">
                    <span>
                        <GoBackButton Title="Principais artistas"></GoBackButton>

                        <div className="flex flex-col items-center bg-gradient-to-t from-dark">
                            <span className="flex h-64 w-[100vw] items-center justify-center py-2 md:w-[40em]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Tooltip />
                                        <Pie data={graphData} fill="#1DB954">
                                            <LabelList
                                                dataKey="name"
                                                position="right"
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: 'lighter',
                                                }}
                                            />
                                            {graphData?.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill="#1DB954"
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </span>
                        </div>
                        <Filter
                            filterByLong={() =>
                                setCurrentDataRange(artistsLong)
                            }
                            filterByMedium={() =>
                                setCurrentDataRange(artistsMedium)
                            }
                        ></Filter>
                    </span>

                    <div className="h-max flex-grow bg-dark">
                        <>
                            {currentDataRange?.slice(0, 20).map((e, i) => (
                                <SongItem
                                    key={i}
                                    URL={e.external_urls.spotify}
                                    Title={e.name}
                                    index={i}
                                    ImageSource={e.images[2].url}
                                    Subtitle={formatGenres(e.genres)}
                                ></SongItem>
                            ))}
                        </>
                    </div>
                </div>
                <BottomNavigation></BottomNavigation>
            </div>
        )
    }

    function formatGenres(genres) {
        let genresList = genres.join(', ').toString()

        if (genresList.length > 20) {
            return genresList.substring(0, 20) + '...'
        }
        return genresList
    }
}
