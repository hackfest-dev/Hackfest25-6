import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>💳 Choose Payment Method</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UPIPayment')}
      >
        <Text style={styles.buttonText}>Pay through UPI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CryptoPayment')}
      >
        <Text style={styles.buttonText}>Pay through Crypto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f0b90b',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#f0b90b',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
