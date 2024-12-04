import shareIcon from '../assets/shareIcon.png'
import SongItem from '../components/SongItem'
import GoBackButton from '../components/GoBackButton'
import Filter from '../components/Filter'
import { useState, useEffect } from 'react'
import { countGenres } from '../hooks/Utils'
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
} from 'recharts'

import {getAllItems, getItemsByRange} from '../hooks/LocalStorage'

export default function FavArtists() {
    const [allGenres, setAllGenres] = useState([])
    const [graphData, setGraphData] = useState();

    const [currentDataRange, setCurrentDataRange] = useState([]);

    const [artistsLong, setArtistLong] = useState([])
    const [artistsMedium, setArtistMedium] = useState([])

    useEffect(() => {
        let artistsLong = getItemsByRange("artists", "long_term").items;
        let artistsMedium = getItemsByRange("artists", "medium_term").items;

        setArtistLong(artistsLong);
        setArtistMedium(artistsMedium);

        setCurrentDataRange(artistsLong);
    }, [])

    useEffect(() => {
        let genresCount = countGenres(currentDataRange);
        formatDataForGraph(genresCount)
        setAllGenres(genresCount)

    }, [currentDataRange])

    function formatDataForGraph(data) {
        const result = data.slice(0, 5).map(([name, value]) => ({
            name,
            value,
        }))

        setGraphData(result)
    }



    return (
        <div className="flex flex-col space-y-4 bg-dark px-6 pt-4 text-[white]">
            <span>
                <GoBackButton Title="Principais artistas"></GoBackButton>

                <div className="flex flex-col items-center bg-gradient-to-t from-dark">
                    <span className="flex h-64 w-[100vw] items-center justify-center">
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
            </span>

            <div className="flex flex-row justify-between pr-5">

            <Filter 
                filterByLong={()=> setCurrentDataRange(artistsLong)}
                filterByMedium={()=> setCurrentDataRange(artistsMedium)}
            ></Filter>
            
                            <button className="flex items-center gap-2">
                    <img src={shareIcon} alt="" />
                </button>
            </div>

            <div className="h-max flex-grow space-y-3 bg-dark">
                <>
                    {currentDataRange?.slice(0,20).map((e, i) => (
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
    )

    function formatGenres(genres) {
        let genresList = genres.join(', ').toString()

        if (genresList.length > 20) {
            return genresList.substring(0, 20) + '...'
        }
        return genresList
    }
}
