export interface EventCategory {
  slug: string;
  title: string;
  description: string;
  highlight: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  rating?: number;
  badge: string;
  duration: string;
  description: string;
  event: string;
}

export const eventCategories: EventCategory[] = [
  {
    slug: 'anniversary',
    title: 'Anniversaries',
    description: 'Celebrate love with elegant, premium décor themes and curated surprises.',
    highlight: 'Romantic packages for every milestone.',
  },
  {
    slug: 'annaprashan',
    title: 'Annaprashan (First Feeding Ceremony)',
    description: 'Beautiful traditions, warm ceremonies, and premium décor for your family’s first milestone.',
    highlight: 'Nourishing moments deserve flawless styling.',
  },
  {
    slug: 'naamkaran',
    title: 'Baby Born / Naming Ceremony (Naamkaran)',
    description: 'Heartfelt décor for naming ceremonies that capture the joy of your newest family member.',
    highlight: 'Personalized rituals with elegant design.',
  },
  {
    slug: 'baby-shower',
    title: 'Baby Shower (Godh Bharai)',
    description: 'Vibrant and joyful celebrations for expecting parents and their nearest loved ones.',
    highlight: 'Playful themes for expecting families.',
  },
  {
    slug: 'birthday',
    title: 'Birthdays',
    description: 'Signature birthday setups with bespoke décor, lighting, and unforgettable presentation.',
    highlight: 'Create milestone moments in every age.',
  },
  {
    slug: 'diwali',
    title: 'Diwali / Dhanteras',
    description: 'Festive lighting, rangoli, and premium décor packages for the most joyous season.',
    highlight: 'Bring radiant warmth to every celebration.',
  },
  {
    slug: 'engagement',
    title: 'Engagement',
    description: 'Elegant proposals and engagement parties with curated décor that feels timeless.',
    highlight: 'Every detail speaks to your story.',
  },
  {
    slug: 'haldi',
    title: 'Haldi Ceremony',
    description: 'Bright, cheerful setups crafted to highlight every haldi ritual and family moment.',
    highlight: 'Celebrate tradition with vivid color palettes.',
  },
  {
    slug: 'janmashtami',
    title: 'Janmashtami',
    description: 'Devotional styling, lights, and décor that honor the spirit of Krishna Janmashtami.',
    highlight: 'Devotion, elegance, and memorable experiences.',
  },
  {
    slug: 'mehendi',
    title: 'Mehendi Ceremony',
    description: 'Lively décor and artistic styling for your colorful mehendi celebration.',
    highlight: 'Joyful patterns and festive details.',
  },
  {
    slug: 'new-year',
    title: 'New Year’s Eve',
    description: 'Glamorous event styling for a spectacular countdown and evening of celebration.',
    highlight: 'A fresh year begins with unforgettable décor.',
  },
  {
    slug: 'office-inauguration',
    title: 'Office / Shop Inaugurations',
    description: 'Corporate launch décor designed to make your opening day feel polished and powerful.',
    highlight: 'Professional styling for business premieres.',
  },
  {
    slug: 'reception',
    title: 'Reception',
    description: 'Refined reception décor that blends luxury, lighting, and personalized guest experiences.',
    highlight: 'Celebrate with grandeur and grace.',
  },
  {
    slug: 'proposal',
    title: 'Surprise Proposals',
    description: 'Private and dramatic proposal décor for unforgettable moments and perfect reveals.',
    highlight: 'Set the stage for a lifetime of memories.',
  },
  {
    slug: 'wedding',
    title: 'Wedding Ceremony',
    description: 'Full wedding décor solutions for every ritual, venue, and dream theme.',
    highlight: 'From traditional to modern, every ceremony is exceptional.',
  },
];

const productTemplates = [
  {
    title: 'Premium décor package',
    badge: 'Best seller',
    duration: 'Full-day setup',
    description: 'Signature styling with premium floral, lights, and finishing touches.',
  },
  {
    title: 'Classic celebration kit',
    badge: 'Recommended',
    duration: 'Half-day setup',
    description: 'Thoughtfully curated décor for a polished and joyful experience.',
  },
  {
    title: 'Lux experience bundle',
    badge: 'Luxury pick',
    duration: 'Full-day setup',
    description: 'High-end theme décor with VIP details and advanced lighting.',
  },
  {
    title: 'Day-of coordination pack',
    badge: 'Staff included',
    duration: 'Day-of support',
    description: 'Professional coordination and decor execution for a flawless event.',
  },
];

export const getCategoryBySlug = (slug: string) =>
  eventCategories.find((category) => category.slug === slug);

export const getProductsForCategory = (slug: string): Product[] => {
  const category = getCategoryBySlug(slug);
  const baseTitle = category?.title ?? 'Event';

  return productTemplates.map((template, index) => ({
    id: `${slug}-${index}`,
    title: `${baseTitle} ${template.title}`,
    price: 12000 + index * 7000,
    rating: [4.8, 4.6, 4.9, undefined][index],
    badge: template.badge,
    duration: template.duration,
    description: template.description,
    event: baseTitle,
  }));
};

export const getFeaturedCategories = () =>
  eventCategories.slice(0, 6);

export const searchCategories = (query: string) => {
  const lowercased = query.toLowerCase();
  return eventCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(lowercased) ||
      category.description.toLowerCase().includes(lowercased)
  );
};
