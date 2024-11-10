import React, { useState } from 'react';
import Popup from '../components/Popup';
import '../index.css'; 
import '../app.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Solution = () => {
    const [capacite, setCapacite] = useState(0); // Capacité du sac à dos
    const [objets, setObjets] = useState([]); // Liste des objets
    const [nom, setNom] = useState(''); // Nom de l'objet
    const [poids, setPoids] = useState(''); // Poids de l'objet
    const [valeur, setValeur] = useState(''); // Valeur de l'objet
    const [resultat, setResultat] = useState(null); // Résultat du profit maximal
    const [matriceDP, setMatriceDP] = useState([]); // Matrice DP
    const [objetsSelectionnes, setObjetsSelectionnes] = useState([]); // Objets sélectionnés
    const [currentIndex, setCurrentIndex] = useState(-1); // Index de l'objet actuellement sélectionné pour modification
    const [showPopup, setShowPopup] = useState(false);

    const handleAjouterObjet = () => {
        if (nom && poids && valeur) {
            const newObjet = { nom, poids: parseInt(poids), valeur: parseInt(valeur) };

            if (currentIndex === -1) {
                // Si aucun objet n'est sélectionné, ajoute un nouvel objet
                setObjets([...objets, newObjet]);
            } else {
                // Si un objet est sélectionné, le modifie
                const updatedObjets = objets.map((objet, index) => index === currentIndex ? newObjet : objet);
                setObjets(updatedObjets);
                setCurrentIndex(-1); // Réinitialiser l'index après modification
            }

            // Réinitialiser les champs
            setNom('');
            setPoids('');
            setValeur('');
        }
    };

    const handleModifierObjet = (index) => {
        setCurrentIndex(index);
        setNom(objets[index].nom);
        setPoids(objets[index].poids);
        setValeur(objets[index].valeur);
    };

    const handleSupprimerObjet = (index) => {
        const updatedObjets = objets.filter((_, i) => i !== index);
        setObjets(updatedObjets);
        if (currentIndex === index) {
            setCurrentIndex(-1); // Réinitialiser l'index si l'objet supprimé est celui actuellement sélectionné
            setNom('');
            setPoids('');
            setValeur('');
        }
    };

    /*
    garde la trace des gains maximal possibles pour chaque capacité intermédiaire, 
    puis elle retrace les objets sélectionnés pour obtenir ce profit maximal
     */
    const handleCalculerProfitMaximal = () => {
        // ll nombre de lignes dans la matrice est le nombre des objets qu'on possède
        const n = objets.length;
        const dp = Array.from({ length: n + 1 }, () => Array(capacite + 1).fill(0));

        // remplir la table DP o(n²)
        for (let i = 1; i <= n; i++) {
            // get le poids et le gain de l'objet courant i
            const w = objets[i - 1].poids;
            const v = objets[i - 1].valeur;

            for (let sz = 1; sz <= capacite; sz++) {
                // donc le gain maximale reste le meme qu'il était en parcourant l'objet précedent
                dp[i][sz] = dp[i - 1][sz]; // Cas où on ne prend pas l’objet

                // Cas où on prend l’objet
                if (sz >= w) {
                    dp[i][sz] = Math.max(dp[i][sz], dp[i - 1][sz - w] + v);
                }
            }
        }

        // Afficher le profit maximal
        setResultat(dp[n][capacite]);
        setMatriceDP(dp);

        /**
         * on fait du backtracking pour retrouver quels objets 
         * ont été sélectionnés pour obtenir le profit maximal calculé dans la table
         */
        const selected = [];
        let w = capacite;
        for (let i = n; i > 0 && w > 0; i--) {
            if (dp[i][w] !== dp[i - 1][w]) {
                // donc l'objet a été sélectionné car il contribue dans le gain maximal
                selected.push(objets[i - 1]);
                w -= objets[i - 1].poids;
            }
        }
        setObjetsSelectionnes(selected);
    };

    return (
        <div className="home h-screen w-screen flex flex-row items-center justify-center">
            <div className='w-[90%] h-[85%] bg-white bg-opacity-30 rounded-2xl'>
                <div className='flex flex-col py-10 px-6 items-start justify-start w-full'>
                    <h1 className='text-gray-950 text-5xl font-bold mb-10'>
                        Solution proposée
                    </h1>
                    <div className='flex flex-row justify-start items-start w-full'>
                        <h2 className="text-xl mb-2 text-gray-800 mr-4 w-[18%] text-justify">Capacité du sac à dos :</h2>
                        <input
                            type="number"
                            className="border border-gray-300 rounded p-2 mb-4 bg-white text-black w-[30%] h-[10%] "
                            value={capacite}
                            placeholder="Poids du sac à dos"
                            onChange={(e) => setCapacite(parseInt(e.target.value))}
                        />
                    </div>
                    <div className='flex flex-row justify-start items-start w-full'>
                        <h2 className="text-xl mb-2 text-gray-800 mr-4 w-[18%] text-justify">Ajouter un objet :</h2>
                        <div className="mb-4 flex flex-row">
                            <input
                                type="text"
                                className="border border-gray-300 rounded p-2 mr-2 bg-white text-black w-[30%] h-[10%]"
                                placeholder="Nom de l'objet"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                            <input
                                type="number"
                                className="border border-gray-300 rounded p-2 mr-2 bg-white text-black w-[30%] h-[10%]"
                                placeholder="Poids"
                                value={poids}
                                onChange={(e) => setPoids(e.target.value)}
                            />
                            <input
                                type="number"
                                className="border border-gray-300 rounded p-2 mr-2 bg-white text-black w-[30%] h-[10%]"
                                placeholder="Valeur"
                                value={valeur}
                                onChange={(e) => setValeur(e.target.value)}
                            />
                            <button
                                className="bg-sky-800 text-white rounded p-2 w-[25%] h-[10%] focus:outline-none focus:ring-0"
                                onClick={handleAjouterObjet}
                            >
                                {currentIndex === -1 ? 'Ajouter l\'objet' : 'Modifier l\'objet'}
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-start w-full'>
                        <h2 className="text-xl mb-2 text-gray-800 mr-4 w-[18%] text-justify">Liste des Objets :</h2>
                        <div className='bg-white rounded-l-2xl w-full mx-14 h-56 items-center justify-center p-6 overflow-x-auto scrollbar-thin scrollbar-thumb-white'>
                            <ul className="mb-4 text-black text-center"> 
                                <li className="flex justify-between font-semibold mb-2">
                                    <span className='w-[25%]'>Nom</span>
                                    <span className='w-[25%]'>Poids</span>
                                    <span className='w-[25%]'>Valeur</span>
                                    <span className='w-[25%]'>Actions</span>
                                </li>
                                {objets.map((objet, index) => (
                                    <React.Fragment key={index}>
                                        <li className="flex justify-between">
                                            <span className='w-[25%]'>{objet.nom}</span>
                                            <span className='w-[25%]'>{objet.poids}</span>
                                            <span className='w-[25%]'>{objet.valeur}</span>
                                            <span className="flex gap-2 w-[25%] justify-center">
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    className="text-blue-500 cursor-pointer"
                                                    onClick={() => handleModifierObjet(index)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="text-red-500 cursor-pointer"
                                                    onClick={() => handleSupprimerObjet(index)}
                                                />
                                            </span>
                                        </li>
                                        <hr className="border-gray-300 my-2" />
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        className="bg-green-500 text-white rounded p-2 mt-2 focus:outline-none focus:ring-0"
                        onClick={handleCalculerProfitMaximal}
                    >
                        Calculer le profit maximal
                    </button>

                    {resultat !== null && (
                        <>
                            <h2 className="mt-4 text-xl text-black">
                                Le profit maximal réalisable est : {resultat}
                            </h2>
                            <p className="mt-2 text-blue-500 cursor-pointer" onClick={() => setShowPopup(true)}>
                                Plus de détails
                            </p>
                        </>
                    )}
                </div>
            </div>
            {showPopup && (
                <Popup 
                    matriceDP={matriceDP} 
                    objetsSelectionnes={objetsSelectionnes} 
                    onClose={() => setShowPopup(false)} 
                />
            )}
        </div>
    );
};

export default Solution;
