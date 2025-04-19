// screens/QRPaymentScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QRPaymentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>QR Scanner will be here (implement camera later)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F1C', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#F0B90B', fontSize: 18 },
});
