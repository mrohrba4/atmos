import * as Location from 'expo-location';

export const getDeviceLocation = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permission to access location was denied');
        }
        const location = await Location.getCurrentPositionAsync({});
        return location.coords;
    } catch (error) {
        console.error(error);
        throw error;
    }
};