// import { useEffect, useState } from 'react';

// // Load Google Maps API script
// const loadGoogleMapsScript = (callback: () => void) => {
//   const existingScript = document.getElementById('googleMapsScript');
//   if (!existingScript) {
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
//     script.id = 'googleMapsScript';
//     document.body.appendChild(script);
//     script.onload = () => {
//       if (callback) callback();
//     };
//   }
//   if (existingScript && callback) callback();
// };

// // // Custom hook to load Google Maps API
// export const useLoadGoogleMapsApi = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     loadGoogleMapsScript(() => setIsLoaded(true));
//   }, []);

//   return isLoaded;
// };

// // Initialize map
// export const initializeMap = (mapRef: HTMLElement, options: google.maps.MapOptions): google.maps.Map => {
//   return new google.maps.Map(mapRef, options);
// };

// // Create a marker
// export const createMarker = (map: google.maps.Map, position: google.maps.LatLngLiteral, title?: string): google.maps.Marker => {
//   return new google.maps.Marker({
//     position,
//     map,
//     title,
//   });
// };

// // Default map options
// export const defaultMapOptions: google.maps.MapOptions = {
//   center: { lat: 0, lng: 0 },
//   zoom: 2,
//   disableDefaultUI: true,
//   zoomControl: true,
// };


