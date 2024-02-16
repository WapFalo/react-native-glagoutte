import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Location from 'expo-location';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [responseApi, setResponseApi] = useState([]);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude);
      setLocation(location.coords);
      getTodayWeatherApiAsync(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log("latitude: ", latitude);
  console.log("longitude: ", longitude);

  const getTodayWeatherApiAsync = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=8ba77e856b1563aa404795602d6c9abb&units=metric&lang=fr`,
      );
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=8ba77e856b1563aa404795602d6c9abb&units=metric&lang=fr`;
      console.log("url:",url)
      const json = await response.json();
      setResponseApi([json.main.temp, json.weather[0].description, json.weather[0].icon, json.name]);
      console.log("responseApi:",responseApi);
      console.log("json:", json);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>À {responseApi[3]} il fera {responseApi[0]} C° avec un temps {responseApi[1]}</Text>
      <Image
        style={styles.image}
        source={{
          uri: `https://openweathermap.org/img/wn/${responseApi[2]}@2x.png`,
        }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
  }
});
