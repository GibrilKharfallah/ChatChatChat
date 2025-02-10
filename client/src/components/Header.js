import React, { useState } from 'react';
 
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
 
    const handleExit = () => {
        window.close(); // Ferme la page internet
    };
 
    return (
        <div className="h-[10vh] bg-gray-900 text-white flex items-center justify-between p-4 shadow-lg text-xl relative">
            <h1>Welcome to Chatchatchat   </h1>
            <div className="relative">
                {/* Burger icon */}
                <button
                    className="text-white hover:text-gray-400 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
 
                {/* Dropdown menu with animation */}
                <div
                    className={`absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
                        isMenuOpen
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >
                    <ul className="flex flex-col">
                        <li
                            className="p-4 hover:bg-gray-700 cursor-pointer"
                            onClick={() => alert('Personal Info clicked')}
                        >
                            Personal Info
                        </li>
                        <li
                            className="p-4 hover:bg-gray-700 cursor-pointer"
                            onClick={() => alert('Settings clicked')}
                        >
                            Settings
                        </li>
                        <li
                            className="p-4 hover:bg-red-700 text-red-400 cursor-pointer"
                            onClick={handleExit}
                        >
                            Exit
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
 
export default Header