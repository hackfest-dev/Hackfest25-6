import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { notificationsRef } from '../services/firebaseConfig';

import { useNavigation } from '@react-navigation/native';

const NotificationBell = () => {
  const navigation = useNavigation();

  const openNotifications = () => {
    navigation.navigate('Notifications');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={openNotifications}>
      <Icon name="notifications-outline" size={24} color="#f0b90b" />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
});

export default NotificationBell;
