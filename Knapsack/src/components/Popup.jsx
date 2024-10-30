import React from 'react';

const Popup = ({ matriceDP, objetsSelectionnes, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
            <div className="bg-white p-8 rounded-lg w-[60%] max-h-[90%] flex flex-col overflow-auto relative"> {/* Add relative positioning here */}
                <button className="text-gray-600 bg-white absolute top-4 right-4 w-fit text-sm" onClick={onClose}> {/* Change to absolute positioning */}
                    X
                </button>

                <h3 className="text-xl text-black font-semibold mt-4">Matrice DP :</h3>
                <table className="border border-gray-300 mt-2 mb-4 w-full text-black">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 text-black">Objets/Capacité</th>
                            {[...Array(matriceDP[0].length)].map((_, j) => (
                                <th key={j} className="border border-gray-300 text-black">{j}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {matriceDP.map((row, i) => (
                            <tr key={i}>
                                <td className="border border-gray-300 text-black">{i}</td>
                                {row.map((val, j) => (
                                    <td key={j} className="border border-gray-300 text-black">{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3 className="text-xl font-semibold mt-4 text-black">Objets Sélectionnés :</h3>
                <ul>
                    {objetsSelectionnes.length > 0 ? (
                        objetsSelectionnes.map((objet, index) => (
                            <li key={index} className='text-black'>
                                {objet.nom} - Poids: {objet.poids}, Valeur: {objet.valeur}
                            </li>
                        ))
                    ) : (
                        <li className='text-black'>Aucun objet sélectionné.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Popup;
