import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/img/wv-logo-nobg.png";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-wv-red flex items-center justify-between px-8 py-4">
            <Link to="/" className="flex items-center gap-10">
                <img src={logo} alt="Wolvesville logo" className="w-12 h-12" />
                <h1 className="text-white text-lg hidden md:block lg:block">Wolvesville tracker</h1>
            </Link>
            <div className="hidden md:flex items-center gap-10">
                <Link to="/guessTheRole" className="text-white text-lg border-b-4 border-transparent hover:border-white">GTR</Link>
                <Link to="/roles" className="text-white text-lg border-b-4 border-transparent hover:border-white">Roles</Link>
                <Link to="/rolesRotation" className="text-white text-lg border-b-4 border-transparent hover:border-white">Roles rotation</Link>
            </div>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-wv-red flex flex-col items-center gap-4 py-4">
                    <Link to="/guessTheRole" className="text-white text-lg border-b-4 border-transparent hover:border-white" onClick={toggleMenu}>GTR</Link>
                    <Link to="/roles" className="text-white text-lg border-b-4 border-transparent hover:border-white" onClick={toggleMenu}>Roles</Link>
                    <Link to="/rolesRotation" className="text-white text-lg border-b-4 border-transparent hover:border-white" onClick={toggleMenu}>Roles rotation</Link>
                </div>
            )}
        </header>
    );
};