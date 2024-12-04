import { Link, useLocation} from 'react-router-dom'
import { SpotifyAuth, getAccessToken } from '../hooks/API'
import { useEffect } from 'react';
export default function Introduction () {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        const accessToken = getAccessToken(hash)
    
        if(accessToken) {
            console.log(accessToken)
        }

    }, [location])



    return (
        <div className="bg-[url('./assets/bg.png')] bg-cover pt-4 px-6 text-light  flex flex-col ">
            <div className="space-y-4 flex-grow h-max pt-8">
                <span>
                    <h1 className="font-black text-3xl">Recapfy</h1>
                    <h2 className="font-normal text-green text-[0.7rem]">Um pequeno explorador do Spotify</h2>
                </span>
                
                <div className="space-y-4 text-sm font-light">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <ul className='pl-8 list-disc'>
                        <li>Metal - 12min</li>
                        <li>Punk - 12min</li>
                        <li>Funk - 12min</li>
                        <li>Rock Alternativo - 12min</li>
                    </ul>
                </div>
            </div>
            <Link onClick={SpotifyAuth} className='w-full my-8 text-center px-4 py-2 hover:bg-dark hover:text-green bg-green text-dark font-medium rounded-3xl '>
                Conectar-se
            </Link>
        </div>
    )
}