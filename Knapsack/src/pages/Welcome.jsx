import React from 'react';
import '../index.css'; 
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="home h-screen w-screen flex flex-row border border-solid border-fuchsia-900">
            <div className="flex flex-col py-32 px-6 items-start justify-start w-[50%] relative">
                <h1 className="text-gray-950 text-5xl font-bold mb-10">
                    Problème du sac à dos
                </h1>
                <p className="text-1xl md:text-2xl text-gray-800 text-justify font-medium text-balance mt-10">
                    Il s'agit d'un problème où l'on doit sélectionner un ensemble d'objets,
                    chacun ayant un poids et une valeur, à placer dans un sac à dos ayant une capacité limitée.
                    L'objectif est de maximiser la valeur totale des objets sans dépasser cette capacité.
                </p>
                <Link to="/solution"> 
                    <button
                        className="bg-neutral-50 text-black text-lg px-4 py-2 rounded-full hover:bg-neutral-100 transition absolute mt-16 right-8"
                    >
                        Explorer la solution &gt;&gt;
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
