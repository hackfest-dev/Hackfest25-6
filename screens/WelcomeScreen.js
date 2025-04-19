import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/lo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.welcomeText}>Welcome</Text>
    

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('IFSCInput')}
      >
        <Text style={styles.buttonText}>New User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Existing User</Text>
      </TouchableOpacity>
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#f0b90b',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f0b90b',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
