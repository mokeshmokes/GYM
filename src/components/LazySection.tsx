'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  id?: string;
  minHeight?: string | number;
  rootMargin?: string;
  className?: string;
  children: React.ReactNode;
}

export default function LazySection({
  id,
  minHeight = '360px',
  rootMargin = '250px',
  className = '',
  children,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user arrived at /contact or /pricing or with a hash, render immediately
    if (typeof window !== 'undefined' && id) {
      const currentPath = window.location.pathname.replace(/^\//, '');
      if (currentPath === id || window.location.hash === `#${id}`) {
        setIsVisible(true);
        return;
      }
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    const elem = sectionRef.current;
    if (elem) {
      observer.observe(elem);
    }

    // Listen for client navigation / hash change
    const handleUrlChange = () => {
      if (typeof window !== 'undefined' && id) {
        const currentPath = window.location.pathname.replace(/^\//, '');
        if (currentPath === id || window.location.hash === `#${id}`) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [id, rootMargin]);

  return (
    <div
      ref={sectionRef}
      id={!isVisible ? id : undefined}
      className={className}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? (
        <div className="animate-fadeIn">{children}</div>
      ) : (
        <div
          className="w-full flex flex-col items-center justify-center p-8 transition-opacity duration-300"
          style={{ minHeight }}
          aria-hidden="true"
        >
          <div className="w-8 h-8 rounded-full border-2 border-gold-500/20 border-t-gold-500 animate-spin mb-3" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
            Loading {id ? id.toUpperCase() : 'SECTION'}...
          </span>
        </div>
      )}
    </div>
  );
}
