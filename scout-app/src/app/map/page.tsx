"use client";

import { useState } from "react";

interface MapLocation {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
}

// Mock locations - would come from Firebase in production
const mockLocations: MapLocation[] = [
  { id: "1", name: "Community Food Bank", category: "Food", lat: 40.7128, lng: -74.006 },
  { id: "2", name: "Veterans Support Center", category: "Services", lat: 40.7148, lng: -74.008 },
  { id: "3", name: "Emergency Shelter", category: "Shelter", lat: 40.7108, lng: -74.004 },
  { id: "4", name: "Free Clinic", category: "Medical", lat: 40.7138, lng: -74.002 },
];

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [isListView, setIsListView] = useState(false);

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
              Map
            </h1>
            <p className="text-muted text-sm mt-1">Resources near you</p>
          </div>
          <button
            onClick={() => setIsListView(!isListView)}
            className="p-2 rounded-lg border border-card-border hover:border-slate-400 transition-colors"
          >
            {isListView ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search this area..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-card-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent transition-all"
          />
        </div>
      </header>

      {/* Map Area or List View */}
      <div className="flex-1 relative">
        {isListView ? (
          <ListView
            locations={mockLocations}
            onSelect={setSelectedLocation}
            selectedId={selectedLocation?.id}
          />
        ) : (
          <MapView
            locations={mockLocations}
            onSelect={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
        )}
      </div>

      {/* Selected Location Card */}
      {selectedLocation && !isListView && (
        <LocationCard
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
}

function MapView({
  locations,
  onSelect,
  selectedLocation,
}: {
  locations: MapLocation[];
  onSelect: (loc: MapLocation) => void;
  selectedLocation: MapLocation | null;
}) {
  return (
    <div className="w-full h-full bg-slate-200 relative">
      {/* Placeholder map - would integrate with Google Maps or Mapbox */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
          </div>
          <p className="text-slate-500 text-sm">
            Map integration coming soon
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Connect Firebase for live data
          </p>
        </div>
      </div>

      {/* Mock location pins */}
      <div className="absolute inset-0 pointer-events-none">
        {locations.map((loc, idx) => (
          <button
            key={loc.id}
            onClick={() => onSelect(loc)}
            className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-full transition-transform ${
              selectedLocation?.id === loc.id ? "scale-125 z-10" : ""
            }`}
            style={{
              left: `${20 + idx * 20}%`,
              top: `${30 + (idx % 3) * 20}%`,
            }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                selectedLocation?.id === loc.id
                  ? "bg-navy-800"
                  : "bg-accent"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Current location button */}
      <button className="absolute bottom-4 right-4 w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center border border-card-border hover:border-slate-400 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-navy-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      </button>
    </div>
  );
}

function ListView({
  locations,
  onSelect,
  selectedId,
}: {
  locations: MapLocation[];
  onSelect: (loc: MapLocation) => void;
  selectedId?: string;
}) {
  return (
    <div className="px-4 pb-4 space-y-3 overflow-y-auto h-full">
      {locations.map((loc) => (
        <button
          key={loc.id}
          onClick={() => onSelect(loc)}
          className={`w-full text-left p-4 rounded-xl border transition-all ${
            selectedId === loc.id
              ? "bg-navy-800 border-navy-700 text-slate-50"
              : "bg-card border-card-border hover:border-slate-400"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedId === loc.id ? "bg-navy-700" : "bg-slate-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${
                  selectedId === loc.id ? "text-slate-50" : "text-navy-700"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{loc.name}</h3>
              <p
                className={`text-sm ${
                  selectedId === loc.id ? "text-slate-300" : "text-muted"
                }`}
              >
                {loc.category}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-5 h-5 flex-shrink-0 ${
                selectedId === loc.id ? "text-slate-300" : "text-slate-400"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
}

function LocationCard({
  location,
  onClose,
}: {
  location: MapLocation;
  onClose: () => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-card-border rounded-t-2xl p-4 shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{location.name}</h3>
          <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full mt-1">
            {location.category}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-foreground transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 py-2.5 px-4 bg-navy-800 text-slate-50 rounded-lg text-sm font-medium hover:bg-navy-700 transition-colors">
          Get Directions
        </button>
        <button className="py-2.5 px-4 border border-card-border rounded-lg text-sm font-medium hover:border-slate-400 transition-colors">
          Save
        </button>
      </div>
    </div>
  );
}
