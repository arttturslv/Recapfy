import homeIcon from '../assets/home.png'
import profileIcon from '../assets/profile.png'

export default function BottomNavigation () {
    return (
        <div className=" self-end place-self-end justify-self-stretch h-[3rem] w-[100%] p-4 px-8 flex justify-between">
            <div className="flex flex-col justify-center items-center">
                <img src={homeIcon} alt="" />
                <p className='text-[12px] text-[white]'>Home</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <img src={profileIcon} alt="" />
                <p className='text-[12px] text-[white]'>Profile</p>
            </div>
        </div>
    )
}