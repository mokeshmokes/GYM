'use client';

import { useState, useEffect, useCallback } from 'react';
import { PricingPlan } from '@/types';
import { PRICING_PLANS } from '@/data/gymData';
import { clientDecrypt } from '@/utils/cryptoClient';

export function usePackages() {
  const [packages, setPackages] = useState<PricingPlan[]>(PRICING_PLANS);
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<'sanity' | 'default_catalog' | 'fallback'>('default_catalog');

  const fetchPackages = useCallback(async () => {
    try {
      const res = await fetch('/api/packages');
      if (res.ok) {
        const rawJson = await res.json();
        const json = await clientDecrypt<any>(rawJson);
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setPackages(json.data);
          setSource(json.source || 'sanity');
        }
      }
    } catch (err) {
      console.warn('Failed to fetch packages from API, using default plans:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { packages, loading, source, reload: fetchPackages };
}
