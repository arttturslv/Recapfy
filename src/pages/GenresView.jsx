import chevronIcon from '../assets/chevronIcon.png'
import shareIcon from '../assets/shareIcon.png'
import GoBackButton from '../components/GoBackButton'

export default function GenresView() {

    return (
        <div  className="text-[white] h-full space-y-4 flex flex-col pt-4 px-6 bg-dark">

            <span>
                <GoBackButton Title="Gêneros mais ouvidos"></GoBackButton>

                <div className='flex flex-col items-center py-3 bg-gradient-to-t from-dark '>
                    <span className='flex justify-center py-2'>
                        <img src="https://i.imgur.com/BMW4nxr.png" alt="" />
                    </span>
                </div>
            </span>

            <div className="flex flex-row justify-between pr-5">
                <div className='space-x-2'>
                    <button className='px-4 py-0.5 bg-green text-dark rounded-3xl '>1 ano</button>
                    <button className=' opacity-40 px-4 py-0.5 bg-grey text-white rounded-3xl '>6 meses</button>
                </div>
                <button className="flex items-center gap-2">
                    <img src={shareIcon} alt="" />
                </button>
            </div>

            <div className="flex-grow h-max font-extralight text-sm space-y-2">
                <p className='text-green font-normal'>Quase uma retrospectiva.</p>
                <p>Aqui mostra os generos mais ouvidos pelo minuto, ela é com base na quantidade de musicas que você tem e os generos delas. text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <ul>
                   <li className='text-green font-normal'>Outros gêneros:</li>
                    <ul className='pl-8 list-disc'>
                        <li>Metal - 12min</li>
                        <li>Punk - 12min</li>
                        <li>Funk - 12min</li>
                        <li>Rock Alternativo - 12min</li>
                    </ul>
                </ul>
            </div>

        </div>
    )
}