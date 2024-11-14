import { Link, useNavigate } from "react-router-dom";
import chevronIcon from '../assets/chevronIcon.png'

export default function GoBackButton({Title, children}) {
    const navigate = useNavigate();

    return (
        <Link className="flex justify-between " onClick={() => navigate(-1)}>
            <button className="flex items-center gap-2">
                <img src={chevronIcon} alt="Chevron icon para voltar" />
                <p className="font-bold">{Title}</p>
            </button>
            {children}
        </Link>
    )
}