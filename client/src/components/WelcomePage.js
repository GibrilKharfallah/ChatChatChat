import React from 'react';

const WelcomePage = ( { SetPseudo, SetIsPseudoPage } ) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        SetIsPseudoPage(false)
    }

    return (
        <div className="h-[90vh] w-screen flex items-center justify-center bg-gray-300 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <p className="p-4 text-lg font-semibold text-center">
                    Veuillez choisir un Pseudo ?
                </p>
                <form action="" className="flex flex-col items-center gap-4">
                    <input type="text" onChange={ (e) => SetPseudo(e.target.value)} placeholder="Entrez votre Pseudo..." className="w-full p-2 rounded-md border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <input type="submit" className="p-4" onClick={handleSubmit} value="Envoyer" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"/>
                </form>
            </div>
        </div>
    );
};

export default WelcomePage;