'use client';

import { useState, useEffect, useCallback } from 'react';
import { GymInfo } from '@/types';
import { GYM_INFO } from '@/data/gymData';

export function useGymSettings() {
  const [settings, setSettings] = useState<GymInfo>(GYM_INFO);
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<'sanity' | 'default_catalog' | 'fallback'>('default_catalog');

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setSettings(json.data);
          setSource(json.source || 'sanity');
        }
      }
    } catch (err) {
      console.warn('Failed to fetch gym settings from API, using default gym info:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, source, reload: fetchSettings };
}

