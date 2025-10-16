'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'warning-banner-closed';

export default function WarningBanner() {
  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    // only run on client
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // if key is present and set to 'true', keep hidden
      setHidden(stored === 'true');
    } catch (e) {
      // ignore localStorage errors (e.g., privacy mode)
      setHidden(false);
    }
  }, []);

  function handleHide() {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      // ignore write errors
    }
    setHidden(true);
  }

  if (hidden) return null;

  return (
    <div
      id="warning-banner"
      className="flex justify-between items-center px-10 fixed bg-gradient-to-br from-[#ffb347] to-[#ffcc7f] py-0.5 text-center w-full text-[#442b00] font-medium"
    >
      <p />
      In Development
      <X size={20} className="text-black cursor-pointer" onClick={handleHide} />
    </div>
  );
}
