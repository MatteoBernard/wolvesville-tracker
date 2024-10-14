import { Link } from "react-router-dom";
import logo from "../assets/img/wv-logo-nobg.png";

export const Header = () => {
    return (
        <header className="bg-wv-red flex items-center justify-between px-8 py-4">
            <Link to="/" className="flex items-center gap-10">
                <img src={logo} alt="Wolvesville logo" className="w-16 h-16" />
                <h1 className="text-white text-2xl">Wolvesville tracker</h1>
            </Link>
            <div className="flex items-center gap-10">
                <Link to="/roles" className="text-white text-2xl border-b-4 border-transparent hover:border-white">Roles</Link>
                <Link to="/rolesRotation" className="text-white text-2xl border-b-4 border-transparent hover:border-white">Roles rotation</Link>
            </div>
        </header>
    )
}