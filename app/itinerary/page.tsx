'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Car, ShieldCheck, Compass, Plus, Trash2, HelpCircle, Sparkles, Navigation, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

// Dynamically import map component with no SSR to prevent 'window is not defined' errors
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '480px',
      background: 'rgba(11,35,68,0.03)',
      borderRadius: 'var(--radius)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      border: '1px solid rgba(11,35,68,0.1)'
    }}>
      <div className="spinner" style={{
        width: 36,
        height: 36,
        border: '3px solid rgba(11,35,68,0.15)',
        borderTopColor: 'var(--navy)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <span style={{ fontSize: 14, fontWeight: 500 }}>Initializing Interactive Map...</span>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
});

// Destination data database
interface Destination {
  id: string;
  name: string;
  coords: [number, number];
  description: string;
  attractions: string[];
}

const DESTINATIONS: Destination[] = [
  {
    id: 'trichy',
    name: 'Trichy (Base)',
    coords: [10.7905, 78.7047],
    description: 'Starting point. Famous for Rockfort Temple, Ranganathaswamy Temple (Srirangam), and Jambukeswarar Temple.',
    attractions: ['Srirangam Temple', 'Rockfort Temple', 'Kallanai Dam']
  },
  {
    id: 'tanjore',
    name: 'Tanjore',
    coords: [10.7870, 79.1378],
    description: 'Cultural hub of Tamil Nadu, famous for the magnificent 1000-year-old Brihadisvara Temple (Big Temple).',
    attractions: ['Brihadisvara Temple', 'Tanjore Palace', 'Art Gallery']
  },
  {
    id: 'madurai',
    name: 'Madurai',
    coords: [9.9252, 78.1198],
    description: 'One of India\'s oldest continuously inhabited cities, renowned for the historic Meenakshi Amman Temple.',
    attractions: ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Palace', 'Gandhi Museum']
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram',
    coords: [9.2876, 79.3129],
    description: 'A holy island pilgrimage destination with the longest corridor temple and pristine beach crossings.',
    attractions: ['Ramanathaswamy Temple', 'Dhanushkodi Ghost Town', 'Pamban Bridge']
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    coords: [10.2381, 77.4887],
    description: 'The "Princess of Hill Stations" nestled in the Palani Hills, offering mist-covered lakes and cool pine forests.',
    attractions: ['Kodaikanal Lake', 'Coaker\'s Walk', 'Pillar Rocks']
  },
  {
    id: 'ooty',
    name: 'Ooty',
    coords: [11.4102, 76.6950],
    description: 'The "Queen of Hill Stations" in Nilgiris, famous for beautiful tea plantations, botanical gardens, and toy train.',
    attractions: ['Ooty Botanical Gardens', 'Doddabetta Peak', 'Nilgiri Mountain Railway']
  },
  {
    id: 'munnar',
    name: 'Munnar',
    coords: [10.0889, 77.0595],
    description: 'Breath-taking hill station in Kerala, surrounded by green tea plantations, scenic valleys, and waterfalls.',
    attractions: ['Eravikulam National Park', 'Mattupetty Dam', 'Tea Museum']
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    coords: [8.0883, 77.5385],
    description: 'The southern tip of India where three seas merge. Famous for amazing sunset views and Vivekananda Rock.',
    attractions: ['Vivekananda Rock Memorial', 'Thiruvalluvar Statue', 'Kanyakumari Temple']
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry',
    coords: [11.9416, 79.8083],
    description: 'Former French colony featuring tree-lined streets, French villas, beautiful beaches, and Auroville.',
    attractions: ['Promenade Beach', 'French Quarter', 'Auroville']
  },
  {
    id: 'chennai',
    name: 'Chennai',
    coords: [13.0827, 80.2707],
    description: 'Capital city with a rich history, featuring Kapaleeshwarar Temple, Marina Beach, and delicious South Indian food.',
    attractions: ['Marina Beach', 'San Thome Basilica', 'Kapaleeshwarar Temple']
  }
];

