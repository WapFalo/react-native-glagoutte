import React from 'react';
import { Counter } from './features/counter/Counter';
// import { StyleSheet, Text, View, Image } from 'react-native';
import './App.css';
import { store } from './app/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

