import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/lo.png')} // replace with your image path
        style={styles.image}
      />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="gold" />
          <Text style={styles.logText}>Starting app, please wait...</Text>
        </View>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loaderContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
