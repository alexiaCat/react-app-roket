import { useState } from "react";
import { useFetchTrees } from "../hooks/useFetchTrees";
import { Map } from "./Map";
import { Image } from "./Image";

export const Home = () => {
    const { trees, isLoading } = useFetchTrees();

    const defaultTree = {
        image_url: "https://i.ibb.co/ncfc5x9/arbol.jpg",
        lat: 0,
        lon: 0,
        object_name: "Centro del Mapa",
        zoom: 1
    };
    const [selectedTree, setSelectedTree] = useState(defaultTree);

    const handleTreeSelection = (event) => {
        if (event.target.value === "") {
            setSelectedTree(defaultTree);
        } else {
            const tree = trees.find(t => t.object_name === event.target.value);
            setSelectedTree(tree);
        }
    };

    const selectTreeByName = (objectName) => {
        const tree = trees.find(t => t.object_name === objectName);
        setSelectedTree(tree);
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <nav className="bg-black py-[10px] opacity-[90%]">
                <h1 className="text-white ml-4 font-quicksand font-bold text-[50px]">Arbolitos</h1>
            </nav>
            <div className="text-center">
                {isLoading && <h2>Cargando...</h2>}
            </div>

            {!isLoading && (
                <>
                    <div className="px-[30px] mt-4">
                        <a onClick={scrollToTop} title="Volver arriba" className="fixed right-0 bottom-0 z-50 p-2.5 bg-slate-900 text-white sm:block md:hidden rounded-tl-md">
                            <i className="fa fa-arrow-up fa-2x"></i>
                        </a>
                        <select
                            id="treeSelection"
                            onChange={handleTreeSelection}
                            className="bg-gray-50 border font-quicksand border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">-- Seleccione una locación --</option>
                            {trees.map((tree, index) => (
                                <option key={index} value={tree.object_name}>
                                    {tree.object_name}
                                </option>
                            ))}
                        </select>


                    </div>


                    {selectedTree && (
                        <div className="flex flex-col lg:flex-row justify-center items-center p-8 space-y-8 lg:space-y-0 lg:space-x-8">
                            <div className="w-full lg:w-auto">
                                <Image selectedTree={selectedTree} />
                            </div>
                            <div className="border-8 border-black w-full lg:w-auto z-0">
                                <Map selectedTree={selectedTree} onSelectTree={selectTreeByName} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
