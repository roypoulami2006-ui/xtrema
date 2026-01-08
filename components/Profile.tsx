
import React from 'react';
import { User as UserType } from '../types';
import { Mail, Phone, Scale, Award, Edit3 } from 'lucide-react';

interface ProfileProps {
  user: UserType;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const stats = [
    { label: 'Waste Contribution', value: user.contribution, icon: Scale, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Points Earned', value: user.points, icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-green-600 to-green-500 relative">
            <button className="absolute top-6 right-6 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors backdrop-blur-md">
                <Edit3 className="w-5 h-5" />
            </button>
        </div>
        
        <div className="px-8 pb-12">
          <div className="relative -mt-24 mb-6 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full border-8 border-white bg-white overflow-hidden shadow-2xl">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=16a34a&color=fff&size=512`} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-6 tracking-tight">{user.name}</h2>
            <p className="text-green-600 font-semibold uppercase tracking-widest text-sm mt-1">Platinum Contributor</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[2px] ml-1">Email ID</label>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <Mail className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-700 font-medium truncate">{user.email}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[2px] ml-1">Phone Number</label>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <Phone className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-700 font-medium">{user.phone}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[2px] ml-1">{stat.label}</label>
                        <div className={`flex items-center gap-3 p-4 ${stat.bg} border border-transparent rounded-2xl`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            <span className={`${stat.color} text-xl font-bold`}>{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
