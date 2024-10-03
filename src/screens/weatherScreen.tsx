import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { getDeviceLocation } from '../services/locationService';
import { getWeatherData } from '../services/weatherService';
import { Video, ResizeMode } from 'expo-av';



const WeatherScreen: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [weatherType, setWeatherType] = useState<string | null>(null);

    const fadeAnim = useState(new Animated.Value(0))[0];
    const fontSizeAnim = useState(new Animated.Value(24))[0];

    useEffect (() => {
        const fetchWeather = async () => {
            try {
                const location = await getDeviceLocation();
                const data = await getWeatherData(location.latitude, location.longitude);
                setWeatherData(data);

                const weatherMain = data.weather[0].main;
                console.log('Weather Main:', weatherMain);
                setWeatherType(weatherMain);
            } catch (error) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    useEffect(() => {
        if (!loading && weatherData) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1, // Fully visible
                    duration: 2000, // 2 seconds fade-in
                    useNativeDriver: true,
                }),
                Animated.timing(fontSizeAnim, {
                    toValue: 32, // Increase font size to 32
                    duration: 2000, // 2 seconds font-size transition
                    useNativeDriver: false, // Font size animation doesn't support native driver
                }),
            ]).start();
        }
    }, [loading, weatherData]);

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

    const videoSource = getVideoSource(weatherType);
return (
        <View style={styles.centered}>
            <Video 
                        source={videoSource}
                        style={styles.backgroundVideo}
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        shouldPlay
                    />   
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Current Weather</Animated.Text>
            {weatherData && (
                <View>
                     
                    <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
                        {weatherData.name} - {weatherData.weather[0].description}
                    </Animated.Text>
                    <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>Temperature: {weatherData.main.temp}℉</Animated.Text>
                    <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>Humidity: {weatherData.main.humidity}%</Animated.Text>
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 34,  
      color: '#fff',
      textDecorationLine: 'underline',
    },
    text: {
      fontSize: 24,  
      color: '#fff',
      marginVertical: 5,
    },
    errorText: {
      color: 'red',
      fontSize: 18,
    },
  });

  const getVideoSource = (weatherType: string | null) => {
    switch (weatherType) {
        case 'Clear':
            return require('./../assets/videos/clearsky.mp4');
        default:
            return null;
    }
  };
  
  export default WeatherScreen;