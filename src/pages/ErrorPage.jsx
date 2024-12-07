import DataNotFoundAnimation from '../assets/animations/dataNotFoundAnimation'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ error, message, pageTitle }) {

    let navigate  = useNavigate();

    console.log(error.message)
    return (
        <div className="flex h-[100vh] w-[100vw] justify-center items-center space-y-4 overflow-hidden overflow-y-scroll py-4 pb-16 text-[white]">
            <div className="flex flex-col justify-center items-center gap-6">
                <h2 className="text-center text-4xl font-black uppercase">
                    {pageTitle}
                </h2>
                <h2 className="text-center text-3xl font-black uppercase">
                    {message}
                </h2>
                <h5 className="text-center text-xl font-medium text-[#fff]/60 uppercase">
                    {error.message}
                </h5>
                <div className="w-[20%]">
                    <DataNotFoundAnimation></DataNotFoundAnimation>
                </div>
                <Link
                    onClick={()=> navigate(-1)}
                    className="my-8 w-64 rounded-3xl bg-green px-4 py-2 text-center font-medium text-dark transition-colors duration-300 hover:bg-dark hover:text-green"
                >
                  Retornar
                </Link>
            </div>
            
        </div>
    )
}
