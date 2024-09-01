"use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { GoogleMaps, MapHandler, PlaceAutocomplete } from "@/components/maps/google-maps";



// const loadGoogleMapsScript = (callback: () => void) => {
//     const existingScript = document.getElementById('googleMapsScript');
//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
//       script.id = 'googleMapsScript';
//       document.body.appendChild(script);
//       script.onload = () => {
//         if (callback) callback();
//       };
//     }
//     if (existingScript && callback) callback();
//   };

//    const defaultMapOptions: google.maps.MapOptions = {
//     center: { lat: 0, lng: 0 },
//     zoom: 2,
//     disableDefaultUI: true,
//     zoomControl: true,
//   };

  

// const GoogleMap = () => {
//   const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

//   const useLoadGoogleMapsApi = () => {
//     const [isLoaded, setIsLoaded] = useState(false);
  
//     useEffect(() => {
//       loadGoogleMapsScript(() => setIsLoaded(true));
//     }, []);
  
//     return isLoaded;
//   };

//   return (
//     <Card className="w-[600px] h-screen shadow-md mb-10">
//       <CardHeader>
//         <p className="text-2xl font-semibold text-center">
//         🔅 Solar Insights 🔅
//         </p>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="flex flex-col items-center justify-between rounded-lg border p-3 shadow-md">
//           <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
//           <div className="w-full h-[400px] mt-4">
//             <GoogleMaps 
//                 defaultMapOptions={defaultMapOptions}
//             >
//               <MapHandler place={selectedPlace} marker={null} />
//             </GoogleMaps>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default GoogleMap;




// pages/index.tsx
import { useState } from 'react';
import { GoogleMaps } from '@/components/maps/google-maps';
import { LocationInput } from '@/components/maps/location-input';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

async function getLatLonForCity(city: string) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    city + ", India"
  )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const geocodeResponse = await fetch(geocodeUrl);
  const geocodeData = await geocodeResponse.json();
  const { lat, lng } = geocodeData.results[0].geometry.location;
  return { lat, lng };
};



export default function HomePage() {
  const [lat, setLat] = useState(22.3050); // Default to San Francisco
  const [lng, setLng] = useState(70.7825);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const handleLocationChange = (latitude: number, longitude: number) => {
    setLat(latitude);
    setLng(longitude);
  };

  return (
    <div>
      <LocationInput onLocationChange={handleLocationChange} getLatLonForCity={getLatLonForCity} />
      {isLoaded && <GoogleMaps lat={lat} lng={lng} />}
    </div>
  );
}
