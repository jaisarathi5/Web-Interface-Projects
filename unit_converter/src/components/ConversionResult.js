import React from 'react';
import { Copy, Check } from 'lucide-react';

export default function ConversionResult({ value, unit, onCopy, copied }) {
  return (
    <div className="result-box">
      <div>
        <span className="value">{value}</span>
        <span className="unit"> {unit}</span>
      </div>
      <div className="actions">
        <button className="btn btn-ghost" onClick={onCopy}>
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}