"use client";

import { useState } from "react";

interface SavedResource {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  savedAt: string;
}

// Mock saved resources - would come from Firebase in production
const mockSavedResources: SavedResource[] = [
  {
    id: "1",
    name: "Community Food Bank",
    category: "Food",
    address: "123 Main St, Springfield",
    phone: "(555) 123-4567",
    savedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Veterans Support Center",
    category: "Services",
    address: "456 Oak Ave, Springfield",
    phone: "(555) 234-5678",
    savedAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Emergency Shelter Network",
    category: "Shelter",
    address: "789 Pine Rd, Springfield",
    savedAt: "2024-01-10",
  },
];

export default function LockerPage() {
  const [savedResources] = useState<SavedResource[]>(mockSavedResources);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...new Set(savedResources.map((r) => r.category))];
  const filteredResources =
    filter === "all"
      ? savedResources
      : savedResources.filter((r) => r.category === filter);

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
          Locker
        </h1>
        <p className="text-muted text-sm mt-1">Your saved resources</p>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === category
                ? "bg-navy-800 text-slate-50"
                : "bg-card border border-card-border text-foreground hover:border-slate-400"
            }`}
          >
            {category === "all" ? "All" : category}
          </button>
        ))}
      </div>

      {/* Resource Count */}
      <p className="text-sm text-muted mb-4">
        {filteredResources.length} saved resource
        {filteredResources.length !== 1 ? "s" : ""}
      </p>

      {/* Saved Resources List */}
      {filteredResources.length > 0 ? (
        <div className="space-y-3">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function ResourceCard({ resource }: { resource: SavedResource }) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 transition-all hover:border-slate-400">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {resource.name}
          </h3>
          <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full mt-1">
            {resource.category}
          </span>
        </div>
        <button className="p-2 text-slate-400 hover:text-navy-700 transition-colors">
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
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-2 mt-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <span className="truncate">{resource.address}</span>
        </div>
        {resource.phone && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <span>{resource.phone}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 px-4 bg-navy-800 text-slate-50 rounded-lg text-sm font-medium hover:bg-navy-700 transition-colors">
          Get Directions
        </button>
        <button className="py-2 px-4 border border-card-border rounded-lg text-sm font-medium hover:border-slate-400 transition-colors">
          Call
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-slate-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No saved resources
      </h3>
      <p className="text-muted text-sm max-w-xs">
        Resources you save from Scout will appear here for quick access.
      </p>
    </div>
  );
}
