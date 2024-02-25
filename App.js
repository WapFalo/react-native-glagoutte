import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [responseFirstApi, setResponseFirstApi] = useState([]);
  const [responseSecondApi, setResponseSecondApi] = useState([]);


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
      getWeekWeatherApiAsync(location);
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
      setResponseFirstApi([json.main.temp, json.weather[0].description, json.weather[0].icon, json.name]);
      console.log("ResponseFirstApi:",responseFirstApi);
      console.log("json:", json);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeekWeatherApiAsync = async(location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=8ba77e856b1563aa404795602d6c9abb&units=metric&lang=fr`
      );
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=8ba77e856b1563aa404795602d6c9abb&units=metric&lang=fr`;
      console.log("url2:",url)
      const json = await response.json();
      setResponseSecondApi([json.city[0].name, json.list[0].main.temp, json.list[0].weather[0].description, json.list[0].weather[0].icon,
                            json.list[1].main.temp, json.list[1].weather[0].description, json.list[1].weather[0].icon,
                            json.list[2].main.temp, json.list[2].weather[0].description, json.list[2].weather[0].icon,
                            json.list[3].main.temp, json.list[3].weather[0].description, json.list[3].weather[0].icon,
                            json.list[4].main.temp, json.list[4].weather[0].description, json.list[4].weather[0].icon]);
      console.log("ResponseSecondApi:",responseSecondApi);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text contentContainerStyle={styles.paragraph}>À {responseFirstApi[3]} il fera {responseFirstApi[0]} C° avec un temps {responseFirstApi[1]}</Text>
      <Image
        contentContainerStyle={styles.image}
        source={{
          uri: `https://openweathermap.org/img/wn/${responseFirstApi[2]}@2x.png`,
        }}
        />
      <Text contentContainerStyle={styles.paragraph}>À {responseSecondApi[0]} il fera {responseSecondApi[1]} C° avec un temps {responseSecondApi[2]}</Text>
      <Image
        contentContainerStyle={styles.image}
        source={{
          uri: `https://openweathermap.org/img/wn/${responseSecondApi[3]}@2x.png`,
        }}
        />
      <Text contentContainerStyle={styles.paragraph}>À {responseSecondApi[0]} il fera {responseSecondApi[4]} C° avec un temps {responseSecondApi[5]}</Text>
      <Image
        contentContainerStyle={styles.image}
        source={{
          uri: `https://openweathermap.org/img/wn/${responseSecondApi[6]}@2x.png`,
        }}
        />
      <Text contentContainerStyle={styles.paragraph}>À {responseSecondApi[0]} il fera {responseSecondApi[7]} C° avec un temps {responseSecondApi[8]}</Text>
      <Image
        contentContainerStyle={styles.image}
        source={{
          uri: `https://openweathermap.org/img/wn/${responseSecondApi[9]}@2x.png`,
        }}
        />
      <Text contentContainerStyle={styles.paragraph}>À {responseSecondApi[0]} il fera {responseSecondApi[10]} C° avec un temps {responseSecondApi[11]}</Text>
      <Image
        contentContainerStyle={styles.image}
        source={{
          uri: `https://openweathermap.org/img/wn/${responseSecondApi[12]}@2x.png`,
        }}
        />
      <Text contentContainerStyle={styles.paragraph}>À {responseSecondApi[0]} il fera {responseSecondApi[13]} C° avec un temps {responseSecondApi[14]}</Text>
      <Image
        contentContainerStyle={styles.image}
        source={{
          uri: `https://openweathermap.org/img/wn/${responseSecondApi[15]}@2x.png`,
        }}
        />
    </ScrollView>
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
