import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Create order
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      discountAmount = 0,
      finalAmount,
      paymentMethod,
      deliveryAddress,
      eventDate,
      eventTime,
      specialInstructions
    } = req.body;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber,
        items,
        totalAmount: parseFloat(totalAmount),
        discountAmount: parseFloat(discountAmount),
        finalAmount: parseFloat(finalAmount),
        paymentMethod,
        deliveryAddress,
        eventDate: eventDate ? new Date(eventDate) : null,
        eventTime,
        specialInstructions
      }
    });

    res.status(201).json({
      order,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user's orders
router.get('/user/:userId', async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;
    const { page = '1', limit = '10' } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: userIdStr },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.order.count({ where: { userId: userIdStr } })
    ]);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const orderId = Array.isArray(id) ? id[0] : id;
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
router.patch('/:id/status', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const orderId = Array.isArray(id) ? id[0] : id;
    const { status, paymentStatus } = req.body;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        paymentStatus,
        updatedAt: new Date()
      }
    });

    res.json({
      order,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Order update error:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

export default router;