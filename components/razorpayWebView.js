// components/razorpayWebView.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function RazorpayWebView({ amount }) {
  const htmlContent = `
    <html>
    <head>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body onload="triggerPayment()">
      <script>
        function triggerPayment() {
          var options = {
            key: "rzp_test_Pw8TfnPEJTMwHX",
            amount: ${amount} * 100,
            currency: "INR",
            name: "Test Payment",
            description: "Test Transaction",
            image: "",
            handler: function (response){
              window.ReactNativeWebView.postMessage("Payment Successful: " + response.razorpay_payment_id);
            },
            prefill: {
              name: "Test User",
              email: "test@example.com",
              contact: "9999999999"
            },
            theme: {
              color: "#f0b90b"
            }
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();
        }
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      onMessage={event => alert(event.nativeEvent.data)}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    marginTop: 20
  }
});
