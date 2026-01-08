
import React, { useState } from 'react';
import { MapPin, Calendar, Trash2, Home, Landmark, Navigation } from 'lucide-react';

interface ScheduleProps {
  onScheduled: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onScheduled }) => {
  const [formData, setFormData] = useState({
    address: '',
    pincode: '',
    state: '',
    landmark: '',
    date: '',
    type: 'Mixed'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduled();
  };

  const inputClasses = "w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300";

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Schedule Your Pick up</h2>
        <p className="text-slate-500">Provide the location details where our team should arrive.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Address</label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required 
                type="text" 
                placeholder="Street name, building..." 
                className={inputClasses}
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Pincode</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required 
                type="text" 
                placeholder="6-digit code" 
                className={inputClasses}
                value={formData.pincode}
                onChange={e => setFormData({...formData, pincode: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">State</label>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required 
                type="text" 
                placeholder="Your state" 
                className={inputClasses}
                value={formData.state}
                onChange={e => setFormData({...formData, state: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Landmark</label>
            <div className="relative">
              <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Near hospital, park..." 
                className={inputClasses}
                value={formData.landmark}
                onChange={e => setFormData({...formData, landmark: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Pick up Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required 
                type="date" 
                className={inputClasses}
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Garbage Type</label>
            <div className="relative">
              <Trash2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select 
                className={`${inputClasses} appearance-none cursor-pointer`}
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="Mixed">Mixed Waste</option>
                <option value="Dry">Dry Recyclable</option>
                <option value="Wet">Organic / Wet</option>
                <option value="E-Waste">Electronic Waste</option>
                <option value="Hazardous">Hazardous</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-2xl text-xl shadow-lg shadow-green-200 transition-all transform active:scale-[0.99]"
        >
          Confirm Scheduled Pick up
        </button>
      </form>
    </div>
  );
};

export default Schedule;
