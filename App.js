import React from 'react';
import { View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import Game from './components/Game';
import styles from './style/style';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar/>
      <Header />
      <Game />
      <Footer />
    </View>
  );
}

