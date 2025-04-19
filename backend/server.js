const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
app.post('/api/payment/create-order', async (req, res) => {
  const { amount } = req.body;
  try {
    // Create Razorpay order with the provided amount
    const order = await razorpay.orders.create({
      amount: amount * 100,  // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_receipt_${new Date().getTime()}`,
      payment_capture: 1,
    });

    res.json(order);  // Send the order details back to frontend
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Verify Payment Signature (Razorpay payment verification)
app.post('/api/payment/verify', (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  const crypto = require('crypto');
  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(order_id + '|' + payment_id);
  const generated_signature = shasum.digest('hex');

  if (generated_signature === signature) {
    res.json({ message: 'Payment verification successful' });
  } else {
    res.status(400).json({ message: 'Payment verification failed' });
  }
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
