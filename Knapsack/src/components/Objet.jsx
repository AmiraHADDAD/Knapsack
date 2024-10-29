import React from 'react';

const Objet = ({ objet, index, onModifier, onSupprimer }) => {
  return (
    <li className="mb-1 flex justify-between">
      {objet.nom} - Poids: {objet.poids}, Valeur: {objet.valeur}
      <div>
        <button
          className="bg-yellow-500 text-white rounded p-1 mr-1"
          onClick={() => onModifier(index)}
        >
          Modifier
        </button>
        <button
          className="bg-red-500 text-white rounded p-1"
          onClick={() => onSupprimer(index)}
        >
          Supprimer
        </button>
      </div>
    </li>
  );
};

export default Objet;
