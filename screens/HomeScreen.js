import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';

export default function HomeScreen() {
  const [upiId, setUpiId] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [maticBalance, setMaticBalance] = useState(null);
  const [maticRate, setMaticRate] = useState(null);

  const handleQRCodeGeneration = () => {
    if (!upiId) return Alert.alert('Please enter a valid UPI ID.');
    setShowQRCode(true);
  };

  const handleRedirectToGPay = () => {
    if (!upiId) return Alert.alert('Please enter a valid UPI ID.');

    const upiUrl = `upi://pay?pa=${upiId}&pn=${upiId}&cu=INR`;
    Linking.openURL(upiUrl).catch(() => {
      const intentUrl = `intent://pay?pa=${upiId}&pn=PlutoPay&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
      Linking.openURL(intentUrl).catch(() => {
        Alert.alert('Unable to open Google Pay. Please ensure it is installed.');
      });
    });
  };

  const handleCryptoConversion = async () => {
    if (!walletAddress) return Alert.alert('Please enter wallet address');

    try {
      // MATIC Balance from Polygonscan API
      const res = await axios.get(
        `https://api.polygonscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=YourPolygonScanAPIKey`
      );

      const balanceInWei = res.data.result;
      const balanceInEth = parseFloat(balanceInWei) / 1e18;
      setMaticBalance(balanceInEth.toFixed(4));

      // INR Conversion Rate from CoinGecko
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>💰 UPI Payment Options</Text>

      <Text style={styles.label}>Enter UPI ID</Text>
      <TextInput
        style={styles.input}
        placeholder="yourname@upi"
        placeholderTextColor="#777"
        value={upiId}
        onChangeText={setUpiId}
      />

      <TouchableOpacity style={styles.button} onPress={handleQRCodeGeneration}>
        <Text style={styles.buttonText}>Generate QR for UPI</Text>
      </TouchableOpacity>

      {showQRCode && (
        <View style={styles.qrContainer}>
          <QRCode
            value={`upi://pay?pa=${upiId}&pn=User&mc=0000&tid=1234567890&cu=INR`}
            size={200}
            color="black"
            backgroundColor="white"
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRedirectToGPay}>
        <Text style={styles.buttonText}>Pay via Google Pay</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Enter Wallet Address</Text>
      <TextInput
        style={styles.input}
        placeholder="0xABC...123"
        placeholderTextColor="#777"
        value={walletAddress}
        onChangeText={setWalletAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleCryptoConversion}>
        <Text style={styles.buttonText}>💱 Check Wallet Balance</Text>
      </TouchableOpacity>

      {maticBalance && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.cryptoText}>
            MATIC Balance: {maticBalance} MATIC
          </Text>
          <Text style={styles.cryptoText}>
            MATIC to INR: ₹{maticRate} / MATIC
          </Text>
          <Text style={styles.cryptoText}>
            Total: ₹{(maticBalance * maticRate).toFixed(2)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f0b90b',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#f0b90b',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 15,
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
  qrContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  cryptoText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
});
