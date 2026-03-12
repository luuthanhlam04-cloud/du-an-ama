// components/Map.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix lỗi mất icon mặc định của Leaflet khi dùng với Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Map() {
  // Dữ liệu giả lập quanh trường PTIT theo như tài liệu [cite: 189]
  const ptitLocation: [number, number] = [20.9808, 105.7962];

  return (
    <div className="rounded-xl overflow-hidden border-2 border-gray-100 relative z-0">
      <MapContainer center={ptitLocation} zoom={15} style={{ height: '300px', width: '100%' }}>
        <TileLayer 
            attribution='&copy; OpenStreetMap' 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        <Marker position={ptitLocation}>
          <Popup>
            <strong className="text-blue-600 text-lg">Nhà thuốc PTIT</strong><br />
            <span className="text-green-600 font-medium">Còn hàng: Panadol</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}