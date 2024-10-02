import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getDeviceLocation } from '../services/locationService';
import { getWeatherData } from '../services/weatherService';

const WeatherScreen: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect (() => {
        const fetchWeather = async () => {
            try {
                const location = await getDeviceLocation();
                const data = await getWeatherData(location.latitude, location.longitude);
                setWeatherData(data);
            } catch (error) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={styles.centered}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          );
    }
return (
        <View style={styles.centered}>
            <Text style={styles.title}>Current Weather</Text>
            {weatherData && (
                <View>
                    <Text style={styles.text}>
                        {weatherData.name} - {weatherData.weather[0].description}
                    </Text>
                    <Text style={styles.text}>Temperature: {weatherData.main.temp}℉</Text>
                    <Text style={styles.text}>Humidity: {weatherData.main.humidity}%</Text>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1a1a1a',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: '#fff',
    },
    text: {
      fontSize: 18,
      color: '#fff',
      marginVertical: 5,
    },
    errorText: {
      color: 'red',
      fontSize: 18,
    },
  });
  
  export default WeatherScreen;