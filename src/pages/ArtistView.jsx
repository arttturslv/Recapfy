import playIcon from '../assets/playIcon.png'
import GoBackButton from '../components/GoBackButton'
import SongItem from '../components/SongItem'
import { getImageColor } from '../hooks/Utils'

import { useParams } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import {getAllItems} from '../hooks/LocalStorage'

export default function FavArtists() {
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([])

    let { name } = useParams()

    useEffect(() => {
        if (name) {
            let tracks = getAllItems("tracks").items;
            let artists = getAllItems("artists").items;
            setArtist(findArtist(name, artists));

            let artistTracks=[];
            let artistHasTrackItem;
            
            for(let i=0; i<tracks.length; i++) {
                artistHasTrackItem = tracks[i].artists.find((el)=> el.name==name);
                
                if(artistHasTrackItem && !artistTracks.some((e) => e.name === tracks[i].name)) { //verifica duplicatas também, pela parte de ter 6m e all.
                    artistTracks.push(tracks[i]);
                }
            }
            setSongs([...artistTracks]);
        }
    }, [name])

    function findArtist(artistName, allArtists) {
        for (let i = 0; i < allArtists.length; i++) {
            if (allArtists[i].name == artistName) {
                return allArtists[i]
            }
        }
    }

    const imageRef = useRef()
    const backgroundRef = useRef()

    useEffect(() => {
        const fetchData = async () => {
            if (artist?.images[0]?.url != null) {
                let divWithBackgroundImage = imageRef.current.style.backgroundImage;
                let imageURL = divWithBackgroundImage.toString().substring(5, divWithBackgroundImage.length - 2);
                
                const [r,g,b,a] = await getImageColor(imageURL);

                backgroundRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
            }
        }
        fetchData();
    }, [imageRef.current, backgroundRef.current])

    return (
        <div
            ref={backgroundRef}
            className="flex h-[100vh] w-[100vw] flex-col overflow-hidden overflow-y-scroll  text-[white] transition-all"        >
            <div>
                <div
                    crossOrigin="anonymous"
                    ref={imageRef}
                    style={{ backgroundImage: `URL(${artist?.images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
                    className="flex h-64 flex-col justify-between bg-fixed px-6 py-2 pb-2"
                >
                    <GoBackButton Title={`Artista`}></GoBackButton>
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-4xl font-black">
                                {artist?.name}
                            </h3>
                            <span className="text-sm">
                                <strong>{artist?.genres[0]}, {artist?.genres[1]}, {artist?.genres[2]}</strong><br></br>
                                { new Intl.NumberFormat('de-DE').format(artist?.followers.total)} mil ouvintes
                            </span>
                        </div>
                        <button className="size-10">
                            <img src={playIcon} alt="" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="h-[100%] bg-gradient-to-t from-[#000]  to-[#000]/60 px-6 pt-2">
                <h4 className="font-bold">Seus albums favoritos</h4>
                    <>
                    {
                        songs.map((e, i)=> 
                            <SongItem key={i} ImageSource={e.album.images[2].url} URL={e.external_urls.spotify} Title={e.name} Subtitle={e.album.name} index={i}  ></SongItem>
                        )
                    }
                    </>
            </div>
            <BottomNavigation></BottomNavigation>
        </div>
    )
}
