import { Link, useLocation } from 'react-router-dom'
import { SpotifyAuth, getAccessToken } from '../hooks/API'
import { useEffect } from 'react'
export default function Introduction() {
    const location = useLocation()

    useEffect(() => {
        const hash = location.hash
        const accessToken = getAccessToken(hash)

        if (accessToken) {
            console.log(accessToken)
        }
    }, [location])

    return (
        <div className="flex h-[100vh] w-[100vw] flex-col overflow-x-hidden overflow-y-scroll bg-[url('./assets/bg.png')] bg-cover px-6 pt-4 text-[white]">
            <div className="flex-1 space-y-4 pt-8">
                <span>
                    <h1 className="text-3xl font-black">Recapfy</h1>
                    <h2 className="text-[0.7rem] font-normal text-green">
                        Um pequeno explorador do Spotify
                    </h2>
                </span>

                <div className="space-y-4 font-normal">
                    <p>
                        Descubra como suas músicas contam a sua história! No
                        Recapfy, você pode explorar:
                    </p>
                    <ul className="list-disc pl-8">
                        <li>Seus artistas e músicas mais ouvidos,</li>
                        <li>Os gêneros que definem seu gosto,</li>
                        <li>
                            Uma estimativa do tempo total que você passou
                            mergulhado na música,
                        </li>
                        <li>
                            A média de popularidade dos seus artistas favoritos,
                        </li>
                        <li>
                            E até quantos artistas diferentes passaram pela sua
                            playlist.
                        </li>
                    </ul>
                    <p>
                        Tudo isso com visualizações interativas, incluindo um
                        gráfico de radar que destaca os gêneros que mais
                        marcaram sua jornada musical.
                    </p>
                    <p>
                        E sabe o que é ainda melhor? O Recapfy é totalmente
                        open-source! Criamos este projeto com foco em
                        transparência e respeito à privacidade. Não coletamos
                        nenhum dado seu — tudo é processado diretamente no seu
                        navegador, usando as informações fornecidas pelo
                        Spotify. Você pode explorar seu mundo musical sem
                        preocupações!
                    </p>
                    <p>
                        Pronto para conhecer o som da sua própria trilha sonora?
                    </p>
                </div>
            </div>
            <Link
                onClick={SpotifyAuth}
                className="my-8 w-full rounded-3xl bg-green px-4 py-2 text-center font-medium text-dark transition-colors duration-300 hover:bg-dark hover:text-green"
            >
                Conectar-se
            </Link>
        </div>
    )
}
