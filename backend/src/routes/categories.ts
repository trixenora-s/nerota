import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        imageUrl: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ categories });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/:slug', async (req: express.Request, res: express.Response) => {
  try {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
          include: {
            _count: { select: { reviews: true } },
            reviews: { select: { rating: true } }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const products = category.products.map((product: any) => {
      const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length
        : null;

      return {
        id: product.id,
        title: product.title,
        slug: product.slug,
        description: product.description,
        price: product.price,
        discountPrice: product.discountPrice,
        stockQuantity: product.stockQuantity,
        images: product.images,
        specifications: product.specifications,
        avgRating,
        reviewCount: product._count?.reviews || 0,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      };
    });

    res.json({
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        imageUrl: category.imageUrl
      },
      products
    });
  } catch (error) {
    console.error('Category detail error:', error);
    res.status(500).json({ error: 'Failed to fetch category details' });
  }
});

export default router;
