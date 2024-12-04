import shareIcon from '../assets/shareIcon.png'
import GoBackButton from '../components/GoBackButton'
import BottomNavigation from '../components/BottomNavigation'
import { useState, useEffect } from 'react'
import {countGenres} from '../hooks/Utils'
import {getAllItems, getItemsByRange} from '../hooks/LocalStorage'
import Filter from '../components/Filter'
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

export default function GenresView() {
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
                <GoBackButton Title="Gêneros mais ouvidos"></GoBackButton>

                <div className="flex flex-col items-center bg-gradient-to-t from-dark py-3">
                    <span className="flex h-64 w-[100vw] items-center justify-center py-2">

                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={graphData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <XAxis
                                    tick={{ fontSize: '12px' }}
                                    dataKey="name"
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="value"
                                    stackId="a"
                                    fill="#1DB954"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </span>
                </div>
            </span>

            <Filter 
                filterByLong={()=> setCurrentDataRange(artistsLong)}
                filterByMedium={()=> setCurrentDataRange(artistsMedium)}
            ></Filter>

            <div className="h-max flex-grow space-y-2 text-sm font-extralight">
                <p className="font-normal text-green">
                    Quase uma retrospectiva.
                </p>
                <p>
                    Confira o gráfico de pizza com os 5 gêneros musicais mais
                    populares, com base nos 50 artistas mais ouvidos e seus
                    principais estilos. Ele mostra os gêneros que mais marcaram
                    suas playlists ao longo do tempo.
                </p>

                <p>
                    Com essa análise, você pode perceber se você está mais para
                    o{' '}
                    <strong>
                        {allGenres[0]
                            ? allGenres[0][0]
                            : 'Gênero não disponível'}
                    </strong>
                    , ou quem sabe, mergulhado no ritmo do{' '}
                    <strong>
                        {allGenres[1]
                            ? allGenres[1][0]
                            : 'Gênero não disponível'}
                    </strong>
                    . Quem diria que o{' '}
                    <strong>
                        {allGenres[2]
                            ? allGenres[2][0]
                            : 'Gênero não disponível'}
                    </strong>{' '}
                    também estaria entre os seus mais ouvidos? E, claro, sempre
                    tem aquele gênero inesperado, como{' '}
                    <strong>
                        {allGenres[3]
                            ? allGenres[3][0]
                            : 'Gênero não disponível'}
                    </strong>
                    , que aparece de surpresa e te faz questionar se você tem
                    uma veia mais eclética do que imaginava!
                </p>

                <p>
                    Além disso, ao lado, você verá uma lista dos outros gêneros
                    presentes na sua biblioteca musical, organizados pela
                    quantidade de vezes que seus artistas mais ouvidos estão
                    associados a eles. Isso mostra a diversidade da sua coleção
                    musical e a variedade dos seus gostos.
                </p>

                <p className="font-normal text-green">Outros gêneros:</p>
                <div className="flex-row flex flex-wrap gap-2">
                    {allGenres.map((genre, index) => (
                        <div className={`px-2 py-0.5 h-6 flex  bg-[#212121] rounded-lg`} key={index}>
                            {genre[0]}: {genre[1]}
                        </div>
                    ))}
                </div>
            </div>
            <BottomNavigation></BottomNavigation>
        </div>
    )
}
