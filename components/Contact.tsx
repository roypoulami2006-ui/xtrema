
import React, { useState } from 'react';
import { Send, Mail, MessageSquare, User, ArrowLeft, CheckCircle } from 'lucide-react';

interface ContactProps {
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Message Sent!</h2>
        <p className="text-slate-500 mb-10">
          Thank you for reaching out. Our support team will get back to you within 24 hours.
        </p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Contact Us</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Have questions about your pickup or how the points work? We're here to help.
        </p>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden grid md:grid-cols-5">
        <div className="md:col-span-2 bg-[#059669] p-10 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-emerald-50 mb-10 leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">support@xtrema.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">Live Chat Available 24/7</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <span className="font-bold">in</span>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <span className="font-bold">X</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-3 p-10 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  required
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
            <input 
              required
              type="text" 
              placeholder="How can we help?" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
            <textarea 
              required
              rows={4}
              placeholder="Your message here..." 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? 'Sending...' : 'Send Message'}
            {!loading && <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
