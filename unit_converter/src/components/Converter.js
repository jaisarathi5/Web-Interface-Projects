import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import UnitSelector from './UnitSelector';
import ConversionResult from './ConversionResult';
import { convert, getUnitKeys, getUnitLabel } from '../utils/conversionConfig';

export default function Converter({ category, onAddHistory }) {
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const unitKeys = useMemo(() => getUnitKeys(category), [category]);

  // Set default units when category changes
  useEffect(() => {
    if (unitKeys.length >= 2) {
      setFromUnit(unitKeys[0]);
      setToUnit(unitKeys[1]);
    } else {
      setFromUnit(unitKeys[0] || '');
      setToUnit(unitKeys[0] || '');
    }
    setInputValue('');
    setResult(null);
  }, [category, unitKeys]);

  // Perform conversion
  useEffect(() => {
    if (!fromUnit || !toUnit || inputValue === '') {
      setResult(null);
      return;
    }
    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      setResult(null);
      return;
    }
    const converted = convert(category, fromUnit, toUnit, num);
    if (!isNaN(converted)) {
      setResult(converted);
      // Add to history (only if valid and not empty)
      if (num !== 0) {
        onAddHistory({
          category: category,
          fromUnit: getUnitLabel(category, fromUnit),
          toUnit: getUnitLabel(category, toUnit),
          fromValue: num,
          toValue: converted,
        });
      }
    } else {
      setResult(null);
    }
    // eslint-disable-next-line
  }, [category, fromUnit, toUnit, inputValue]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopy = () => {
    if (result !== null) {
      navigator.clipboard?.writeText(result.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setResult(null);
  };

  // Quick conversion suggestion click
  const handleQuick = (from, to) => {
    setFromUnit(from);
    setToUnit(to);
  };

  return (
    <div className="converter-card card">
      <div className="converter-row">
        <div className="field">
          <label>Value</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            step="any"
          />
        </div>
        <UnitSelector
          category={category}
          value={fromUnit}
          onChange={setFromUnit}
          label="From"
        />
        <button className="swap-btn" onClick={handleSwap} aria-label="Swap units">
          <ArrowLeftRight size={20} />
        </button>
        <UnitSelector
          category={category}
          value={toUnit}
          onChange={setToUnit}
          label="To"
        />
        <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={handleClear}>Clear</button>
        </div>
      </div>

      {result !== null && (
        <ConversionResult
          value={result}
          unit={getUnitLabel(category, toUnit)}
          onCopy={handleCopy}
          copied={copied}
        />
      )}

      {/* Quick suggestions */}
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {unitKeys.slice(0, 4).map((u) => (
          <span
            key={u}
            className="favorite-chip"
            onClick={() => handleQuick(u, unitKeys.find(k => k !== u) || unitKeys[0])}
          >
            {getUnitLabel(category, u)} →
          </span>
        ))}
      </div>
    </div>
  );
}