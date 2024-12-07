import GoBackButton from '../components/GoBackButton'
import BottomNavigation from '../components/BottomNavigation'
import { useState, useEffect } from 'react'
import { countGenres } from '../hooks/Utils'
import { getItemsByRange } from '../hooks/LocalStorage'
import Filter from '../components/Filter'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import ErrorPage from './ErrorPage'

export default function GenresView() {
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
        setCurrentDataRange(
            artistsLong?.length > 0 ? artistsLong : artistsMedium
        )
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
                pageTitle={'Visão de gêneros'}
                error={hasError}
                message={'Não conseguimos localizar seus dados.'}
            />
        )
    } else {
        return (
            <div className="flex h-[100vh] w-[100vw] flex-col space-y-4 overflow-hidden overflow-y-scroll py-4 pb-16 text-[white]">
                <div className="space-y-2 px-6">
                    <span>
                        <GoBackButton Title="Gêneros mais ouvidos"></GoBackButton>

                        <div className="flex flex-col items-center bg-gradient-to-t from-dark py-3">
                            <span className="flex h-64 w-[100vw] items-center justify-center py-2 md:w-[40em]">
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

                        <Filter
                            filterByLong={() =>
                                setCurrentDataRange(artistsLong)
                            }
                            filterByMedium={() =>
                                setCurrentDataRange(artistsMedium)
                            }
                        ></Filter>
                    </span>

                    <div className="h-max flex-grow space-y-2 text-sm font-extralight">
                        <p className="font-normal text-green">
                            Quase uma retrospectiva.
                        </p>
                        <p>
                            Confira o gráfico de pizza com os 5 gêneros musicais
                            mais populares, com base nos 50 artistas mais
                            ouvidos e seus principais estilos. Ele mostra os
                            gêneros que mais marcaram suas playlists ao longo do
                            tempo.
                        </p>

                        <p>
                            Com essa análise, você pode perceber se você está
                            mais para o{' '}
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
                            também estaria entre os seus mais ouvidos? E, claro,
                            sempre tem aquele gênero inesperado, como{' '}
                            <strong>
                                {allGenres[3]
                                    ? allGenres[3][0]
                                    : 'Gênero não disponível'}
                            </strong>
                            , que aparece de surpresa e te faz questionar se
                            você tem uma veia mais eclética do que imaginava!
                        </p>

                        <p>
                            Além disso, ao lado, você verá uma lista dos outros
                            gêneros presentes na sua biblioteca musical,
                            organizados pela quantidade de vezes que seus
                            artistas mais ouvidos estão associados a eles. Isso
                            mostra a diversidade da sua coleção musical e a
                            variedade dos seus gostos.
                        </p>

                        <p className="font-normal text-green">
                            Outros gêneros:
                        </p>
                        <div className="flex flex-row flex-wrap gap-2">
                            {allGenres.map((genre, index) => (
                                <div
                                    className={`flex h-6 rounded-lg bg-[#212121] px-2 py-0.5`}
                                    key={index}
                                >
                                    {genre[0]}: {genre[1]}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <BottomNavigation></BottomNavigation>
            </div>
        )
    }
}
