import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import { auth } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignup = async () => {
    setError(null);
    if (!name || !email || !password) {
      setError('Please fill in all fields including the bank code.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
  
      // Generate a dummy wallet ID
      const walletID = '0x' + user.uid.slice(0, 8);
  
      // Create wallet doc
      await setDoc(doc(db, 'wallet', walletID), {
        userName: name,
        balance: 5,
      });
  
      setShowSuccess(true); // Show styled modal
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
    }
  };

  const handleModalClose = () => {
    setShowSuccess(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        placeholder="Name"
        placeholderTextColor="#777"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Custom Styled Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>  Signup Successful!</Text>
            <Text style={styles.modalText}>Please log in to continue.</Text>
            <Pressable style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Go to Login</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  heading: {
    fontSize: 26,
    color: '#f0b90b',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#f0b90b',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#f0b90b',
    borderWidth: 1,
  },
  modalTitle: {
    color: '#f0b90b',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#f0b90b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

