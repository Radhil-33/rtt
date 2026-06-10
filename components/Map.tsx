'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  stops: {
    name: string;
    coords: [number, number];
  }[];
  tempCoords?: [number, number] | null;
  onMapClick?: (coords: [number, number]) => void;
  roundTrip?: boolean;
  onRouteCalculated?: (distanceKm: number, durationHours: number) => void;
}

// Fallback Haversine road distance helper
function getFallbackRoadDistance(coords1: [number, number], coords2: [number, number]): number {
  const R = 6371; // Earth radius in km
  const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
  const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
  const lat1 = coords1[0] * Math.PI / 180;
  const lat2 = coords2[0] * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 1.35); // Road winding fallback factor
}

const customMarkerIcon = (index: number, label: string, isStart: boolean) => L.divIcon({
  html: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <div style="
        width: 26px;
        height: 26px;
        background: ${isStart ? 'linear-gradient(135deg, #1A0F05 0%, #2D1A08 100%)' : 'linear-gradient(135deg, #E8651A 0%, #D4A017 100%)'};
        border: 2px solid white;
        border-radius: 50%;
        color: white;
        font-weight: 700;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 8px rgba(26,15,5,0.35);
      ">
        ${isStart ? '★' : index}
      </div>
      <div style="
        background: white;
        color: #1A0F05;
        font-size: 10px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 4px;
        border: 1px solid rgba(232,101,26,0.15);
        margin-top: 4px;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(26,15,5,0.1);
        font-family: 'DM Sans', sans-serif;
      ">
        ${label}
      </div>
    </div>
  `,
  className: 'custom-leaflet-marker',
  iconSize: [40, 50],
  iconAnchor: [20, 13]
});

export default function Map({ stops, tempCoords, onMapClick, roundTrip = true, onRouteCalculated }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current, {
        center: [10.7905, 78.7047], // Trichy center
        zoom: 8,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Load Voyager tiles (a beautiful clean/warm map style matching the brand color)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Remove old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Remove old polyline
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    const allMarkers: L.Marker[] = [];

    // Render stop markers
    if (stops.length > 0) {
      stops.forEach((stop, index) => {
        const isStart = index === 0;

        const marker = L.marker(stop.coords, {
          icon: customMarkerIcon(index, stop.name, isStart)
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: 'DM Sans', sans-serif; padding: 2px;">
            <strong style="color: var(--deep); font-size: 13px;">${stop.name}</strong>
            <p style="margin: 3px 0 0; font-size: 11px; color: var(--text-muted);">
              ${isStart ? 'Starting Point of Journey' : `Stop #${index} in Itinerary`}
            </p>
          </div>
        `);
        
        markersRef.current.push(marker);
        allMarkers.push(marker);
      });
    }

    // Render temporary selection marker
    if (tempCoords) {
      const tempMarker = L.marker(tempCoords, {
        icon: L.divIcon({
          html: `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="
                width: 24px;
                height: 24px;
                background: linear-gradient(135deg, #2D7A4F 0%, #1A0F05 100%);
                border: 2px solid white;
                border-radius: 50%;
                color: white;
                font-weight: 700;
                font-size: 13px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 3px 8px rgba(0,0,0,0.3);
              ">
                ?
              </div>
              <div style="
                background: #2D7A4F;
                color: white;
                font-size: 9px;
                font-weight: 700;
                padding: 2px 6px;
                border-radius: 4px;
                margin-top: 3px;
                white-space: nowrap;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);
              ">
                Selected Location
              </div>
            </div>
          `,
          className: 'temp-leaflet-marker',
          iconSize: [35, 45],
          iconAnchor: [17.5, 12]
        })
      }).addTo(map);

      tempMarker.bindPopup(`
        <div style="font-family: 'DM Sans', sans-serif; padding: 2px;">
          <strong style="color: #2D7A4F; font-size: 13px;">Selected Point</strong>
          <p style="margin: 3px 0 0; font-size: 11px; color: var(--text-muted);">
            Name and add this stop in the sidebar.
          </p>
        </div>
      `);
      
      tempMarker.openPopup();
      markersRef.current.push(tempMarker);
      allMarkers.push(tempMarker);
    }

    // Dynamic shortest road routing query
    let isMounted = true;
    
    const calculateRoadRoute = async () => {
      if (stops.length <= 1) {
        if (onRouteCalculated) onRouteCalculated(0, 0);
        return;
      }

      // Assemble coordinates in lng,lat order for OSRM URL
      let coordsString = stops.map(s => `${s.coords[1]},${s.coords[0]}`).join(';');
      if (roundTrip && stops[0]) {
        coordsString += `;${stops[0].coords[1]},${stops[0].coords[0]}`;
      }

      try {
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`);
        if (!response.ok) throw new Error('OSRM routing request failed');
        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes[0] && isMounted) {
          const route = data.routes[0];
          
          // Map OSRM [lng, lat] back to Leaflet [lat, lng]
          const roadLatLngs: L.LatLngExpression[] = route.geometry.coordinates.map((c: any) => [c[1], c[0]]);

          if (polylineRef.current) {
            polylineRef.current.remove();
          }

          polylineRef.current = L.polyline(roadLatLngs, {
            color: '#E8651A', // Saffron line color
            weight: 5,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round',
          }).addTo(map);

          // Convert meters to Km, and seconds to hours
          const distanceKm = Math.round(route.distance / 1000);
          const durationHours = Math.round(route.duration / 3600);
          
          if (onRouteCalculated) {
            onRouteCalculated(distanceKm, durationHours);
          }
          return;
        }
      } catch (error) {
        console.warn('OSRM routing failed. Falling back to straight-line routing:', error);
      }

      // Fallback: draw straight lines if OSRM is offline
      if (isMounted) {
        const fallbackLatLngs = stops.map(s => s.coords);
        if (roundTrip && stops[0]) {
          fallbackLatLngs.push(stops[0].coords);
        }

        if (polylineRef.current) {
          polylineRef.current.remove();
        }

        polylineRef.current = L.polyline(fallbackLatLngs, {
          color: '#E8651A',
          weight: 4,
          opacity: 0.85,
          dashArray: '5, 8',
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(map);

        // Fallback calculations using Haversine helper
        let totalFallbackDist = 0;
        for (let i = 0; i < fallbackLatLngs.length - 1; i++) {
          totalFallbackDist += getFallbackRoadDistance(
            fallbackLatLngs[i] as [number, number],
            fallbackLatLngs[i + 1] as [number, number]
          );
        }

        if (onRouteCalculated) {
          onRouteCalculated(totalFallbackDist, Math.round(totalFallbackDist / 60));
        }
      }
    };

    calculateRoadRoute();

    // Zoom map bounds to fit markers
    if (allMarkers.length > 0) {
      const group = L.featureGroup(allMarkers);
      map.fitBounds(group.getBounds().pad(0.18));
    } else {
      map.setView([10.7905, 78.7047], 8);
    }

    return () => {
      isMounted = false;
    };
  }, [stops, tempCoords, roundTrip]);

  // Handle map click events
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !onMapClick) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [onMapClick]);

  // Clean up map instance on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '480px',
        borderRadius: 'var(--radius)',
        border: '1px solid rgba(232,101,26,0.12)',
        boxShadow: 'var(--shadow-warm)',
        zIndex: 10,
        position: 'relative'
      }}
    />
  );
}
