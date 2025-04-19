import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { db } from '../utils/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function BankCodeScreen({ route, navigation }) {
  const { ifsc } = route.params;
  const [bankCode, setBankCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerifyBankCode = async () => {
    if (!bankCode.trim()) {
      setError('Please enter a valid Bank Code.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const banksRef = collection(db, 'banks');
      const q = query(banksRef, where('bankCode', '==', bankCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        navigation.navigate('Signup', { bankCode });
      } else {
        setError('Invalid Bank Code for the given IFSC.');
      }
    } catch (err) {
      console.error('Verification Error:', err);
      setError('Error verifying bank code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Bank Code for</Text>
      <Text style={styles.ifsc}>{ifsc}</Text>

      <TextInput
        placeholder="e.g. HDFC-UX-901"
        placeholderTextColor="#777"
        style={styles.input}
        value={bankCode}
        onChangeText={setBankCode}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#f0b90b" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleVerifyBankCode}>
          <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 4,
  },
  ifsc: {
    color: '#f0b90b',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f0b90b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  error: {
    color: '#ff5252',
    marginBottom: 10,
    textAlign: 'center',
  },
});
