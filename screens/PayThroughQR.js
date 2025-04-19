import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function PayThroughQR() {
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateQR = () => {
    if (!upiId) return Alert.alert('Please enter UPI ID');
    setShowQR(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter UPI ID</Text>
      <TextInput
        style={styles.input}
        placeholder="example@upi"
        placeholderTextColor="#888"
        value={upiId}
        onChangeText={setUpiId}
      />
      <TouchableOpacity style={styles.button} onPress={generateQR}>
        <Text style={styles.buttonText}>Generate QR</Text>
      </TouchableOpacity>
      {showQR && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <QRCode
            value={`upi://pay?pa=${upiId}&pn=User&mc=0000&tid=1234567890&cu=INR`}
            size={200}
            color="black"
            backgroundColor="white"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  label: { color: '#f0b90b', marginBottom: 10, fontSize: 16 },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#f0b90b',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#121212', fontWeight: 'bold', fontSize: 16 },
});
