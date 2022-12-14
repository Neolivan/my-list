import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ListasProvider } from './context/ListasContext';
import { Navigator } from './navigation/Navigator';

export default function App() {
  return (
    <ListasProvider>
      <Navigator/>
    </ListasProvider>
  );
}

