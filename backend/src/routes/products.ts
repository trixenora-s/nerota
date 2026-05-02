import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const { 
      category, 
      search, 
      page = '1', 
      limit = '12', 
      sort = 'createdAt', 
      order = 'desc' 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = { isActive: true };
    
    if (category) where.categoryId = category;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: Number(skip),
        take: Number(limit),
        orderBy: { [sort as string]: order as any },
        include: {
          _count: { select: { reviews: true } },
          reviews: { select: { rating: true }, take: 5 }
        }
      }),
      prisma.product.count({ where })
    ]);

    const productsWithAvgRating = products.map((product: any) => {
      const avgRating = product.reviews.length > 0 
        ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length
        : null;
      
      return {
        ...product,
        avgRating,
        reviewCount: product._count.reviews
      };
    });

    res.json({
      products: productsWithAvgRating,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const productId = Array.isArray(id) ? id[0] : id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        reviews: {
          include: { user: { select: { name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'desc' }
        },
        _count: { select: { reviews: true } }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const avgRating = product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length
      : null;

    res.json({
      ...product,
      avgRating,
      reviewCount: product._count?.reviews || 0
    });
  } catch (error) {
    console.error('Product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;