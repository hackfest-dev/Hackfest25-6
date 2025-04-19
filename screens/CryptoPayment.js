import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function CryptoPayment() {
  const [walletAddress, setWalletAddress] = useState('');
  const [maticBalance, setMaticBalance] = useState(null);
  const [maticRate, setMaticRate] = useState(null);

  const handleCheckBalance = async () => {
    if (!walletAddress) return Alert.alert('Please enter wallet address');

    try {
      const res = await axios.get(
        `https://api.polygonscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=YourPolygonScanAPIKey`
      );

      const balanceInWei = res.data.result;
      const balanceInEth = parseFloat(balanceInWei) / 1e18;
      setMaticBalance(balanceInEth.toFixed(4));

      const rateRes = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=inr'
      );
      const rate = rateRes.data['matic-network'].inr;
      setMaticRate(rate.toFixed(2));
    } catch (err) {
      Alert.alert('Failed to fetch wallet data', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Wallet Address</Text>
      <TextInput
        style={styles.input}
        placeholder="0xABC...123"
        placeholderTextColor="#777"
        value={walletAddress}
        onChangeText={setWalletAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleCheckBalance}>
        <Text style={styles.buttonText}>💱 Check Wallet Balance</Text>
      </TouchableOpacity>

      {maticBalance && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.cryptoText}>MATIC Balance: {maticBalance}</Text>
          <Text style={styles.cryptoText}>Rate: ₹{maticRate}/MATIC</Text>
          <Text style={styles.cryptoText}>
            Total: ₹{(maticBalance * maticRate).toFixed(2)}
          </Text>
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
  cryptoText: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 5 },
});
