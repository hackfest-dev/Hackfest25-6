import React, { useState } from 'react';
import { View, Button, Text, TextInput, Alert, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const RazorpayPayment = () => {
  const [amount, setAmount] = useState('');

  const handlePayNow = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to pay.');
      return;
    }

    const amountInPaise = parseFloat(amount) * 100;
    const options = {
      description: 'Payment for your order',
      image: 'https://i.imgur.com/3g7nmJC.png', // Replace with your logo
      currency: 'INR',
      key: 'YOUR_RAZORPAY_KEY', // **Replace this!**
      amount: amountInPaise.toString(),
      name: 'Your App/Company Name',
      order_id: '', //  Important for real apps
      prefill: {
        email: 'user@example.com',
        contact: '9876543210',
        name: 'User Name',
      },
      theme: { color: '#F37254' },
    };

    console.log("RazorpayCheckout:", RazorpayCheckout); // Add this for debugging!

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('Razorpay Success:', data);
        Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        console.log('Razorpay Error:', error);
        Alert.alert('Payment Failed', 'Something went wrong. Please try again later.');
      });
  };

  return (
    <View style={styles.paymentOptionContainer}>
      <Text style={styles.label}>Enter Amount to Pay (INR):</Text>
      <TextInput
        placeholder="e.g., 10.00"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Pay Now" onPress={handlePayNow} color="#F37254" />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentOptionContainer: {
    width: '80%',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default RazorpayPayment;