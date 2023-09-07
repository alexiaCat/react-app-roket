import { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import { useFetchTrees } from '../hooks/useFetchTrees';

import markerIcon2X from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2X,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

export const Map = ({ selectedTree, onSelectTree }) => {
    const { trees = [] } = useFetchTrees();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const position = [selectedTree.lat, selectedTree.lon];
    let mapStyles = {};

    if (windowWidth <= 640) {
        mapStyles = {
            flex: '1',
            width: '100%',
            height: '300px'
        };
    } else if (windowWidth > 640 && windowWidth <= 768) {
        mapStyles = {
            flex: '1',
            width: '100%',
            height: '400px'
        };
    } else {
        mapStyles = {
            flex: '1',
            width: '700px',
            height: '450px'
        };
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const MapComponent = () => {
        const map = useMap();

        useEffect(() => {
            map.flyTo(position, selectedTree.zoom);
        }, [position, map, selectedTree.zoom]);

        useEffect(() => {
            map.invalidateSize();
        }, [windowWidth, map]);

        return null;
    };

    return (
        <MapContainer center={position} zoom={selectedTree.zoom} style={mapStyles}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {trees && trees.map((tree, index) => (
                <Marker
                    key={index}
                    position={[tree.lat, tree.lon]}
                    eventHandlers={{
                        click: () => onSelectTree(tree.object_name)
                    }}
                >
                    <Popup>
                        {tree.object_name}
                    </Popup>
                </Marker>
            ))}

            <MapComponent />
        </MapContainer>
    );

}
