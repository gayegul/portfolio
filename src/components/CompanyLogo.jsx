import React from 'react';
import seesawLogo from '../assets/images/logos/seesawlogo.png';

export function CompanyLogo({ company }) {
  if (company === 'Microsoft') {
    return (
      <svg className="w-6 h-6" viewBox="0 0 23 23" fill="none">
        <rect x="1" y="1" width="10" height="10" fill="#f25022" />
        <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
        <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
        <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
      </svg>
    );
  }

  return (
    <img src={seesawLogo} alt="Seesaw" className="w-6 h-6 object-contain" loading="lazy" />
  );
}
