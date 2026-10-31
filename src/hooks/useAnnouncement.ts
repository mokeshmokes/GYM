'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnnouncementData } from '@/types';
import { DEFAULT_ANNOUNCEMENT } from '@/data/gymData';
import { clientDecrypt } from '@/utils/cryptoClient';

export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState<AnnouncementData>(DEFAULT_ANNOUNCEMENT);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAnnouncement = useCallback(async () => {
    try {
      const res = await fetch('/api/announcement');
      if (res.ok) {
        const rawJson = await res.json();
        const json = await clientDecrypt<any>(rawJson);
        if (json.data) {
          setAnnouncement(json.data);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch announcement from API:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncement();
  }, [fetchAnnouncement]);

  return { announcement, loading, reload: fetchAnnouncement };
}
