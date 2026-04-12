'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search plays…',
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
        size={16}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/6 border border-white/12 rounded-full
                   pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-white/35
                   focus:outline-none focus:border-white/30 focus:bg-white/8
                   transition-colors"
        aria-label="Search plays"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
