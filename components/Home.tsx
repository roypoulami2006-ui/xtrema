
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, X, Search } from 'lucide-react';
import { analyzeWasteImage } from '../geminiService';
import { WasteAnalysis } from '../types';

interface HomeProps {
  onReportGenerated: (data: WasteAnalysis, imageUrl: string) => void;
}

const GoogleDriveIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 2000 1732" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Right Section - Yellow */}
    <path d="M1333 0 L2000 1155 L1666 1732 L1000 577 L1333 0 Z" fill="#FFBA00" />
    {/* Bottom Section - Blue */}
    <path d="M333 1155 L2000 1155 L1666 1732 L0 1732 L333 1155 Z" fill="#2184F8" />
    {/* Left Section - Green */}
    <path d="M0 1732 L666 577 L1333 1732 L1000 1155 L0 1732 Z" fill="#00AC47" />
    {/* Top Left Connection - Green (Standard Google Drive Construction) */}
    <path d="M666 0 L1000 577 L666 1155 L0 1155 L666 0 Z" fill="#00AC47" />
    {/* Re-mapping for perfect alignment as per reference */}
    <g transform="translate(0,0)">
      <path d="M666.67 0L1333.33 0L2000 1154.67L1666.67 1732L1000 577.33L666.67 0Z" fill="#FFBA00" />
      <path d="M0 1154.67L333.33 577.33L1000 577.33L666.67 1154.67L0 1154.67Z" fill="#0066DA" opacity="0.1" /> {/* Subtle shadow overlap */}
      <path d="M0 1154.67L666.67 0L1000 577.33L333.33 1732L0 1154.67Z" fill="#00AC47" />
      <path d="M333.33 1154.67L2000 1154.67L1666.67 1732L333.33 1732L333.33 1154.67Z" fill="#2184F8" />
    </g>
  </svg>
);

const MOCK_DRIVE_FILES = [
  { id: 1, name: 'waste_collection_01.jpg', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400', size: '2.4 MB' },
  { id: 2, name: 'plastic_bottles.png', url: 'https://images.unsplash.com/photo-1595273670150-db0a3d39074f?auto=format&fit=crop&q=80&w=400', size: '1.1 MB' },
  { id: 3, name: 'cardboard_boxes.jpg', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400', size: '3.7 MB' },
  { id: 4, name: 'glass_recycling.jpg', url: 'https://images.unsplash.com/photo-1618477462146-050d2767eac4?auto=format&fit=crop&q=80&w=400', size: '1.8 MB' },
  { id: 5, name: 'mixed_trash_bins.jpg', url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400', size: '4.2 MB' },
  { id: 6, name: 'metal_scraps.jpg', url: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=400', size: '2.9 MB' },
];

const Home: React.FC<HomeProps> = ({ onReportGenerated }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDriveConnect = () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setShowDriveModal(true);
    }, 800);
  };

  const selectDriveFile = async (imageUrl: string) => {
    setShowDriveModal(false);
    setPreview(imageUrl);
  };

  const handleGenerateReport = async () => {
    if (!preview) return;
    setIsUploading(true);
    try {
      // If it's a URL (from Drive), we need to convert it to base64 for Gemini
      let imageToAnalyze = preview;
      if (preview.startsWith('http')) {
        const response = await fetch(preview);
        const blob = await response.blob();
        const reader = new FileReader();
        imageToAnalyze = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const result = await analyzeWasteImage(imageToAnalyze);
      onReportGenerated(result, preview);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Start your waste analysis</h2>
        <p className="text-slate-500 max-w-lg mx-auto">Upload images of your waste items and our AI will categorize them for better recycling.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Local Upload */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center transition-all hover:border-green-400 hover:bg-green-50/30"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          {preview && !preview.startsWith('http') ? (
            <div className="w-full h-full absolute inset-0 rounded-3xl overflow-hidden p-2">
              <img src={preview} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                <span className="text-white font-medium">Change Image</span>
              </div>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ImageIcon className="text-green-600 w-10 h-10" />
              </div>
              <p className="text-slate-700 font-semibold mb-2">Choose images from files</p>
              <p className="text-slate-400 text-sm">or drag and drop here</p>
            </>
          )}
        </div>

        {/* Google Drive Upload */}
        <div 
          onClick={handleDriveConnect}
          className="relative group cursor-pointer bg-white border-2 border-slate-100 rounded-3xl p-10 flex flex-col items-center justify-center transition-all hover:shadow-xl hover:-translate-y-1"
        >
          {preview && preview.startsWith('http') ? (
            <div className="w-full h-full absolute inset-0 rounded-3xl overflow-hidden p-2">
              <img src={preview} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                <span className="text-white font-medium">Change from Drive</span>
              </div>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm border border-slate-50">
                {isConnecting ? (
                  <Loader2 className="text-slate-400 w-10 h-10 animate-spin" />
                ) : (
                  <GoogleDriveIcon className="w-14 h-14" />
                )}
              </div>
              <p className="text-slate-700 font-semibold mb-2">Import from Google Drive</p>
              <p className="text-slate-400 text-sm">Connect your cloud storage</p>
              <button 
                className="mt-6 px-6 py-2 bg-[#4285F4] text-white rounded-xl text-sm font-bold hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all active:scale-95"
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          disabled={!preview || isUploading}
          onClick={handleGenerateReport}
          className={`px-12 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
            preview && !isUploading
            ? 'bg-green-600 text-white hover:bg-green-700 shadow-xl shadow-green-200'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Generate Report
              <Upload className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Mock Google Drive Picker Modal */}
      {showDriveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-50">
                  <GoogleDriveIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Google Drive</h3>
                  <p className="text-xs text-slate-400 font-medium">abc@xtrema.com</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDriveModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search your drive..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="flex-grow p-6 overflow-y-auto max-h-[400px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {MOCK_DRIVE_FILES.map((file) => (
                  <div 
                    key={file.id}
                    onClick={() => selectDriveFile(file.url)}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="aspect-square rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative transition-all group-hover:border-blue-400 group-hover:shadow-lg">
                      <img src={file.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={file.name} />
                      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors"></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700 truncate">{file.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{file.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowDriveModal(false)}
                className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
