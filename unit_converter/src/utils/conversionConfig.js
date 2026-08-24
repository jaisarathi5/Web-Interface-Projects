// src/utils/conversionConfig.js
import {
  LengthIcon,
  TemperatureIcon,
  WeightIcon,
  CurrencyIcon,
  AreaIcon,
  VolumeIcon,
  SpeedIcon,
  TimeIcon,
  DataIcon,
  PressureIcon,
  EnergyIcon,
  PowerIcon,
  AngleIcon,
  FuelIcon,
} from '../components/icons';

export const categories = {
  length: {
    label: 'Length',
    icon: LengthIcon,        // ✅ now it's a component, not a string
    units: {
      meter: { label: 'Meter', toBase: v => v, fromBase: v => v },
      kilometer: { label: 'Kilometer', toBase: v => v * 1000, fromBase: v => v / 1000 },
      centimeter: { label: 'Centimeter', toBase: v => v / 100, fromBase: v => v * 100 },
      millimeter: { label: 'Millimeter', toBase: v => v / 1000, fromBase: v => v * 1000 },
      mile: { label: 'Mile', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      yard: { label: 'Yard', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      foot: { label: 'Foot', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      inch: { label: 'Inch', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
    },
    quick: ['km→mile', 'meter→foot', 'cm→inch'],
  },
  temperature: {
    label: 'Temperature',
    icon: TemperatureIcon,
    units: {
      celsius: { label: 'Celsius', toBase: v => v, fromBase: v => v },
      fahrenheit: { label: 'Fahrenheit', toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
      kelvin: { label: 'Kelvin', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    },
    quick: ['celsius→fahrenheit', 'celsius→kelvin'],
  },
  weight: {
    label: 'Weight',
    icon: WeightIcon,
    units: {
      kilogram: { label: 'Kilogram', toBase: v => v, fromBase: v => v },
      gram: { label: 'Gram', toBase: v => v / 1000, fromBase: v => v * 1000 },
      milligram: { label: 'Milligram', toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      pound: { label: 'Pound', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
      ounce: { label: 'Ounce', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
      tonne: { label: 'Tonne', toBase: v => v * 1000, fromBase: v => v / 1000 },
    },
    quick: ['kg→pound', 'gram→ounce'],
  },
  currency: {
    label: 'Currency',
    icon: CurrencyIcon,
    units: {
      inr: { label: 'Indian Rupee', toBase: v => v, fromBase: v => v },
      usd: { label: 'US Dollar', toBase: v => v * 83.0, fromBase: v => v / 83.0 },
      eur: { label: 'Euro', toBase: v => v * 90.5, fromBase: v => v / 90.5 },
      gbp: { label: 'British Pound', toBase: v => v * 105.0, fromBase: v => v / 105.0 },
      jpy: { label: 'Japanese Yen', toBase: v => v * 0.56, fromBase: v => v / 0.56 },
    },
    quick: ['inr→usd', 'usd→eur'],
  },
  area: {
    label: 'Area',
    icon: AreaIcon,
    units: {
      sqmeter: { label: 'Square Meter', toBase: v => v, fromBase: v => v },
      sqkilometer: { label: 'Square Kilometer', toBase: v => v * 1e6, fromBase: v => v / 1e6 },
      acre: { label: 'Acre', toBase: v => v * 4046.86, fromBase: v => v / 4046.86 },
      hectare: { label: 'Hectare', toBase: v => v * 10000, fromBase: v => v / 10000 },
      sqfoot: { label: 'Square Foot', toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
      sqmile: { label: 'Square Mile', toBase: v => v * 2.59e6, fromBase: v => v / 2.59e6 },
    },
    quick: ['sqmeter→sqfoot', 'acre→hectare'],
  },
  volume: {
    label: 'Volume',
    icon: VolumeIcon,
    units: {
      liter: { label: 'Liter', toBase: v => v, fromBase: v => v },
      milliliter: { label: 'Milliliter', toBase: v => v / 1000, fromBase: v => v * 1000 },
      cubicmeter: { label: 'Cubic Meter', toBase: v => v * 1000, fromBase: v => v / 1000 },
      gallon: { label: 'Gallon', toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
      cup: { label: 'Cup', toBase: v => v * 0.236588, fromBase: v => v / 0.236588 },
      pint: { label: 'Pint', toBase: v => v * 0.473176, fromBase: v => v / 0.473176 },
    },
    quick: ['liter→gallon', 'cup→ml'],
  },
  speed: {
    label: 'Speed',
    icon: SpeedIcon,
    units: {
      kmh: { label: 'km/h', toBase: v => v, fromBase: v => v },
      mph: { label: 'mph', toBase: v => v * 1.60934, fromBase: v => v / 1.60934 },
      ms: { label: 'm/s', toBase: v => v * 3.6, fromBase: v => v / 3.6 },
      knot: { label: 'Knots', toBase: v => v * 1.852, fromBase: v => v / 1.852 },
    },
    quick: ['kmh→mph', 'ms→kmh'],
  },
  time: {
    label: 'Time',
    icon: TimeIcon,
    units: {
      second: { label: 'Seconds', toBase: v => v, fromBase: v => v },
      minute: { label: 'Minutes', toBase: v => v * 60, fromBase: v => v / 60 },
      hour: { label: 'Hours', toBase: v => v * 3600, fromBase: v => v / 3600 },
      day: { label: 'Days', toBase: v => v * 86400, fromBase: v => v / 86400 },
      week: { label: 'Weeks', toBase: v => v * 604800, fromBase: v => v / 604800 },
      month: { label: 'Months', toBase: v => v * 2.628e6, fromBase: v => v / 2.628e6 },
      year: { label: 'Years', toBase: v => v * 3.154e7, fromBase: v => v / 3.154e7 },
    },
    quick: ['hour→minute', 'day→hour'],
  },
  data: {
    label: 'Data Storage',
    icon: DataIcon,
    units: {
      bit: { label: 'Bit', toBase: v => v / 8, fromBase: v => v * 8 },
      byte: { label: 'Byte', toBase: v => v, fromBase: v => v },
      kilobyte: { label: 'Kilobyte', toBase: v => v * 1024, fromBase: v => v / 1024 },
      megabyte: { label: 'Megabyte', toBase: v => v * 1048576, fromBase: v => v / 1048576 },
      gigabyte: { label: 'Gigabyte', toBase: v => v * 1073741824, fromBase: v => v / 1073741824 },
      terabyte: { label: 'Terabyte', toBase: v => v * 1099511627776, fromBase: v => v / 1099511627776 },
    },
    quick: ['kb→mb', 'gb→tb'],
  },
  pressure: {
    label: 'Pressure',
    icon: PressureIcon,
    units: {
      pascal: { label: 'Pascal', toBase: v => v, fromBase: v => v },
      kpa: { label: 'Kilopascal', toBase: v => v * 1000, fromBase: v => v / 1000 },
      bar: { label: 'Bar', toBase: v => v * 100000, fromBase: v => v / 100000 },
      psi: { label: 'PSI', toBase: v => v * 6894.76, fromBase: v => v / 6894.76 },
    },
    quick: ['psi→bar', 'kpa→psi'],
  },
  energy: {
    label: 'Energy',
    icon: EnergyIcon,
    units: {
      joule: { label: 'Joule', toBase: v => v, fromBase: v => v },
      kj: { label: 'Kilojoule', toBase: v => v * 1000, fromBase: v => v / 1000 },
      calorie: { label: 'Calorie', toBase: v => v * 4.184, fromBase: v => v / 4.184 },
      kwh: { label: 'kWh', toBase: v => v * 3.6e6, fromBase: v => v / 3.6e6 },
    },
    quick: ['joule→calorie', 'kj→kwh'],
  },
  power: {
    label: 'Power',
    icon: PowerIcon,
    units: {
      watt: { label: 'Watt', toBase: v => v, fromBase: v => v },
      kw: { label: 'Kilowatt', toBase: v => v * 1000, fromBase: v => v / 1000 },
      hp: { label: 'Horsepower', toBase: v => v * 745.7, fromBase: v => v / 745.7 },
    },
    quick: ['kw→hp', 'watt→kw'],
  },
  angle: {
    label: 'Angle',
    icon: AngleIcon,
    units: {
      degree: { label: 'Degree', toBase: v => v, fromBase: v => v },
      radian: { label: 'Radian', toBase: v => v * 57.2958, fromBase: v => v / 57.2958 },
      gradian: { label: 'Gradian', toBase: v => v * 0.9, fromBase: v => v / 0.9 },
    },
    quick: ['degree→radian', 'radian→gradian'],
  },
  fuel: {
    label: 'Fuel Efficiency',
    icon: FuelIcon,
    units: {
      kmpl: { label: 'km/L', toBase: v => v, fromBase: v => v },
      mpg: { label: 'mpg', toBase: v => v * 0.425144, fromBase: v => v / 0.425144 },
      lper100: { label: 'L/100km', toBase: v => 100 / v, fromBase: v => 100 / v },
    },
    quick: ['kmpl→mpg', 'mpg→lper100'],
  },
};

// Helper functions remain the same
export const getUnitKeys = (categoryKey) => {
  return Object.keys(categories[categoryKey]?.units || {});
};

export const getUnitLabel = (categoryKey, unitKey) => {
  return categories[categoryKey]?.units[unitKey]?.label || unitKey;
};

export const convert = (categoryKey, fromUnit, toUnit, value) => {
  const cat = categories[categoryKey];
  if (!cat) return NaN;
  const from = cat.units[fromUnit];
  const to = cat.units[toUnit];
  if (!from || !to) return NaN;
  const base = from.toBase(value);
  return to.fromBase(base);
};