// Presets mapping
const PRESETS = [
  {
    name: 'Divine Pilgrimage',
    stops: ['trichy', 'tanjore', 'madurai', 'rameswaram', 'kanyakumari'],
    days: 4,
    desc: 'Visit the most sacred temples of Tamil Nadu.'
  },
  {
    name: 'Misty Hill Retreat',
    stops: ['trichy', 'kodaikanal', 'munnar', 'ooty'],
    days: 5,
    desc: 'Unwind in the coolest hill stations of South India.'
  },
  {
    name: 'Coastal Heritage',
    stops: ['trichy', 'tanjore', 'pondicherry', 'chennai'],
    days: 3,
    desc: 'Explore historical monuments and coastal towns.'
  }
];

const VEHICLES = [
  { id: 'etios', label: 'Toyota Etios (4+1)', baseRate: 14, capacity: '4 Pax' },
  { id: 'innova', label: 'Toyota Innova (7+1)', baseRate: 19.6, capacity: '7 Pax' },
  { id: 'tempo', label: 'Tempo Traveller', baseRate: 26.6, capacity: '12 Pax' }
];

// Haversine distance calculator between coordinates (multiplied by road winding factor of 1.3)
function getRoadDistance(coords1: [number, number], coords2: [number, number]): number {
  const R = 6371; // Earth radius in km
  const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
  const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
  const lat1 = coords1[0] * Math.PI / 180;
  const lat2 = coords2[0] * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 1.3); // Road winding factor
}

