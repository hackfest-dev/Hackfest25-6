import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function IFSCInputScreen({ navigation }) {
  const [ifsc, setIfsc] = useState('');

  const handleNext = () => {
    if (!ifsc.trim()) {
      alert('Input credentials'); // You can also use a Toast or Snackbar here if preferred
      return;
    }
    navigation.navigate('BankCode', { ifsc });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter IFSC Code</Text>

      <TextInput
        style={styles.input}
        value={ifsc}
        onChangeText={setIfsc}
        placeholder="e.g. HDFC0001234"
        placeholderTextColor="#888"
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
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
  label: {
    color: '#f0b90b',
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#f0b90b',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '600',
  },
});
