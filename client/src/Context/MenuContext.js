import React, { createContext, useState } from "react";

// Créer un contexte
const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [Menu, setMenu] = useState(false); // État du thème

    const toggleMenu = () => {
        setMenu((prevMenu) => (prevMenu === false ? true : false));
    };

    return (
        <MenuContext.Provider value={{ Menu, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export default MenuContext;
