// src/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRed from '../public/marker-icon-red.png'; // Path to your red marker icon

// Fix default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ratnaRealEstatePosition = [16.435285, 80.566099]; // Updated coordinates for Ratna Real Estate

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: iconRed,
  iconRetinaUrl: iconRed,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const Map = () => {
  return (
    <Box width="100%" height="600px">
      <MapContainer center={ratnaRealEstatePosition} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={ratnaRealEstatePosition} icon={redIcon}>
          <Popup>
            Ratna Real Estate
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default Map;














// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Box } from '@chakra-ui/react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const charminarPosition = [17.3616, 78.4747];

// const Map = () => {
//   return (
//     <Box width="100%" height="600px">
//       <MapContainer center={charminarPosition} zoom={15} style={{ width: '100%', height: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={charminarPosition}>
//           <Popup>
//             Charminar, Hyderabad
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </Box>
//   );
// };

// export default Map;
