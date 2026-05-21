// Central data store for all site content (persisted via localStorage in admin)
export interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  priceUnit: string;
  highlights: string[];
  badge?: string;
  popular?: boolean;
  destinations: string[];
}

export interface TextBlock {
  id: string;
  section: string;
  heading: string;
  body: string;
  align?: 'left' | 'center' | 'right';
}

export interface Coupon {
  code: string;
  discount: number; // percentage
  type: 'percentage' | 'flat';
  minBooking: number;
  maxDiscount?: number;
  active: boolean;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface FareRule {
  from: string;
  to: string;
  basePrice: number;
  pricePerKm: number;
  distanceKm: number;
}

export const defaultCarousel: CarouselSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    title: 'Explore South India from Trichy',
    subtitle: 'Comfortable cabs, unforgettable journeys — your adventure begins here',
    ctaText: 'Book Now',
    ctaLink: '/booking',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80',
    title: 'Sacred Pilgrimages Made Easy',
    subtitle: 'Visit Rameswaram, Madurai, Kashi & more with our verified drivers from Trichy',
    ctaText: 'View Packages',
    ctaLink: '/packages',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=80',
    title: 'Hill Stations & Misty Mountains',
    subtitle: 'Ooty, Kodaikanal, Munnar — drive through the clouds',
    ctaText: 'Estimate Fare',
    ctaLink: '/#fare-estimator',
  },
];

export const defaultPackages: Package[] = [
  {
    id: 'p1',
    title: 'Trichy to Rameswaram',
    description: 'A divine pilgrimage journey from Trichy to the island of Rameswaram, visiting the sacred Ramanathaswamy Temple.',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80',
    duration: '1 Day',
    price: 2800,
    priceUnit: 'per cab',
    highlights: ['AC Cab', 'Experienced Driver', 'Temple Stops', 'Return Trip'],
    badge: 'Most Booked',
    popular: true,
    destinations: ['Trichy', 'Rameswaram'],
  },
  {
    id: 'p2',
    title: 'Trichy to Kodaikanal',
    description: 'Escape to the misty hills of Kodaikanal, the Princess of Hill Stations, with panoramic valley views and serene lakes.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    duration: '1 Day',
    price: 3200,
    priceUnit: 'per cab',
    highlights: ['Hill Route', 'AC Cab', 'Scenic Stops', 'Flexible Timing'],
    destinations: ['Trichy', 'Kodaikanal'],
  },
  {
    id: 'p3',
    title: 'Ooty & Coonoor Tour',
    description: 'A refreshing 2-day escape to the Nilgiris — Ooty lake, Botanical Gardens, Coonoor tea estates and more.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
    duration: '2 Days',
    price: 6500,
    priceUnit: 'per cab',
    highlights: ['2-Day Trip', 'Hotel Assist', 'Sightseeing', 'Tea Estate Visit'],
    badge: 'Best Value',
    destinations: ['Trichy', 'Ooty', 'Coonoor'],
  },
  {
    id: 'p4',
    title: 'Munnar Hill Retreat',
    description: 'Cross into Kerala and discover the emerald tea gardens of Munnar, a paradise for nature lovers.',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
    duration: '2 Days',
    price: 7500,
    priceUnit: 'per cab',
    highlights: ['Kerala Crossing', 'Tea Plantations', 'Waterfall Stops', 'AC Cab'],
    destinations: ['Trichy', 'Munnar'],
  },
  {
    id: 'p5',
    title: 'Kanyakumari Sunrise Trip',
    description: 'Watch the sun rise from the southernmost tip of India where three seas meet. A spiritual and scenic marvel.',
    image: 'https://images.unsplash.com/photo-1623766216903-f4b5e5e5e5c8?w=800&q=80',
    duration: '1 Day',
    price: 3800,
    priceUnit: 'per cab',
    highlights: ['Sunrise View', 'Vivekananda Rock', 'Beach Stops', 'Return Trip'],
    destinations: ['Trichy', 'Kanyakumari'],
  },
  {
    id: 'p6',
    title: 'Trichy to Chennai Transfer',
    description: 'Comfortable long-distance cab from Trichy to Chennai, with rest stops at your convenience.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    duration: 'One Way',
    price: 5200,
    priceUnit: 'per cab',
    highlights: ['AC Sedan/SUV', 'Rest Stops', 'Night Travel OK', 'GPS Tracked'],
    destinations: ['Trichy', 'Chennai'],
  },
];

