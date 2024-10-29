import React, { useState } from 'react';
import Objet from './components/Objet';

const Knapsack = () => {
  const [capacite, setCapacite] = useState(0); // Capacité du sac à dos
  const [objets, setObjets] = useState([]); // Liste des objets
  const [nom, setNom] = useState(''); // Nom de l'objet
  const [poids, setPoids] = useState(''); // Poids de l'objet
  const [valeur, setValeur] = useState(''); // Valeur de l'objet
  const [resultat, setResultat] = useState(null); // Résultat du profit maximal
  const [matriceDP, setMatriceDP] = useState([]); // Matrice DP
  const [objetsSelectionnes, setObjetsSelectionnes] = useState([]); // Objets sélectionnés
  const [currentIndex, setCurrentIndex] = useState(-1); // Index de l'objet actuellement sélectionné pour modification

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

  const handleCalculerProfitMaximal = () => {
    const n = objets.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacite + 1).fill(0));

    // Remplir la table DP
    for (let i = 1; i <= n; i++) {
      const w = objets[i - 1].poids;
      const v = objets[i - 1].valeur;

      for (let sz = 1; sz <= capacite; sz++) {
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

    // Trouver les objets sélectionnés
    const selected = [];
    let w = capacite;
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected.push(objets[i - 1]);
        w -= objets[i - 1].poids;
      }
    }
    setObjetsSelectionnes(selected);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Problème du Sac à Dos</h1>

      <div className="mb-4">
        <label className="block mb-1">Capacité du sac à dos :</label>
        <input
          type="number"
          className="border border-gray-300 rounded p-2"
          value={capacite}
          onChange={(e) => setCapacite(parseInt(e.target.value))}
        />
      </div>

      <h2 className="text-xl mb-2">Ajouter ou Modifier un objet</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mr-2"
          placeholder="Nom de l'objet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-300 rounded p-2 mr-2"
          placeholder="Poids"
          value={poids}
          onChange={(e) => setPoids(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-300 rounded p-2 mr-2"
          placeholder="Valeur"
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded p-2"
          onClick={handleAjouterObjet}
        >
          {currentIndex === -1 ? 'Ajouter l\'objet' : 'Modifier l\'objet'}
        </button>
      </div>

      <h2 className="text-xl mb-2">Liste des Objets</h2>
      <ul className="mb-4">
        {objets.map((objet, index) => (
          <Objet
            key={index}
            objet={objet}
            index={index}
            onModifier={handleModifierObjet}
            onSupprimer={handleSupprimerObjet}
          />
        ))}
      </ul>

      <button
        className="bg-green-500 text-white rounded p-2"
        onClick={handleCalculerProfitMaximal}
      >
        Calculer le profit maximal
      </button>

      {resultat !== null && (
        <>
          <h2 className="mt-4 text-xl">
            Le profit maximal réalisable est : {resultat}
          </h2>

          <h2 className="mt-4 text-xl">Matrice DP :</h2>
          <table className="border border-gray-300 mt-2 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300">Objets/Capacité</th>
                {[...Array(capacite + 1)].map((_, j) => (
                  <th key={j} className="border border-gray-300">{j}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matriceDP.map((row, i) => (
                <tr key={i}>
                  <td className="border border-gray-300">{i}</td>
                  {row.map((val, j) => (
                    <td key={j} className="border border-gray-300">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="mt-4 text-xl">Objets Sélectionnés :</h2>
          <ul>
            {objetsSelectionnes.length > 0 ? (
              objetsSelectionnes.map((objet, index) => (
                <li key={index}>
                  {objet.nom} - Poids: {objet.poids}, Valeur: {objet.valeur}
                </li>
              ))
            ) : (
              <li>Aucun objet sélectionné.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Knapsack;
