import React from 'react';
import { getUnitKeys, getUnitLabel } from '../utils/conversionConfig';

export default function UnitSelector({ category, value, onChange, label }) {
  const unitKeys = getUnitKeys(category);
  return (
    <div className="field">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {unitKeys.map((key) => (
          <option key={key} value={key}>
            {getUnitLabel(category, key)}
          </option>
        ))}
      </select>
    </div>
  );
}