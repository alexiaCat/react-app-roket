import React, { useState } from "react";
import { useFetchTrees } from "../hooks/useFetchTrees";

export const ListTrees = () => {
    const { trees, isLoading } = useFetchTrees();
    const [selectedTree, setSelectedTree] = useState(null);

    const handleTreeSelection = (event) => {
        const tree = trees.find(t => t.object_name === event.target.value);
        setSelectedTree(tree);
    };

    return (
        <>

        <nav className="bg-black py-[10px] opacity-[90%]">
        <h1 className="text-white ml-4 font-bold text-[50px]">Arbolitos</h1>
        </nav>
            <div className="text-center">
                {isLoading && <h2>Cargando...</h2>}
            </div>

            {!isLoading && (
                <div>
                    <select 
                        className="block ml-2 w-[15%] mt-1 bg-white border-transparent rounded-md shadow-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        onChange={handleTreeSelection}
                    >
                        <option value="">-- Seleccione una locación --</option>
                        {trees.map((tree, index) => (
                            <option key={index} value={tree.object_name}>
                                {tree.object_name}
                            </option>
                        ))}
                    </select>

                    {selectedTree && (
                        <div className="mt-4">
                            <img 
                                src={selectedTree.image_url || 'URL_por_defecto.png'} 
                                alt={selectedTree.object_name}
                                className="max-w-lg mx-auto"
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
