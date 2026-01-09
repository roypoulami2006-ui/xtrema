
import React from 'react';
import { CheckCircle2, Home } from 'lucide-react';

interface ConfirmationProps {
  onBackHome: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onBackHome }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
      <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-50">
        <CheckCircle2 className="w-16 h-16 text-emerald-600" />
      </div>
      
      <h2 className="text-4xl font-extrabold text-slate-900 mb-4 text-center">Pickup Confirmed!</h2>
      <p className="text-slate-500 text-center max-w-md mb-12">
        Our team has been notified. You'll receive a notification 30 minutes before our arrival at your location.
      </p>

      <button 
        onClick={onBackHome}
        className="flex items-center gap-3 px-8 py-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 transition-all transform active:scale-95"
      >
        <Home className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="mt-16 p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center max-w-sm">
        <p className="text-sm font-bold text-slate-700 mb-1">Estimated Points</p>
        <p className="text-2xl font-black text-emerald-600">+150 Points</p>
        <p className="text-xs text-slate-400 mt-2">Points will be credited after successful collection.</p>
      </div>
    </div>
  );
};

export default Confirmation;
