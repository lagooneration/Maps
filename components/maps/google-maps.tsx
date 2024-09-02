"use client";


// components/MapComponent.tsx
import { useEffect, useRef, useState } from 'react';

interface MapComponentProps {
  lat: number;
  lng: number;
}

export const GoogleMaps: React.FC<MapComponentProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 10,
        });
      }
    };

    if (!mapInstanceRef.current) {
      initializeMap();
    } else {
      mapInstanceRef.current.setCenter({ lat, lng });
    }
  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: '600px', height: '400px' }} />;
};

