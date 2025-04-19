import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function UPIPaymentQR() {
  const [upiId, setUpiId] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateUPIUrl = () => {
    return `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>🔁 Generate UPI QR</Text>

      <TextInput
        placeholder="Enter UPI ID (e.g. someone@upi)"
        placeholderTextColor="#777"
        style={styles.input}
        value={upiId}
        onChangeText={setUpiId}
      />

      <TextInput
        placeholder="Receiver Name"
        placeholderTextColor="#777"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Amount (e.g. 100)"
        placeholderTextColor="#777"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (upiId && name && amount) {
            setShowQR(true);
          }
        }}
      >
        <Text style={styles.buttonText}>Generate QR</Text>
      </TouchableOpacity>

      {showQR && (
        <View style={styles.qrContainer}>
          <QRCode value={generateUPIUrl()} size={250} />
          <Text style={styles.qrText}>Scan this QR to Pay</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, color: '#f0b90b', marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#f0b90b',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: { alignItems: 'center', marginTop: 20 },
  qrText: { color: '#f0b90b', marginTop: 10, fontSize: 14 },
});
