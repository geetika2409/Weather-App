import React from 'react'
import { useState } from 'react';
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons'

function inputs({ setQuery, units, setUnits }) {

    const [city, setCity] = useState("");

    const handleUnitsChange = (e) => {
      const selectedUnit = e.currentTarget.name;
      if (units !== selectedUnit) 
        setUnits(selectedUnit);
    };
    
    const handleSearchClick = () => {
        if (city !== "") setQuery({ q: city });
    };

    const handleLocationClick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          setQuery({
            lat,
            lon,
          });
        });
      }
    };

  return (
  
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-1/2 items-center justify-center space-x-3 '>
            
            <input 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text" 
            className='text-xl text-white font-normal p-1 w-full shadow-xl 
            focus:outline-none capitalize bg-transparent 
            border-2 border-white rounded-md'
            placeholder='Enter City.....'>          
            </input>
            <UilSearch size={30} 
            className='text-white cursor-pointer transition ease-out hover:scale-125'
            onClick={handleSearchClick}
            />
            <UilLocationPoint size={30}
            className='text-white cursor-pointer transition ease-out hover:scale-125'
            onClick={handleLocationClick}
            />
        </div>
        <div className='flex flex-row w-1/2 items-center px-5 justify-center space-x-2'>
           <button name='metric'
            className=' bg-white w-1/3 rounded-lg text-xl font-medium p-2 hover:cursor-pointer'
            onClick={handleUnitsChange}>
            °C</button>
            <button name='imperial'
            className='bg-white w-1/3 rounded-lg text-xl font-medium p-2 hover:cursor-pointer'
            onClick={handleUnitsChange}>
            °F</button>
        </div>
    </div>
  );
}

export default inputs