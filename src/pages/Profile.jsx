import { useRef, useEffect } from 'react'
import chevronIcon from '../assets/chevronIcon.png'
import shareIcon from '../assets/shareIcon.png'

import { getImageColor } from '../hooks/Utils'
import GoBackButton from '../components/GoBackButton'

export default function Profile(
    {
        ImageSource = "https://upload.wikimedia.org/wikipedia/pt/f/fb/Beatles-one.jpg", 
        Title, URL }) 
    {
    const imageRef = useRef()
    const backgroundRef = useRef()

    useEffect(() => {
        if(imageRef.current && backgroundRef.current) {
            const [r,g,b,a] = getImageColor(imageRef.current)
            backgroundRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        }
    }, [imageRef])


    return (
        <div  className="text-[white] h-full flex flex-col bg-dark">

            <div ref={backgroundRef} className='pt-4 '>
                <div className='px-6'>
                    <GoBackButton>
                        <button className="flex items-center gap-2">
                            <img src={shareIcon} alt="" />
                        </button>
                    </GoBackButton>
                </div>


                <div className='flex flex-col items-center py-3 bg-gradient-to-t from-dark '>
                    <div>
                        <img crossOrigin='anonymous' ref={imageRef} className="h-44 w-auto rounded-full" src={ImageSource} alt="" />
                        <h4 className='text-center font-bold text-2xl'>Arttttur</h4>
                    </div>
                    <div className='w-[80%] text-center flex justify-around'>
                        <span>
                            <strong>58</strong>
                            <p className='text-sm text-[white]/80'>FOLLOWERS</p>
                        </span>
                        <span>
                            <strong>34</strong>
                            <p className='text-sm text-[white]/80'>FOLLOWERS</p>
                        </span>
                    </div>
                </div>

            </div>


            
            <div className="flex-grow h-max">
                   
                <div className="space-y-3 pt-2 px-6 flex-grow h-max ">
                    <h4 className=' font-bold'>Gêneros mais ouvidos</h4>
                    <div className='flex justify-center py-2'>
                        <img src="https://i.imgur.com/NWFpdmV.png" alt="" />
                    </div>
                </div>

                <div className="space-y-3 pt-2 px-6 flex-grow h-max ">
                    <h4 className=' font-bold'>Suas estatisticas</h4>
                    <div className='flex gap-2 justify-around py-2'>
                        <span className='text-center'>
                            <strong className='text-lg'>1545.51</strong>
                            <p className='text-sm text-[white]/80'>Minutos ouvidos</p>
                        </span>
                        <span className='text-center'>
                            <strong className='text-lg'>150</strong>
                            <p className='text-sm text-[white]/80'>Gêneros ouvidos</p>
                        </span>
                    </div>
                </div>

            </div>

        </div>
    )
}