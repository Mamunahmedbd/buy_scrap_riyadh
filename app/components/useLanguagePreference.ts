'use client';

import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

export function useLanguagePreference() {
  const [preference, setPreference] = useState<string | null>(null);

  useEffect(() => {
    const stored = getCookie('preferred-lang');
    if (stored) {
      setPreference(stored.toString());
    }
  }, []);

  const savePreference = (lang: string) => {
    // Set cookie with 1 year expiration and root path
    setCookie('preferred-lang', lang, { maxAge: 60 * 60 * 24 * 365, path: '/' });
    setPreference(lang);
  };

  return { preference, savePreference };
}
