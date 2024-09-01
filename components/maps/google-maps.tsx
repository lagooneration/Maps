"use client";

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   APIProvider,
//   ControlPosition,
//   MapControl,
//   Map,
//   useMap,
//   useMapsLibrary,
// } from '@vis.gl/react-google-maps';


// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// // const API_KEY = (globalThis as any).GOOGLE_MAPS_API_KEY ?? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// async function getLatLonForCity(city: string) {
//   const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//     city + ", India"
//   )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
//   const geocodeResponse = await fetch(geocodeUrl);
//   const geocodeData = await geocodeResponse.json();
//   const { lat, lng} = geocodeData.results[0].geometry.location;
//   return { lat, lng};
// }

// export type Place = {
//   name: string;
//   address: string;
//   lat: number;
//   lng: number;
// }


// export const GoogleMaps: React.FC = () => {
//   const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

//   const {isLoaded} = useJsApiLoader({
//     id: 'c2179074db519fe9',
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
//   });



  
  
//   return (
//     <APIProvider
//       apiKey={googleMapsApiKey}
//       solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
//       <Map
//         mapId={'c2179074db519fe9'}
//         defaultZoom={3}
//         defaultCenter={{ lat: 28.70405, lng: 77.10249 }}
//         gestureHandling={'greedy'}
//         disableDefaultUI={true}
//       >
//         <MapHandler place={selectedPlace} />
//       </Map>
//       <MapControl position={ControlPosition.TOP}>
//         <div className="autocomplete-control">
//           <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
//         </div>
//       </MapControl>
//     </APIProvider>
//   );
// };

// interface MapHandlerProps {
//   place: google.maps.places.PlaceResult | null;
// }

// export const MapHandler: React.FC<MapHandlerProps> = ({ place }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map || !place) return;

//     if (place.geometry?.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else if (place.geometry?.location) {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);
//     }
//   }, [map, place]);

//   return null;
// };

// interface PlaceAutocompleteProps {
//   onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
// }

// export const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({ onPlaceSelect }) => {
//   const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const places = useMapsLibrary('places');

//   useEffect(() => {
//     if (!places || !inputRef.current) return;

//     const options = {
//       fields: ['geometry', 'name', 'formatted_address']
//     };

//     setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
//   }, [places]);

//   useEffect(() => {
//     if (!placeAutocomplete) return;

//     placeAutocomplete.addListener('place_changed', () => {
//       const place = placeAutocomplete.getPlace();
//       onPlaceSelect(place);
//     });
//   }, [onPlaceSelect, placeAutocomplete]);

//   return (
//     <div className="autocomplete-container">
//       <input ref={inputRef} placeholder="Search for a location" />
//     </div>
//   );
// };




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

