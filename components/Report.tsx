
import React from 'react';
import { WasteAnalysis } from '../types';
import { Truck, CheckCircle2 } from 'lucide-react';

interface ReportProps {
  analysis: WasteAnalysis;
  image: string;
  onSchedule: () => void;
}

const Report: React.FC<ReportProps> = ({ analysis, image, onSchedule }) => {
  const categories = [
    { name: 'Plastic', value: analysis.plastic, color: 'bg-orange-500' },
    { name: 'Glass', value: analysis.glass, color: 'bg-cyan-400' },
    { name: 'Cardboard', value: analysis.cardboard, color: 'bg-amber-600' },
    { name: 'Metal', value: analysis.metal, color: 'bg-blue-600' },
    { name: 'Trash', value: analysis.trash, color: 'bg-slate-800' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8 flex items-center gap-3">
        <CheckCircle2 className="text-green-600 w-8 h-8" />
        <h2 className="text-3xl font-bold text-slate-900">Analysis Result</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
            <img 
              src={image} 
              alt="Uploaded waste" 
              className="w-full h-80 object-cover rounded-2xl shadow-inner"
            />
            <p className="text-center text-slate-400 text-sm mt-4 font-medium italic">Analyzed Image</p>
          </div>

          <button 
            onClick={onSchedule}
            className="w-full group bg-green-600 hover:bg-green-700 text-white p-6 rounded-3xl flex items-center justify-between transition-all shadow-xl shadow-green-100 overflow-hidden relative"
          >
            <div className="z-10 text-left">
              <span className="block text-green-200 text-sm font-semibold uppercase tracking-wider mb-1">Step 2: Cleanup</span>
              <span className="text-2xl font-bold">Schedule Pick up</span>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl z-10">
              <Truck className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </div>
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center justify-between">
            Waste Composition
            <span className="text-sm font-normal text-slate-400">based on image analysis</span>
          </h3>
          
          <div className="space-y-8">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-slate-700 font-bold text-lg">{cat.name}</span>
                  <span className="text-slate-400 font-medium">{cat.value}%</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full ${cat.color} transition-all duration-1000 ease-out flex items-center justify-end px-2`}
                    style={{ width: `${cat.value}%` }}
                  >
                    {cat.value > 15 && (
                        <span className="text-[10px] text-white font-black">{cat.value}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">Insight</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Based on the detected {categories.reduce((prev, curr) => curr.value > prev.value ? curr : prev).name.toLowerCase()} content, we recommend using the industrial compactor for your scheduled pickup to maximize points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
