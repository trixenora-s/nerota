import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data first (optional - remove if you want to keep existing data)
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleared existing data');

  // Create all event categories using createMany
  await prisma.category.createMany({
    data: [
      {
        name: 'Anniversaries',
        slug: 'anniversary',
        description: 'Celebrate love with elegant, premium décor themes and curated surprises.',
        imageUrl: 'https://images.unsplash.com/photo-1571896349840-64e915d7f8ee?w=800&h=600&fit=crop'
      },
      {
        name: 'Annaprashan (First Feeding Ceremony)',
        slug: 'annaprashan',
        description: 'Beautiful traditions, warm ceremonies, and premium décor for your family\'s first milestone.',
        imageUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&h=600&fit=crop'
      },
      {
        name: 'Baby Born / Naming Ceremony (Naamkaran)',
        slug: 'naamkaran',
        description: 'Heartfelt décor for naming ceremonies that capture the joy of your newest family member.',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop'
      },
      {
        name: 'Baby Shower (Godh Bharai)',
        slug: 'baby-shower',
        description: 'Vibrant and joyful celebrations for expecting parents and their nearest loved ones.',
        imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop'
      },
      {
        name: 'Birthdays',
        slug: 'birthday',
        description: 'Signature birthday setups with bespoke décor, lighting, and unforgettable presentation.',
        imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop'
      },
      {
        name: 'Diwali / Dhanteras',
        slug: 'diwali',
        description: 'Festive lighting, rangoli, and premium décor packages for the most joyous season.',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Engagement',
        slug: 'engagement',
        description: 'Elegant proposals and engagement parties with curated décor that feels timeless.',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'
      },
      {
        name: 'Haldi Ceremony',
        slug: 'haldi',
        description: 'Bright, cheerful setups crafted to highlight every haldi ritual and family moment.',
        imageUrl: 'https://images.unsplash.com/photo-1598300042200-8e8e543b6e5c?w=800&h=600&fit=crop'
      },
      {
        name: 'Janmashtami',
        slug: 'janmashtami',
        description: 'Devotional styling, lights, and décor that honor the spirit of Krishna Janmashtami.',
        imageUrl: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=800&h=600&fit=crop'
      },
      {
        name: 'Mehendi Ceremony',
        slug: 'mehendi',
        description: 'Lively décor and artistic styling for your colorful mehendi celebration.',
        imageUrl: 'https://images.unsplash.com/photo-1598300042200-8e8e543b6e5c?w=800&h=600&fit=crop'
      },
      {
        name: 'New Year\'s Eve',
        slug: 'new-year',
        description: 'Glamorous event styling for a spectacular countdown and evening of celebration.',
        imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
      },
      {
        name: 'Office / Shop Inaugurations',
        slug: 'office-inauguration',
        description: 'Corporate launch décor designed to make your opening day feel polished and powerful.',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
      },
      {
        name: 'Reception',
        slug: 'reception',
        description: 'Refined reception décor that blends luxury, lighting, and personalized guest experiences.',
        imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'
      },
      {
        name: 'Surprise Proposals',
        slug: 'proposal',
        description: 'Private and dramatic proposal décor for unforgettable moments and perfect reveals.',
        imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop'
      },
      {
        name: 'Wedding Ceremony',
        slug: 'wedding',
        description: 'Full wedding décor solutions for every ritual, venue, and dream theme.',
        imageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop'
      }
    ]
  });

  // Get all categories to use their IDs
  const categoryRecords = await prisma.category.findMany();
  console.log(`✅ Created ${categoryRecords.length} categories`);

  // Create sample products for each category
  const products = [];

  for (const category of categoryRecords) {
    const categoryProducts = [
      {
        title: `${category.name} Premium Package`,
        slug: `${category.slug}-premium-package`,
        description: `Complete premium decoration package for ${category.name.toLowerCase()} with high-end materials and professional setup.`,
        categoryId: category.id,
        price: 25000,
        discountPrice: 22000,
        stockQuantity: 10,
        images: [
          `https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop`,
          `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop`
        ],
        specifications: {
          duration: 'Full day setup',
          includes: ['Premium decorations', 'Lighting setup', 'Professional coordination', 'Cleanup service'],
          capacity: '50-200 guests'
        }
      },
      {
        title: `${category.name} Classic Package`,
        slug: `${category.slug}-classic-package`,
        description: `Elegant and affordable decoration package for ${category.name.toLowerCase()} with quality materials.`,
        categoryId: category.id,
        price: 15000,
        discountPrice: 13500,
        stockQuantity: 15,
        images: [
          `https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop`
        ],
        specifications: {
          duration: 'Half day setup',
          includes: ['Quality decorations', 'Basic lighting', 'Setup service'],
          capacity: '20-100 guests'
        }
      },
      {
        title: `${category.name} Luxury Experience`,
        slug: `${category.slug}-luxury-experience`,
        description: `Ultimate luxury decoration experience for ${category.name.toLowerCase()} with premium materials and VIP service.`,
        categoryId: category.id,
        price: 50000,
        discountPrice: 45000,
        stockQuantity: 5,
        images: [
          `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop`,
          `https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop`
        ],
        specifications: {
          duration: 'Full day + coordination',
          includes: ['Luxury decorations', 'Advanced lighting', 'VIP coordination', 'Photography setup', 'Premium cleanup'],
          capacity: '100-500 guests'
        }
      }
    ];

    for (const product of categoryProducts) {
      products.push(await prisma.product.create({ data: product }));
    }
  }

  console.log(`✅ Created ${products.length} products`);

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Demo User',
        email: 'demo@celebdecor.com',
        phone: '+91 98765 43210',
        isVerified: true,
        role: 'user'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@celebdecor.com',
        phone: '+91 98765 43211',
        isVerified: true,
        role: 'admin'
      }
    })
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create sample reviews
  const reviews = [];
  for (const product of products.slice(0, 10)) { // Add reviews to first 10 products
    const reviewData = [
      {
        userId: users[0].id,
        productId: product.id,
        rating: 5,
        comment: 'Absolutely amazing! The decorations exceeded our expectations. Professional service and beautiful setup.',
        images: []
      },
      {
        userId: users[0].id,
        productId: product.id,
        rating: 4,
        comment: 'Great quality and timely delivery. Would definitely recommend for special occasions.',
        images: []
      }
    ];

    for (const review of reviewData) {
      reviews.push(await prisma.review.create({ data: review }));
    }
  }

  console.log(`✅ Created ${reviews.length} reviews`);

  console.log('🎉 Database seeding completed successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - ${categoryRecords.length} categories`);
  console.log(`   - ${products.length} products`);
  console.log(`   - ${users.length} users`);
  console.log(`   - ${reviews.length} reviews`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });