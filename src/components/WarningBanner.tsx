'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

export default function WarningBanner() {
  const [hidden, setHidden] = useState<boolean>(false);
  function handleHide() {
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
