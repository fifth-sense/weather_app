import React, { useEffect, useState } from 'react';
import './weather.css';
import moment from 'moment';
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherCard = ({ weatherData }) => {
        const [defaultImg, setImage] = useState("Clear")
        const weatherType = [
                {
                        "key": "Thunderstorm",
                        "img": "WIND"
                },
                {
                        "key": "Drizzle",
                        "img": "PARTLY_CLOUDY_DAY"
                },
                {
                        "key": "Rain",
                        "img": "RAIN"
                },
                {
                        "key": "Snow",
                        "img": "SNOW"
                },
                {
                        "key": "Mist",
                        "img": "SLEET"
                },
                {
                        "key": "Smoke",
                        "img": "FOG"
                },
                {
                        "key": "Clear",
                        "img": "CLEAR_DAY"
                },
                {
                        "key": "Clouds",
                        "img": "CLOUDY"
                }
        ]
        useEffect(() => {
                if (weatherData) {
                        var imageData = weatherType.filter((value) => value.key === weatherData.weather[0].main)
                        if (imageData && imageData.length > 0) {
                                setImage(imageData[0].img)
                        }
                }

        }, [weatherData])

        return (
                <div className="main">
                        <p className="header">{weatherData.name}</p>
                        <div className="flex">
                                <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
                                <div style={{ padding: '20px' }}>
                                        <ReactAnimatedWeather
                                                icon={defaultImg}
                                                color={'goldenrod'}
                                                size={"100"}
                                                animate={"true"}
                                        />
                                </div>
                        </div>
                        <div className="flex">
                                <p className="description">{weatherData.weather[0].main}</p>
                                <p className="description">{weatherData.weather[0].description}</p>
                        </div>
                        <div className="flex">
                                <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
                                <p className="temp">Humidity: {weatherData.main.humidity} %</p>
                        </div>
                        <div className="flex">
                                <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                                <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                        </div>
                </div>
        )
}

export default WeatherCard;