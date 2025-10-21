import React, { useState, useCallback } from 'react';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { ResultCard } from './components/ResultCard';

// SVG Icon components defined outside the main App component to prevent re-creation on re-renders.
const DollarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 8v1m-4-6h8M6 12h12" />
  </svg>
);

const PipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ValueIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 0v6m0-6l-6 6m2-5h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);


const App: React.FC = () => {
  // State for user inputs. Using strings to allow empty fields.
  const [riskAmount, setRiskAmount] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');
  const [pipValue, setPipValue] = useState<string>('1');

  // State for calculation result and potential errors
  const [lotSize, setLotSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the calculation logic.
   * Wrapped in useCallback to memoize the function.
   */
  const handleCalculate = useCallback(() => {
    // Reset previous results and errors
    setError(null);
    setLotSize(null);

    // Parse inputs to numbers
    const risk = parseFloat(riskAmount);
    const sl = parseFloat(stopLoss);
    const pv = parseFloat(pipValue);

    // Simple validation: check if inputs are valid numbers and greater than zero.
    if (isNaN(risk) || risk <= 0) {
      setError('Please enter a valid, positive risk amount.');
      return;
    }
    if (isNaN(sl) || sl <= 0) {
      setError('Please enter a valid, positive stop loss in pips.');
      return;
    }
    if (isNaN(pv) || pv <= 0) {
      setError('Please enter a valid, positive pip value.');
      return;
    }

    // Calculation formula: Lot Size = Risk Amount / (Stop Loss * Pip Value)
    const calculatedLotSize = risk / (sl * pv);

    // Round the result to three decimal places
    const roundedLotSize = Math.round(calculatedLotSize * 1000) / 1000;

    setLotSize(roundedLotSize);
  }, [riskAmount, stopLoss, pipValue]);

  return (
    <div className="text-gray-200 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 space-y-8 border border-white/20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">XAUUSD Lot Size Calculator</h1>
            <p className="text-gray-300 mt-2">Calculate your position size with precision.</p>
          </div>

          <div className="space-y-6">
            <Input
              id="riskAmount"
              label="Risk Amount ($)"
              value={riskAmount}
              onChange={(e) => setRiskAmount(e.target.value)}
              placeholder="e.g., 100"
              type="number"
              icon={<DollarIcon className="w-5 h-5 text-gray-400" />}
            />
            <Input
              id="stopLoss"
              label="Stop Loss (Pips)"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="e.g., 200"
              type="number"
              icon={<PipIcon className="w-5 h-5 text-gray-400" />}
            />
            <Input
              id="pipValue"
              label="Pip Value per Lot"
              value={pipValue}
              onChange={(e) => setPipValue(e.target.value)}
              placeholder="e.g., 1"
              type="number"
              icon={<ValueIcon className="w-5 h-5 text-gray-400" />}
            />
          </div>

          <Button onClick={handleCalculate}>
            Calculate Lot Size
          </Button>

          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          {lotSize !== null && (
            <ResultCard
              lotSize={lotSize}
              riskAmount={parseFloat(riskAmount)}
              stopLoss={parseFloat(stopLoss)}
            />
          )}
        </div>
        <footer className="text-center mt-6 text-white/70 text-sm">
          <p>Trading involves risk. Always manage your capital wisely.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;