import axios from axios;

const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (latitude: number, longitude: number) => {
    try {
        const response = await axios.get(OPEN_WEATHER_API_URL, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: process.env.OPEN_WEATHER_API_KEY,
                units: 'imperial',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data', error);
        throw error
    }
};