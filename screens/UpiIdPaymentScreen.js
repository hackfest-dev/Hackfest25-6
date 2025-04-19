// screens/UpiIdPaymentScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { initiatePayment } from '../utils/razorpayConfig';

export default function UpiIdPaymentScreen() {
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter amount"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Pay Now" color="#F0B90B" onPress={() => initiatePayment(parseFloat(amount))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F1C', justifyContent: 'center', padding: 20 },
  input: {
    backgroundColor: '#1E2329',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0B90B',
  },
});
