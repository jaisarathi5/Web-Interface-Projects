// src/components/icons.js

export const LengthIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 12h18" />
    <path d="M6 9l-3 3 3 3" />
    <path d="M18 9l3 3-3 3" />
  </svg>
);

export const TemperatureIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Thermometer outer glass profile */}
    <path d="M14 4.5a2.5 2.5 0 0 0-5 0v9.58a5 5 0 1 0 5 0V4.5z" />
    
    {/* Internal fluid/mercury measurement line */}
    <path d="M12 9v5" />
    
    {/* Thermometer bulb fill base */}
    <circle cx="12" cy="17" r="1.5" fill="currentColor" />
  </svg>
);


export const WeightIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Physical Calibration Weight / Counterweight Block */}
    <path d="M7 10h10v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9z" />
    <path d="M10 10V6a2 2 0 0 1 4 0v4" />
    <path d="M9 6h6" />
  </svg>
);




export const CurrencyIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Outer circle of the coin */}
    <circle cx="12" cy="12" r="9" />
    
    {/* Inner structural accent ring */}
    <circle cx="12" cy="12" r="6.5" strokeWidth="1.5" strokeDasharray="2 2" />
    
    {/* Bold numeric '1' representing the value */}
    <path d="M12 8v8M10 9.5L12 8" />
  </svg>
);




export const AreaIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
    <path d="M9 3v18" />
    <path d="M15 3v18" />
  </svg>
);

export const VolumeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Rain droplet contour representing liquid volume */}
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-5-11-7-13-2 2-7 8.7-7 13a7 7 0 0 0 7 7z" />
  </svg>
);


export const SpeedIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Speedometer outer arc display */}
    <path d="M18.36 18.36a9 9 0 1 0-12.73 0" />
    
    {/* Velocity indicators / speedometer notches */}
    <path d="M12 3v2M5 12H3M21 12h-2" />
    
    {/* Active needle indicating high acceleration speed */}
    <line x1="12" y1="12" x2="16.5" y2="7.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);


export const TimeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const DataIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 7h10" />
    <path d="M7 12h10" />
    <path d="M7 17h6" />
  </svg>
);

export const PressureIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Outer gauge dial */}
    <circle cx="12" cy="12" r="9" />
    
    {/* Indicating needle pointing to pressure level */}
    <line x1="12" y1="12" x2="16" y2="8" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    
    {/* Internal high-pressure indicator arcs */}
    <path d="M7.5 16.5a6 6 0 0 1 0-9" />
  </svg>
);

export const EnergyIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const PowerIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);


export const AngleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 20H4V4" />
    <path d="M12 20A8 8 0 0 0 4 12" />
  </svg>
);


export const FuelIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 22h12M4 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17" />
    <path d="M14 9h2.5a1.5 1.5 0 0 1 1.5 1.5V14a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9a4 4 0 0 0-4-4" />
    <circle cx="19" cy="5" r="1" fill="currentColor" />
    <rect x="6" y="6" width="6" height="4" rx="1" />
  </svg>
);
