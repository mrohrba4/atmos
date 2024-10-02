import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import WeatherScreen from 'screens/weatherScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <WeatherScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
  },
});