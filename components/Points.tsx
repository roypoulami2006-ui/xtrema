
import React from 'react';
import { User } from '../types';
import { Award, Zap, TrendingUp, ChevronRight } from 'lucide-react';

interface PointsProps {
  user: User;
  onEarnMore: () => void;
}

const Points: React.FC<PointsProps> = ({ user, onEarnMore }) => {
  const achievements = [
    { title: 'Recycling Rookie', desc: 'Recycled first 5kg of plastic', points: '+50' },
    { title: 'Cardboard King', desc: '100% accurate cardboard sorting', points: '+200' },
    { title: 'Daily Streak', desc: '7 days of waste scanning', points: '+100' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex flex-col items-center mb-16">
        <div className="relative mb-12">
            <div className="w-64 h-64 rounded-full border-[12px] border-green-500 flex flex-col items-center justify-center bg-white shadow-2xl shadow-green-100 relative z-10 animate-in fade-in zoom-in duration-500">
                <span className="text-6xl font-black text-slate-900 tracking-tighter">{user.points}</span>
                <span className="text-xl font-bold text-green-600 uppercase tracking-widest mt-1">Points</span>
            </div>
            {/* Pulsing rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-4 border-green-200 animate-ping opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-green-100 animate-ping opacity-10" style={{ animationDelay: '500ms' }}></div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">You're doing great!</h2>
        <p className="text-slate-500 mb-8">Every point brings you closer to exclusive eco-rewards.</p>

        <button 
          onClick={onEarnMore}
          className="bg-green-600 hover:bg-green-700 text-white font-black py-4 px-12 rounded-full text-lg shadow-xl shadow-green-200 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
        >
          Earn more points
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 rounded-2xl">
                    <TrendingUp className="text-amber-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Recent Achievements</h3>
            </div>
            <div className="space-y-6">
                {achievements.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between group cursor-default">
                        <div>
                            <p className="font-bold text-slate-800 group-hover:text-green-600 transition-colors">{item.title}</p>
                            <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                        <span className="bg-slate-50 px-3 py-1 rounded-full text-sm font-black text-green-600">{item.points}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[32px] shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-white/10 rounded-2xl">
                        <Zap className="text-green-400 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Upcoming Rewards</h3>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                        <p className="font-bold text-green-400">50% Electricity Voucher</p>
                        <p className="text-xs text-white/50 mt-1">Unlock at 1500 points</p>
                        <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: '66%' }}></div>
                        </div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl opacity-50">
                        <p className="font-bold">Organic Fertilizers Bag</p>
                        <p className="text-xs text-white/50 mt-1">Unlock at 2000 points</p>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Points;
