import { Link } from 'react-router-dom'
import homeIcon from '../assets/home.png'
import profileIcon from '../assets/profile.png'

export default function BottomNavigation() {
    return (
        <div className="fixed bottom-0 w-full flex h-[3.5rem] justify-between bg-gradient-to-t to-[#000]/20 from-[#000] px-16">
            <Link
                to={'/home'}
                className="flex flex-col items-center justify-center"
            >
                <img src={homeIcon} className="size-4" alt="" />
                <p className="text-[12px] text-[white]">Home</p>
            </Link>
            <Link
                to={'/me'}
                className="flex flex-col items-center justify-center"
            >
                <img src={profileIcon} className="size-4" alt="" />
                <p className="text-[12px] text-[white]">Profile</p>
            </Link>
        </div>
    )
}
