"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LocationInputProps {
    onLocationChange: (lat: number, lng: number) => void;
    getLatLonForCity: (city: string) => Promise<{ lat: number; lng: number }>;
  }
  
  export const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange, getLatLonForCity }) => {
    const [city, setCity] = useState('');
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
    };
  
    const handleSearch = async () => {
      try {
        const { lat, lng } = await getLatLonForCity(city);
        onLocationChange(lat, lng);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };
  
    return (
      <div className="flex flex-row items-center gap-x-2 justify-start rounded-lg border p-3 shadow-md bg-white mt-4">
          <div>
            
          
          <Input type="text" value={city} onChange={handleInputChange} placeholder="Enter location" />
          </div>
          
          
          <div>
          <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      
    );
  };
  