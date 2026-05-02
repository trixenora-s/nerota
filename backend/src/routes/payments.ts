import express from 'express';
import Razorpay from 'razorpay';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const razorpayClient = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  : null;

router.post('/process', authenticateToken, async (req: express.Request, res: express.Response) => {
  if (!razorpayClient) {
    return res.status(501).json({
      success: false,
      error: 'Payment gateway not configured',
      message: 'Razorpay credentials are required to process payments.'
    });
  }
  try {
    const { orderId, amount, currency = 'INR', receipt } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing payment details',
        message: 'orderId and amount are required.'
      });
    }

    const razorpayOrder = await razorpayClient.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt: receipt || `receipt_${orderId}`,
      payment_capture: true
    });

    res.json({
      success: true,
      order: razorpayOrder,
      message: 'Payment order created successfully'
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Payment creation failed',
      message: 'Unable to create a payment order at this time.'
    });
  }
});

// Get payment status
router.get('/status/:transactionId', authenticateToken, async (req: express.Request, res: express.Response) => {
  if (!razorpayClient) {
    return res.status(501).json({ error: 'Payment gateway not configured' });
  }

  try {
    const { transactionId } = req.params;

    const payment = await razorpayClient.payments.fetch(transactionId);

    res.json({
      transactionId,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      createdAt: new Date(payment.created_at * 1000).toISOString(),
      gatewayResponse: payment
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

export default router;