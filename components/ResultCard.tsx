import React from 'react';

interface ResultCardProps {
  lotSize: number;
  riskAmount: number;
  stopLoss: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ lotSize, riskAmount, stopLoss }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mt-6 animate-fade-in border border-white/20">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">Calculated Lot Size</p>
        <p className="text-4xl font-extrabold text-green-400 my-2">
          {lotSize.toFixed(3)}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-white/20 text-center">
        <p className="text-gray-300">
          With a risk of <span className="font-semibold text-white">${riskAmount.toLocaleString()}</span> and a stop loss of <span className="font-semibold text-white">{stopLoss.toLocaleString()} pips</span>, your recommended position size is <span className="font-semibold text-white">{lotSize.toFixed(3)} lots</span>.
        </p>
      </div>
    </div>
  );
};

// Add a simple fade-in animation for when the result card appears
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);