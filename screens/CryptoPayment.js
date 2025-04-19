import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

const currentUser = {
  name: "Harshal (You)",
  walletId: "0xABC123XYZ",
  balance: 5,
};

export default function CryptoPayment() {
  const [receiverWalletId, setReceiverWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(currentUser.balance);

  const sendPiCoins = () => {
    const amt = parseFloat(amount);

    if (!receiverWalletId.trim()) {
      return Alert.alert("Error", "Please enter a wallet ID.");
    }

    if (!amt || amt <= 0) {
      return Alert.alert("Error", "Enter a valid amount.");
    }

    if (amt > 5) {
      return Alert.alert("Error", "Amount must be 5 Pi or less.");
    }

    if (amt > balance) {
      return Alert.alert("Error", "Insufficient balance.");
    }

    setBalance(balance - amt);

    Alert.alert(
      "Payment Successful",
      `${amt} Pi Coins sent to ${receiverWalletId}`
    );

    setReceiverWalletId("");
    setAmount("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Send Pi Coins</Text>

      <Text style={styles.label}>Your Wallet ID: {currentUser.walletId}</Text>
      <Text style={styles.label}>Your Balance: {balance.toFixed(2)} Pi</Text>

      <TextInput
        placeholder="Enter Receiver's Wallet ID"
        value={receiverWalletId}
        onChangeText={setReceiverWalletId}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount to Send"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Send Pi Coins" onPress={sendPiCoins} />

      <View style={styles.divider} />

      <Text style={styles.note}>
        Any wallet ID is accepted. You can send up to 5 Pi Coins.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: "center" },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  divider: {
    marginVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  note: { textAlign: "center", color: "#888", fontSize: 14 },
});
