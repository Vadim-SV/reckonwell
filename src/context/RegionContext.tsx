'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Region = 'UK' | 'USA';

interface RegionContextValue {
  region: Region;
  setRegion: (r: Region) => void;
  isDetecting: boolean;
}

const RegionContext = createContext<RegionContextValue>({
  region: 'UK',
  setRegion: () => {},
  isDetecting: false,
});

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>('UK');
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem('reckonwell_region') as Region | null;
    if (stored === 'UK' || stored === 'USA') {
      setRegionState(stored);
      setIsDetecting(false);
      return;
    }

    // Auto-detect via free IP geolocation API
    fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
      .then((res) => res.json())
      .then((data) => {
        const countryCode: string = data?.country_code || '';
        const detected: Region = countryCode === 'US' ? 'USA' : 'UK';
        setRegionState(detected);
        localStorage.setItem('reckonwell_region', detected);
      })
      .catch(() => {
        // Default to UK on failure
        setRegionState('UK');
      })
      .finally(() => {
        setIsDetecting(false);
      });
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    localStorage.setItem('reckonwell_region', r);
  };

  return (
    <RegionContext.Provider value={{ region, setRegion, isDetecting }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
