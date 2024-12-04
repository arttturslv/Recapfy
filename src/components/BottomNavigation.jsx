import { Link } from 'react-router-dom'
import homeIcon from '../assets/home.png'
import profileIcon from '../assets/profile.png'

export default function BottomNavigation () {
    return (
        <div className=" self-end place-self-end justify-self-stretch h-[3rem] w-[100%] p-4 px-8 flex justify-between bg-dark">
            <Link to={"/home"} className="flex flex-col justify-center items-center">
                <img src={homeIcon} className='size-4' alt="" />
                <p className='text-[12px] text-[white]'>Home</p>
            </Link>
            <Link to={"/me"} className="flex flex-col justify-center items-center">
                <img src={profileIcon} className='size-4'  alt="" />
                <p className='text-[12px] text-[white]'>Profile</p>
            </Link>
        </div>
    )
}