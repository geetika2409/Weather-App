import React from 'react';
import hotBg from './assets/hotbg.jpg';
import coldBg from './assets/coldbg.jpg';
import Input from './components/inputs';
import Temperature from './components/temperature';
import TimeAndLocation from './components/timeAndLocation';
import './index.css';
import getFormattedWeatherData from './components/services/weatherService';
import { useEffect, useState } from "react";

function App() {

  const [query, setQuery] = useState({ q: "varanasi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
      const fetchWeather = async () => {
          await getFormattedWeatherData({...query,units}).then(
              (data) => {
                  setWeather(data);
              });
        
        //dyanamic background      
        const threshold = units === 'metric' ? 20: 60;
        if(weather.temp <= threshold) 
           setBg(coldBg);
        else setBg(hotBg);
      };
      fetchWeather();
  }, [query,units]);

  return (
    <div className='App' style={{ backgroundImage: `url(${bg})`}}>
        <div className='mx-auto max-w-screen-md h-fit py-5 px-14 bg-slate-950 bg-opacity-60 shadow-xl'>
           <Input setQuery={setQuery} units={units} setUnits={setUnits}  /> 
           {weather && (
               <div>
                   <TimeAndLocation weather={weather}/>
                   <Temperature weather={weather} units={units}/>
               </div>
           )};
        </div>
    </div>
  );
}

export default App