export default function ItineraryPlanner() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';
  const [selectedStops, setSelectedStops] = useState<Destination[]>([DESTINATIONS[0]]); // Starts with Trichy
  const [vehicle, setVehicle] = useState('etios');
  const [tripType, setTripType] = useState('round'); // 'one-way' or 'round'
  const [totalDistance, setTotalDistance] = useState(0);
  const [estimatedHours, setEstimatedHours] = useState(0); // Set dynamically from map route callback
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  
  // Custom activities state
  const [includeHotels, setIncludeHotels] = useState(true);
  const [includeDining, setIncludeDining] = useState(false);

  // Map click custom stop states
  const [tempCoords, setTempCoords] = useState<[number, number] | null>(null);
  const [customStopName, setCustomStopName] = useState('');

  // Reset calculations if stops are cleared
  useEffect(() => {
    if (selectedStops.length <= 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTotalDistance(0);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEstimatedHours(0);
    }
  }, [selectedStops]);

  // Load a preset itinerary
  const loadPreset = (presetStopsIds: string[]) => {
    const stops = presetStopsIds
      .map(id => DESTINATIONS.find(d => d.id === id))
      .filter((d): d is Destination => !!d);
    setSelectedStops(stops);
  };

  // Add stop to the list
  const addStop = (dest: Destination) => {
    if (selectedStops.some(s => s.id === dest.id)) {
      return; // Already added
    }
    setSelectedStops([...selectedStops, dest]);
    setAddDropdownOpen(false);
  };

  // Remove stop from the list (never remove Trichy base if it is first)
  const removeStop = (index: number) => {
    if (index === 0 && selectedStops[index].id === 'trichy') return;
    const nextStops = [...selectedStops];
    nextStops.splice(index, 1);
    setSelectedStops(nextStops);
  };

  // Move a stop up or down in order
  const moveStop = (index: number, direction: 'up' | 'down') => {
    if (index === 0 && selectedStops[index].id === 'trichy') return; // Base start fixed
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 1 || targetIndex >= selectedStops.length) return; // Can't move into index 0 or out of bounds

    const nextStops = [...selectedStops];
    const temp = nextStops[index];
    nextStops[index] = nextStops[targetIndex];
    nextStops[targetIndex] = temp;
    setSelectedStops(nextStops);
  };

  // Calculations
  const veh = VEHICLES.find(v => v.id === vehicle) || VEHICLES[0];
  const basePrice = 800;
  const estimatedFare = totalDistance > 0 ? Math.round(basePrice + totalDistance * veh.baseRate) : 0;
  const recommendedDays = totalDistance > 0 ? Math.max(1, Math.ceil(totalDistance / 180)) : 1;

  // Build booking link URL query parameters
  const getBookingLink = () => {
    const stopsString = selectedStops.map(s => s.name).join(' → ');
    let notes = `Custom Itinerary: ${stopsString}. Trip Type: ${tripType === 'round' ? 'Round Trip' : 'One Way'}.`;
    if (includeHotels) notes += ` Requesting discounted hotel booking.`;
    if (includeDining) notes += ` Requesting discounted restaurant vouchers.`;

    const toVal = selectedStops.length > 1 ? selectedStops[selectedStops.length - 1].name : '';
    const fromVal = selectedStops[0].name;

    return `/booking?from=${encodeURIComponent(fromVal)}&to=${encodeURIComponent(toVal)}&vehicle=${vehicle}&notes=${encodeURIComponent(notes)}`;
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '90vh', background: 'var(--bg-page)' }}>
        {/* Banner Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #0B2344 0%, #071523 100%)',
          padding: 'clamp(56px,7vw,90px) 16px',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="section-tag" style={{ background: 'rgba(212,175,55,0.18)', color: '#D4AF37' }}>
              Interactive Map Planner
            </span>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 5.5vw, 52px)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 14
            }}>
              Custom Itinerary Planner
            </h1>
            <p style={{
              color: 'rgba(248,246,240,0.7)',
              fontSize: 16,
              maxWidth: 580,
              margin: '0 auto'
            }}>
              Map your custom journey across South India. Choose your stops starting from Trichy, select hotel/dining discounts, and get instant fare estimates.
            </p>
          </motion.div>
        </div>

        {/* Workspace Container */}
        <div className="container" style={{ padding: '40px 16px 80px' }}>
          
          {/* Preset Itineraries Row */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={18} color="#D4AF37" /> Select a Popular Preset Route:
            </h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {PRESETS.map(p => (
                <button
                  key={p.name}
                  onClick={() => loadPreset(p.stops)}
                  className="preset-btn"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 12,
                    padding: '12px 18px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    flex: '1 1 240px',
                    boxShadow: '0 2px 8px rgba(7,21,35,0.02)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = isDark ? '#D4AF37' : 'var(--text-heading)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-navy)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(7,21,35,0.02)';
                  }}
                >
                  <strong style={{ display: 'block', color: 'var(--navy)', fontSize: 14 }}>{p.name}</strong>
                  <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700 }}>{p.days} Days Recommended</span>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout: Controls (Left) vs Map (Right) */}
          <div className="planner-grid">
            
            {/* Left Column: Timeline & Configuration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Route Builder Card */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid rgba(11,35,68,0.08)', borderRadius: 20, padding: 24, boxShadow: '0 4px 24px rgba(7,21,35,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'var(--navy)', fontWeight: 700, margin: 0 }}>
                    1. Trip Timeline
                  </h2>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                      className="btn-primary btn-sm"
                      style={{ padding: '8px 14px', borderRadius: 10 }}
                    >
                      <Plus size={15} /> Add Stop
                    </button>

                    {/* Add Stops Dropdown menu */}
                    <AnimatePresence>
                      {addDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 'calc(100% + 8px)',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-light)',
                            borderRadius: 12,
                            width: 250,
                            maxHeight: 280,
                            overflowY: 'auto',
                            boxShadow: 'var(--shadow-navy)',
                            zIndex: 100,
                            padding: '6px 0'
                          }}
                        >
                          <div style={{ padding: '6px 12px', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 0.5, borderBottom: '1px solid rgba(11,35,68,0.08)', textTransform: 'uppercase' }}>
                            Choose Destination
                          </div>
                          {DESTINATIONS.filter(d => !selectedStops.some(s => s.id === d.id)).map(dest => (
                            <button
                              key={dest.id}
                              onClick={() => addStop(dest)}
                              style={{
                                width: '100%',
                                padding: '10px 16px',
                                background: 'transparent',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: 13,
                                color: 'var(--text-main)',
                                transition: 'background 0.2s',
                                fontWeight: 500
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'var(--nav-link-hover-bg)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                              {dest.name}
                            </button>
                          ))}
                          {DESTINATIONS.filter(d => !selectedStops.some(s => s.id === d.id)).length === 0 && (
                            <div style={{ padding: '16px', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                              All stops added!
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Custom Map Click stop creator */}
                {tempCoords && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      background: 'rgba(45,122,79,0.06)',
                      border: '1px solid rgba(45,122,79,0.18)',
                      borderRadius: 14,
                      padding: 16,
                      marginBottom: 20
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
                      <strong style={{ fontSize: 13, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        New Map Location Selected
                      </strong>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 12px' }}>
                      Coordinates: {tempCoords[0].toFixed(5)}, {tempCoords[1].toFixed(5)}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div>
                        <label className="form-label" style={{ fontSize: 10, marginBottom: 4 }}>Stop Name</label>
                        <input
                          className="form-input"
                          value={customStopName}
                          onChange={e => setCustomStopName(e.target.value)}
                          placeholder="e.g. My Resort, View Point"
                          style={{ minHeight: 38, padding: '6px 12px', fontSize: 13 }}
                          autoFocus
                        />
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <button
                          type="button"
                          onClick={() => {
                            if (!customStopName.trim()) {
                              toast.error('Please enter a stop name.');
                              return;
                            }
                            const newStop: Destination = {
                              id: `custom-${Date.now()}`,
                              name: customStopName.trim(),
                              coords: tempCoords,
                              description: 'Custom waypoint marked directly on the map.',
                              attractions: ['Sightseeing']
                            };
                            setSelectedStops([...selectedStops, newStop]);
                            setTempCoords(null);
                            setCustomStopName('');
                            toast.success(`Added ${newStop.name} to itinerary!`);
                          }}
                          className="btn-primary btn-sm"
                          style={{ padding: '8px 12px', fontSize: 12, flex: 1, height: 'auto', minHeight: 'auto' }}
                        >
                          Add to Itinerary
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTempCoords(null);
                            setCustomStopName('');
                          }}
                          className="btn-secondary btn-sm"
                          style={{ padding: '8px 12px', fontSize: 12, flex: 1, height: 'auto', minHeight: 'auto' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stops Timeline List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
                  {/* Timeline vertical connector line */}
                  <div style={{
                    position: 'absolute',
                    left: 17,
                    top: 15,
                    bottom: 15,
                    width: 2,
                    background: 'repeating-linear-gradient(to bottom, var(--border-mid), var(--border-mid) 6px, transparent 6px, transparent 12px)',
                    zIndex: 0
                  }} />

                  {selectedStops.map((stop, index) => {
                    const isStart = index === 0;
                    const isEnd = index === selectedStops.length - 1;
                    
                    return (
                      <div
                        key={`${stop.id}-${index}`}
                        style={{
                          display: 'flex',
                          gap: 14,
                          alignItems: 'flex-start',
                          background: 'var(--bg-page-alt)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 14,
                          padding: '12px 14px',
                          position: 'relative',
                          zIndex: 1
                        }}
                      >
                        {/* Bullet Marker */}
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: isStart ? 'var(--navy)' : '#D4AF37',
                          border: '3px solid var(--bg-surface)',
                          boxShadow: '0 0 0 2px ' + (isStart ? 'var(--navy)' : '#D4AF37'),
                          marginTop: 6,
                          flexShrink: 0
                        }} />

                        {/* Stop Details */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <strong style={{ color: 'var(--navy)', fontSize: 14 }}>
                              {isStart ? `Departure: ${stop.name}` : `Stop #${index}: ${stop.name}`}
                            </strong>
                            {/* Controls to Move or Remove Stop */}
                            <div style={{ display: 'flex', gap: 4 }}>
                              {!isStart && index > 1 && (
                                <button
                                  onClick={() => moveStop(index, 'up')}
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 11, padding: 2 }}
                                  title="Move Up"
                                >
                                  ▲
                                </button>
                              )}
                              {!isStart && index < selectedStops.length - 1 && (
                                <button
                                  onClick={() => moveStop(index, 'down')}
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 11, padding: 2 }}
                                  title="Move Down"
                                >
                                  ▼
                                </button>
                              )}
                              {(!isStart || selectedStops[0].id !== 'trichy') && (
                                <button
                                  onClick={() => removeStop(index)}
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(192,57,43,0.7)', display: 'flex', padding: 2 }}
                                  onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(192,57,43,0.7)'}
                                  title="Remove Stop"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                            {stop.description}
                          </p>

                          {/* Attractions badges */}
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                            {stop.attractions.map(attr => (
                              <span key={attr} style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid rgba(7,21,35,0.06)', borderRadius: 6, fontSize: 10, padding: '2px 6px' }}>
                                {attr}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {tripType === 'round' && selectedStops.length > 1 && (
                  <div style={{
                    marginTop: 12,
                    padding: '8px 12px',
                    background: 'rgba(7,21,35,0.02)',
                    borderRadius: 10,
                    border: '1px dashed rgba(7,21,35,0.08)',
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <Navigation size={13} color={isDark ? "#D4AF37" : "#0B2344"} />
                    <span>Route returns back to <strong>Trichy Base</strong> (Round Trip option active)</span>
                  </div>
                )}
              </div>

              {/* Preferences & Services Card */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid rgba(11,35,68,0.08)', borderRadius: 20, padding: 24, boxShadow: '0 4px 24px rgba(7,21,35,0.03)' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'var(--navy)', fontWeight: 700, marginBottom: 18, marginTop: 0 }}>
                  2. Customize Booking
                </h2>

                {/* Trip Mode */}
                <div style={{ marginBottom: 18 }}>
                  <label className="form-label">Trip Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button
                      onClick={() => setTripType('round')}
                      style={{
                        padding: '11px',
                        borderRadius: 10,
                        border: '2px solid',
                        borderColor: tripType === 'round' ? (isDark ? '#D4AF37' : 'var(--text-heading)') : 'var(--border-light)',
                        background: tripType === 'round' ? 'rgba(11,35,68,0.04)' : 'var(--bg-surface)',
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        color: tripType === 'round' ? (isDark ? '#D4AF37' : 'var(--text-heading)') : 'var(--text-body)'
                      }}
                    >
                      Round Trip (Back to Trichy)
                    </button>
                    <button
                      onClick={() => setTripType('one-way')}
                      style={{
                        padding: '11px',
                        borderRadius: 10,
                        border: '2px solid',
                        borderColor: tripType === 'one-way' ? (isDark ? '#D4AF37' : 'var(--text-heading)') : 'var(--border-light)',
                        background: tripType === 'one-way' ? 'rgba(11,35,68,0.04)' : 'var(--bg-surface)',
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        color: tripType === 'one-way' ? (isDark ? '#D4AF37' : 'var(--text-heading)') : 'var(--text-body)'
                      }}
                    >
                      One Way Drop
                    </button>
                  </div>
                </div>

                {/* Vehicle Choice */}
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Select Cab Class</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {VEHICLES.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setVehicle(v.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: 12,
                          border: '2px solid',
                          borderColor: vehicle === v.id ? (isDark ? '#D4AF37' : '#0B2344') : 'var(--border-light)',
                          background: vehicle === v.id ? 'rgba(11,35,68,0.04)' : 'var(--bg-surface)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Car size={16} color={vehicle === v.id ? '#0B2344' : 'var(--text-muted)'} />
                          <div style={{ textAlign: 'left' }}>
                            <strong style={{ display: 'block', fontSize: 13, color: 'var(--navy)' }}>{v.label}</strong>
                            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Capacity: {v.capacity}</span>
                          </div>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: vehicle === v.id ? (isDark ? '#D4AF37' : '#0B2344') : 'var(--text-body)' }}>
                          ₹{v.baseRate}/km
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Hotel and Restaurant Addons */}
                <div style={{ paddingTop: 16, borderTop: '1px solid rgba(11,35,68,0.08)' }}>
                  <label className="form-label">Cheaper Local Services Add-ons</label>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                    
                    {/* Hotel Checkbox */}
                    <label style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      cursor: 'pointer',
                      padding: 10,
                      borderRadius: 10,
                      background: includeHotels ? 'var(--tag-bg)' : 'transparent',
                      border: '1px solid',
                      borderColor: includeHotels ? 'var(--border-mid)' : 'transparent',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="checkbox"
                        checked={includeHotels}
                        onChange={e => setIncludeHotels(e.target.checked)}
                        style={{ marginTop: 4, accentColor: 'var(--green)' }}
                      />
                      <div>
                        <strong style={{ fontSize: 13, color: 'var(--navy)', display: 'block' }}>
                          Discounted Hotel Bookings
                        </strong>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                          Include budget/premium hotel recommendations that are up to 30% cheaper than booking online.
                        </span>
                      </div>
                    </label>

                    {/* Restaurant Checkbox */}
                    <label style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      cursor: 'pointer',
                      padding: 10,
                      borderRadius: 10,
                      background: includeDining ? 'var(--tag-bg)' : 'transparent',
                      border: '1px solid',
                      borderColor: includeDining ? 'var(--border-mid)' : 'transparent',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="checkbox"
                        checked={includeDining}
                        onChange={e => setIncludeDining(e.target.checked)}
                        style={{ marginTop: 4, accentColor: 'var(--navy)' }}
                      />
                      <div>
                        <strong style={{ fontSize: 13, color: 'var(--navy)', display: 'block' }}>
                          Discounted Dining Vouchers
                        </strong>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                          Access flat 10%-20% bills discounts & free treats at premium partner restaurants along the route.
                        </span>
                      </div>
                    </label>

                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Dynamic Map & Summary Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 80, height: 'fit-content' }}>
              
              {/* Interactive Map Box */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid rgba(11,35,68,0.08)', borderRadius: 20, padding: 12, boxShadow: '0 4px 24px rgba(7,21,35,0.03)' }}>
                <Map 
                  stops={selectedStops} 
                  tempCoords={tempCoords}
                  onMapClick={(coords) => {
                    setTempCoords(coords);
                    setCustomStopName(`Custom Stop #${selectedStops.length}`);
                  }}
                  roundTrip={tripType === 'round'}
                  onRouteCalculated={(dist, durationHrs) => {
                    setTotalDistance(dist);
                    setEstimatedHours(durationHrs);
                  }}
                />
              </div>

              {/* Estimate & Summary Box */}
              <div style={{
                background: 'linear-gradient(135deg, #0B2344 0%, #071523 100%)',
                borderRadius: 20,
                padding: '28px 24px',
                color: 'white',
                boxShadow: 'var(--shadow-navy)',
                border: '1px solid var(--border-light)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative glow */}
                <div style={{
                  position: 'absolute',
                  right: '-10%',
                  top: '-10%',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.22)',
                  filter: 'blur(45px)',
                  pointerEvents: 'none'
                }} />

                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 700, margin: '0 0 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12 }}>
                  Itinerary Summary
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                  <div>
                    <span style={{ display: 'block', fontSize: 11, color: 'rgba(248,246,240,0.45)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Total Distance
                    </span>
                    <strong style={{ fontSize: 18, color: '#E8C84A' }}>
                      {totalDistance > 0 ? `${totalDistance.toLocaleString()} km` : '—'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: 11, color: 'rgba(248,246,240,0.45)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Travel Time
                    </span>
                    <strong style={{ fontSize: 18, color: '#E8C84A' }}>
                      {totalDistance > 0 ? `~${estimatedHours} Hours` : '—'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: 11, color: 'rgba(248,246,240,0.45)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Recommended Duration
                    </span>
                    <strong style={{ fontSize: 18, color: '#E8C84A' }}>
                      {totalDistance > 0 ? `${recommendedDays} Days` : '—'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: 11, color: 'rgba(248,246,240,0.45)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Stops Selected
                    </span>
                    <strong style={{ fontSize: 18, color: '#E8C84A' }}>
                      {selectedStops.length} Destinations
                    </strong>
                  </div>
                </div>

                {estimatedFare > 0 ? (
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px 18px', marginBottom: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: 'rgba(248,246,240,0.7)' }}>
                        Estimated Cab Fare:
                      </span>
                      <strong style={{ fontSize: 24, color: '#D4AF37', fontFamily: 'Playfair Display, serif' }}>
                        ₹{estimatedFare.toLocaleString()}*
                      </strong>
                    </div>
                    <span style={{ display: 'block', fontSize: 10, color: 'rgba(248,246,240,0.4)', marginTop: 4, lineHeight: 1.3 }}>
                      *Tolls, parking, and permit fees are additional. Includes driver beta/allowance.
                    </span>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: '16px 18px', marginBottom: 24, textAlign: 'center', fontSize: 13, color: 'rgba(248,246,240,0.4)' }}>
                    Select destinations to estimate prices
                  </div>
                )}

                <Link
                  href={getBookingLink()}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: 15,
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0B2344 0%, #102A4A 100%)',
                    boxShadow: '0 4px 18px rgba(11,35,68,0.3)',
                    color: 'white',
                    fontWeight: 700
                  }}
                >
                  Book This Itinerary <ArrowRight size={16} />
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 14, fontSize: 11, color: 'rgba(248,246,240,0.45)' }}>
                  <ShieldCheck size={13} color="#E8C84A" />
                  <span>No advance payment required. Cancel free anytime.</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
      <Footer />

      {/* Styled JSX */}
      <style>{`
        .planner-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 900px) {
          .planner-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
      `}</style>
    </>
  );
}
