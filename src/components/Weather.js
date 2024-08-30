// src/components/Weather.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [manualLocation, setManualLocation] = useState('');
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

    useEffect(() => {
        if (!weather && !locationPermissionDenied) {
            handleGeolocation();
        }
    }, [weather, locationPermissionDenied]);

    const handleGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            async(position) => {
                const { latitude, longitude } = position.coords;
                await fetchWeather(latitude, longitude);
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    setLocationPermissionDenied(true);
                } else {
                    setError('Failed to fetch weather data.');
                }
            }
        );
    };

    const fetchWeather = async(lat, lon) => {
        try {
            const apiKey = '77f65f844b1feb93772bc6256379f88d'; // Replace with your actual API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const response = await axios.get(url);

            if (response.status === 200) {
                setWeather(response.data);
            } else {
                setError(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (err) {
            console.error('Error fetching weather data:', err.response ? err.response.data : err.message);
            setError(`Failed to fetch weather data: ${err.response ? err.response.data.message : err.message}`);
        }
    };

    const handleManualSearch = async() => {
        const [city, country] = manualLocation.split(',').map(part => part.trim());
        const apiKey = '77f65f844b1feb93772bc6256379f88d'; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_ACTUAL_API_KEY&units=metric`;

        try {
            const response = await axios.get(url);

            if (response.status === 200) {
                setWeather(response.data);
                setLocationPermissionDenied(false); // Reset in case user had denied previously
            } else {
                setError(`
                Error: $ { response.status } - $ { response.statusText }
                `);
            }
        } catch (err) {
            console.error('Error fetching weather data:', err.response ? err.response.data : err.message);
            setError(`
                Failed to fetch weather data: $ { err.response ? err.response.data.message : err.message }
                `);
        }
    };

    if (locationPermissionDenied) {
        return ( <
            div >
            <
            p > Geolocation permission denied.Please enable location services or provide your location manually. < /p> <
            input type = "text"
            value = { manualLocation }
            onChange = {
                (e) => setManualLocation(e.target.value)
            }
            placeholder = "Enter city, country" /
            >
            <
            button onClick = { handleManualSearch } > Get Weather < /button> < /
            div >
        );
    }

    if (error) return <div > { error } < /div>;

    if (!weather) return <div > Loading... < /div>;

    return ( <
        div className = "weather" >
        <
        h2 > Weather < /h2> <
        p > Location: { weather.name } < /p> <
        p > Temperature: { weather.main.temp }°
        C < /p> <
        p > Conditions: { weather.weather[0].description } < /p> < /
        div >
    );
};

export default Weather;