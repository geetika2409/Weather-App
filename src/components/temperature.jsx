import React from 'react'
import '../index.css';
import { 
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
 } from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from './services/weatherService';

function temperature({
    weather: {
      details,
      icon,
      temp,
      temp_min,
      temp_max,
      sunrise,
      sunset,
      speed,
      humidity,
      feels_like,
      timezone,
    }, units,
  }) {
  return (
  <div>
    <div className='flex items-center justify-center py-6 text-xl text-gray-400'>
      <p>{details}</p>
    </div>
    <div className='flex flex-row items-center justify-between text-white py-3'>
        <img src={iconUrlFromCode(icon)} alt="" className='w-30' />
        <p className='text-7xl text-white'>{`${temp.toFixed()}°${units === 'metric' ? "C" : "F"}`}</p>
    </div>

    <div className='flex flex-row items-center justify-center text-white space-x-2 text-l py-3'>
            <div className='flex font-light items-center justify-center'>
                <UilTemperature size={20} className='mr-1 text-xl'/>
                Real fell:
                <span className='font-normal ml-1 text-xl'>{`${feels_like.toFixed()}°`}</span>
                <p className='font-light ml-2'>|</p>
            </div>
            <div className='flex font-light items-center justify-center'>
                <UilTear size={20} className='mr-1 text-xl'/>
                Humidity:
                <span className='font-normal ml-1 text-xl'>{`${humidity.toFixed()}%`}</span>
                <p className='font-light ml-2'>|</p>
            </div>
            <div className='flex font-light items-center justify-center'>
                <UilWind size={20} className='mr-1 text-xl'/>
                Wind:
                <span className='font-normal ml-1 text-xl'>{`${speed.toFixed()} km/h`}</span>
            </div>
    </div>

    <div className='grid grid-cols-2 gap-10 text-white mt-10 mx-5 justify-center items-center'>
        <div className='card'>
           <UilSun />
           <p className='font-light'>
            Sunrise: <span className='font-medium ml-1'>
                {formatToLocalTime(sunrise, timezone, "hh:mm a")}
            </span>
            </p>
        </div>
        <div className='card'>
           <UilSunset />
           <p className='font-light'>
            Sunset: <span className='font-medium ml-1'>
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
            </span>
            </p>
        </div>
        <div className='card'>
           <UilArrowUp />
           <p className='font-light'>
            High: <span className='font-medium ml-1'>
            {`${temp_max.toFixed()}°`}
            </span>
            </p>
        </div>
        <div className='card'>
           <UilArrowDown />
           <p className='font-light'>
            Low: <span className='font-medium ml-1'>
            {`${temp_min.toFixed()}°`}
            </span>
           </p>
        </div>
    </div>
  </div>
 );
}
export default temperature