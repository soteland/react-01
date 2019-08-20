import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Rain {
  '3h': number,
}
interface Sys {
  pod: string,
}
interface Wind {
  speed: number,
  deg: number
}
interface Clouds {
  all: number
}
interface WeatherShort {
  id: string,
  main: string,
  description: string,
  icon: string
}
interface Temperatures {
  temp: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  sea_level: number,
  grnd_level: number,
  humidity: number,
  temp_kf: number,
}
interface Weather {
  dt: number,
  main: Temperatures
  weather: WeatherShort[],
  clouds: Clouds
  wind: Wind,
  rain: Rain,
  sys: Sys,
  pod: string,
  dt_txt: string,
}

interface IWeatherIconProps {
  icon: string,
}

const WeatherCard = styled.div`
width: 18%;
border: 1px solid rgba(0,0,0,0.2);
box-shadow: 0px 1px 5px rgba(0,0,0,0.15);
border-radius: 5px;
margin-right: 10px;
margin-bottom: 10px;
padding: 10px;
:hover {
  box-shadow: 0px 3px 8px rgba(0,0,0,0.3);
}
`;

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);

  const getWeatherForecast = async () => {
    //API key: 00b1e29ec2665a7f633a304946a94dbb
    let r = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=58.0235150&lon=7.408330&appid=00b1e29ec2665a7f633a304946a94dbb');
    let w = await r.json();
    setWeather(w.list);
    setCity(w.city.name);
  };

  useEffect(() => { getWeatherForecast(); }, []);



  return (
    <>
      <br /><h1>Weather in {city}</h1><br />
      <div className="row">
        {weather.map((day, key) => (
          <WeatherCard key={key}>{day.dt_txt}
            {
              day.weather.map(w => (
                <div>
                  <img src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} />
                  {/*w.description*/}
                </div>
              ))
            }
          </WeatherCard>
        ))}
      </div>
    </>
  );
}

export default Weather;
