export interface Vehicle {
  id: string;
  name: string;
  shortName: string;
  category: 'sedan' | 'suv' | 'van' | 'tempo' | 'bus';
  capacity: string; // "4+1" means 4 passengers + 1 driver
  passengerCount: number; // actual passenger seats (no driver)
  image: string;
  features: string[];
  idealFor: string[];
  acAvailable: boolean;
  luggageCapacity: string;
  fuelType: string;
  description: string;
  variants?: string[]; // e.g. ["18 Seater", "25 Seater"]
  badge?: string;
  color: string; // accent color for card
  interiorImage?: string;
}

export const vehicles: Vehicle[] = [
  {
    id: 'etios',
    name: 'Toyota Etios',
    shortName: 'Etios',
    category: 'sedan',
    capacity: '4+1',
    passengerCount: 4,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    features: ['AC', 'GPS Tracking', 'Clean & Sanitised', 'Music System', 'Charging Points', 'Experienced Driver'],
    idealFor: ['Solo Travelers', 'Couples', 'Small Families', 'Business Travel'],
    acAvailable: true,
    luggageCapacity: '2 Large Bags',
    fuelType: 'Petrol / CNG',
    description: 'Our most popular choice for couples and small families. The Toyota Etios combines comfort, fuel efficiency, and reliability for long South India drives. Spacious boot, smooth ride, and an experienced driver who knows every route.',
    badge: 'Most Booked',
    color: '#E8651A',
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    shortName: 'Innova',
    category: 'suv',
    capacity: '7+1',
    passengerCount: 7,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    features: ['AC', 'GPS Tracking', 'Captain Seats', 'Large Boot', 'Music System', 'Charging Points', 'Pushback Seats'],
    idealFor: ['Families', 'Groups', 'Pilgrimages', 'Hill Stations'],
    acAvailable: true,
    luggageCapacity: '4 Large Bags',
    fuelType: 'Diesel',
    description: 'The dependable workhorse for family travel across South India. The Toyota Innova fits 7 passengers comfortably with ample boot space. Ideal for pilgrimages, hill station trips, and inter-city transfers.',
    color: '#2D7A4F',
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    shortName: 'Innova Crysta',
    category: 'suv',
    capacity: '7+1',
    passengerCount: 7,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    features: ['AC', 'GPS Tracking', 'Leather Captain Seats', 'Sunroof (select)', 'Premium Audio', 'USB Charging', 'Extra Legroom', 'Cushioned Headrests'],
    idealFor: ['Premium Travel', 'Honeymoon Trips', 'Corporate Travel', 'VIP Transfers'],
    acAvailable: true,
    luggageCapacity: '5 Large Bags',
    fuelType: 'Diesel',
    description: 'The premium upgrade to the Innova — featuring leather captain seats, superior ride quality, and a refined cabin. Perfect for honeymoon couples, corporate executives, or anyone who wants to travel in style across South India.',
    badge: 'Premium',
    color: '#D4A017',
  },
  {
    id: 'urbania',
    name: 'Force Urbania Van',
    shortName: 'Urbania Van',
    category: 'van',
    capacity: '12–18',
    passengerCount: 17,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    variants: ['12 Seater', '18 Seater'],
    features: ['AC', 'GPS Tracking', 'Pushback Recliner Seats', 'Large Overhead Storage', 'Step Entry', 'Music System', 'Wide Aisle'],
    idealFor: ['Office Groups', 'School Trips', 'Temple Tours', 'Medium Groups', 'Airport Transfers'],
    acAvailable: true,
    luggageCapacity: '6–8 Bags',
    fuelType: 'Diesel',
    description: 'The modern, comfortable van for groups up to 18. The Force Urbania features premium recliner seats, strong AC, and smooth highway performance — a major upgrade from traditional vans. Perfect for office outings and temple group tours.',
    badge: 'Best for Groups',
    color: '#5B5EA6',
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    shortName: 'Tempo Traveller',
    category: 'tempo',
    capacity: '12+1',
    passengerCount: 12,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80',
    features: ['AC', 'GPS Tracking', 'Recliner Seats', 'Large Luggage Space', 'Music System', 'Curtains', 'Emergency Exit', 'First Aid Kit'],
    idealFor: ['Pilgrimages', 'Family Reunions', 'College Trips', 'Corporate Outings'],
    acAvailable: true,
    luggageCapacity: '8–10 Bags + Roof Carrier',
    fuelType: 'Diesel',
    description: 'The classic choice for large family pilgrimages and group tours. The Tempo Traveller offers generous headroom, recliner seats, and roof carrier for heavy luggage — battle-tested on routes to Rameswaram, Ooty, and Kanyakumari.',
    color: '#C0392B',
  },
  {
    id: 'coach-18-25',
    name: 'Mini Coach',
    shortName: 'Mini Coach',
    category: 'bus',
    capacity: '18–25',
    passengerCount: 24,
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80',
    variants: ['18 Seater', '25 Seater'],
    features: ['AC', 'GPS Tracking', 'Recliner Seats', 'PA System / Mic', 'Large Luggage Bay', 'Reading Lights', 'Curtains', 'Emergency Door'],
    idealFor: ['Large Group Tours', 'Corporate Events', 'Pilgrimage Groups', 'School Excursions', 'Wedding Shuttles'],
    acAvailable: true,
    luggageCapacity: 'Large Undercarriage Bay',
    fuelType: 'Diesel',
    description: 'Our 18 and 25-seater mini coaches are ideal for organised group travel. Equipped with PA systems for tour leaders, recliner seating, strong AC, and large luggage bays — everything your group needs for a smooth, enjoyable journey.',
    badge: 'Group Special',
    color: '#1A7A9A',
  },
  {
    id: 'luxury-bus',
    name: 'Luxury Bus',
    shortName: 'Luxury Bus',
    category: 'bus',
    capacity: '45',
    passengerCount: 45,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    features: ['AC', 'GPS Tracking', 'Push-back Recliner Seats', 'PA System & Screen', 'Overhead Bins', 'LED Lighting', 'Large Luggage Bay', 'Onboard Music/Video', 'First Aid'],
    idealFor: ['Large Pilgrimages', 'Corporate Conferences', 'Wedding Parties', 'College Tours', 'Festival Groups'],
    acAvailable: true,
    luggageCapacity: 'Full Undercarriage Bay + Overhead',
    fuelType: 'Diesel',
    description: 'Our flagship 45-seater luxury bus for large events and pilgrimages. Features include premium push-back recliners, entertainment system, PA microphone, and massive luggage capacity. The most cost-effective way to move large groups across South India.',
    badge: 'Largest Fleet',
    color: '#7A1A7A',
  },
];

export const categoryLabels: Record<string, string> = {
  sedan: 'Sedan',
  suv: 'SUV',
  van: 'Van',
  tempo: 'Tempo Traveller',
  bus: 'Coach / Bus',
};