export const defaultTextBlocks: TextBlock[] = [
  {
    id: 'hero-tagline',
    section: 'hero',
    heading: 'Your Journey, Our Promise',
    body: 'Rashmi Tours and Travels has been serving passengers across Tamil Nadu and South India since 2010. We combine local knowledge with modern comfort to make every ride memorable.',
    align: 'center',
  },
  {
    id: 'about-main',
    section: 'about',
    heading: 'About Rashmi Tours',
    body: 'Based in Trichy — the heart of Tamil Nadu — Rashmi Tours and Travels offers premium cab services for pilgrimages, hill station tours, inter-city transfers, and custom travel packages. Our fleet of well-maintained vehicles and trained, courteous drivers ensure a safe and pleasant journey every time.',
    align: 'left',
  },
  {
    id: 'why-us',
    section: 'why-us',
    heading: 'Why Choose Us?',
    body: 'With over 14 years of experience, 1000+ satisfied customers, 24/7 support, and transparent pricing with no hidden charges — Rashmi Tours and Travels is your most trusted travel partner in South India.',
    align: 'center',
  },
];

export const defaultCoupons: Coupon[] = [
  {
    code: 'RASHMI10',
    discount: 10,
    type: 'percentage',
    minBooking: 2000,
    maxDiscount: 500,
    active: true,
    description: '10% off on bookings above ₹2000',
  },
  {
    code: 'WELCOME200',
    discount: 200,
    type: 'flat',
    minBooking: 3000,
    active: true,
    description: '₹200 flat off on first booking above ₹3000',
  },
  {
    code: 'PILGRIM15',
    discount: 15,
    type: 'percentage',
    minBooking: 2500,
    maxDiscount: 750,
    active: true,
    description: '15% off on pilgrimage packages',
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Krishnamurthy',
    location: 'Chennai',
    rating: 5,
    text: 'Excellent service! The driver was punctual and very knowledgeable about the route to Rameswaram. The cab was clean and comfortable. Will definitely book again.',
    avatar: 'PK',
  },
  {
    id: 't2',
    name: 'Rajesh Kumar',
    location: 'Bangalore',
    rating: 5,
    text: 'Our Kodaikanal trip was absolutely wonderful. The driver waited patiently at every viewpoint. Rashmi Tours made our family holiday stress-free!',
    avatar: 'RK',
  },
  {
    id: 't3',
    name: 'Meena Sundaram',
    location: 'Coimbatore',
    rating: 5,
    text: 'Very professional and trustworthy. The pricing is transparent with no hidden charges. Highly recommend for pilgrimages and hill station trips.',
    avatar: 'MS',
  },
];

export const defaultFareRules: FareRule[] = [
  { from: 'Trichy', to: 'Rameswaram', basePrice: 800, pricePerKm: 14, distanceKm: 165 },
  { from: 'Trichy', to: 'Kodaikanal', basePrice: 700, pricePerKm: 15, distanceKm: 120 },
  { from: 'Trichy', to: 'Ooty', basePrice: 900, pricePerKm: 14, distanceKm: 210 },
  { from: 'Trichy', to: 'Kanyakumari', basePrice: 900, pricePerKm: 14, distanceKm: 245 },
  { from: 'Trichy', to: 'Chennai', basePrice: 1200, pricePerKm: 13, distanceKm: 460 },
  { from: 'Trichy', to: 'Munnar', basePrice: 1000, pricePerKm: 15, distanceKm: 190 },
  { from: 'Trichy', to: 'Tirunelveli', basePrice: 600, pricePerKm: 13, distanceKm: 160 },
  { from: 'Trichy', to: 'Madurai', basePrice: 600, pricePerKm: 13, distanceKm: 135 },
  { from: 'Trichy', to: 'Coimbatore', basePrice: 700, pricePerKm: 13, distanceKm: 210 },
  { from: 'Trichy', to: 'Bangalore', basePrice: 1500, pricePerKm: 13, distanceKm: 470 },
];

export const vehicleTypes = [
  { id: 'sedan', label: 'Sedan (Dzire/Etios)', multiplier: 1.0, capacity: '4 Passengers' },
  { id: 'suv', label: 'SUV (Innova/Ertiga)', multiplier: 1.4, capacity: '6 Passengers' },
  { id: 'tempo', label: 'Tempo Traveller', multiplier: 1.9, capacity: '12 Passengers' },
];

export const ADMIN_CREDENTIALS = {
  username: 'rashmi_admin',
  password: 'Rashmi@2024!',
};
