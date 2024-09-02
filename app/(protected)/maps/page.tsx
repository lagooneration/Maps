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
import { findClosestBuilding } from '@/components/maps/building-insights';
import { Button } from '@/components/ui/button';

async function getLatLonForCity(city: string) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    city + ", India"
  )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const geocodeResponse = await fetch(geocodeUrl);
  const geocodeData = await geocodeResponse.json();
  const { lat, lng } = geocodeData.results[0].geometry.location;
  return { lat, lng };
};

async function getBuildingInsights(lat: number, lng: number) {
  const buildingInsightsUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const buildingInsightsResponse = await fetch(buildingInsightsUrl);
  const buildingInsightsData = await buildingInsightsResponse.json();
  const { solarPotential } = buildingInsightsData.results[0].solarPotential;
  return { solarPotential };
}

export default function HomePage() {
  const [lat, setLat] = useState(22.3050); // Default to San Francisco
  const [lng, setLng] = useState(70.7825);
  const [insights, setInsights] = useState({ solarPotential: 0 });
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const handleLocationChange = (latitude: number, longitude: number) => {
    setLat(latitude);
    setLng(longitude);
  };

  const handleGetInsights = async () => {
    try {
      const location = new google.maps.LatLng(lat, lng);
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
      const response = await findClosestBuilding(location, apiKey);
      setInsights(response.results[0].solarPotential);
    } catch (error) {
      console.error('Error fetching building insights:', error);
    }
  };

  

  return (
    <div className="h-screen flex flex-col items-center gap-2 justify-start rounded-lg border p-3 shadow-md bg-white mb-4">
          <div>
            {isLoaded && <GoogleMaps lat={lat} lng={lng} />}
            <LocationInput onLocationChange={handleLocationChange} getLatLonForCity={getLatLonForCity} />
            </div>
            <div className="w-full flex flex-row items-center gap-x-2 justify-start rounded-lg border p-3 shadow-md bg-white">
            
              <Button onClick={handleGetInsights}>Get Insights</Button>
              <p>Solar Potential: {insights.solarPotential}</p>
            
       
     
         </div>
      </div>
            

          
  );
}
