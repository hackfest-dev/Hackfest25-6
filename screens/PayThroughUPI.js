import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';

export default function PayThroughUPI() {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');

  const handlePay = () => {
    if (!upiId || !amount) {
      return Alert.alert('Please enter both UPI ID and amount');
    }

    const upiUrl = `upi://pay?pa=${upiId}&pn=User&am=${amount}&cu=INR`;
    Linking.openURL(upiUrl).catch(() => {
      const fallbackIntent = `intent://pay?pa=${upiId}&pn=User&am=${amount}&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
      Linking.openURL(fallbackIntent).catch(() => {
        Alert.alert('Google Pay not found');
      });
    });
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
      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount in INR"
        placeholderTextColor="#888"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handlePay}>
        <Text style={styles.buttonText}>Pay via Google Pay</Text>
      </TouchableOpacity>
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
