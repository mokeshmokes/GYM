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
    // If user arrived with a hash linking directly to this section, render immediately
    if (typeof window !== 'undefined' && id && window.location.hash === `#${id}`) {
      setIsVisible(true);
      return;
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

    // Also listen to hashchange in case the user clicks a navbar anchor link
    const handleHashChange = () => {
      if (id && window.location.hash === `#${id}`) {
        setIsVisible(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
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
          className="w-full flex items-center justify-center opacity-0 transition-opacity"
          style={{ minHeight }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
