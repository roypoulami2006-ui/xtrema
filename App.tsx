
import React, { useState, useEffect } from 'react';
import { View, User, WasteAnalysis, PickupDetails } from './types';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import Report from './components/Report';
import Profile from './components/Profile';
import Points from './components/Points';
import Schedule from './components/Schedule';

const DEFAULT_USER: User = {
  name: "xtrema ui dev",
  email: "abc@xtrema.com",
  phone: "345XXXX68",
  contribution: "50 kgs",
  points: 1000,
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleLogin = () => setCurrentView(View.HOME);
  const handleLogout = () => {
    setCurrentView(View.LOGIN);
    setAnalysis(null);
    setUploadedImage(null);
    setUser(DEFAULT_USER); // Reset to default user on logout
  };

  const navigateTo = (view: View) => setCurrentView(view);

  const handleReportGenerated = (data: WasteAnalysis, imageUrl: string) => {
    setAnalysis(data);
    setUploadedImage(imageUrl);
    setCurrentView(View.REPORT);
  };

  const renderView = () => {
    switch (currentView) {
      case View.LOGIN:
        return <Login onLogin={handleLogin} />;
      case View.HOME:
        return <Home onReportGenerated={handleReportGenerated} />;
      case View.REPORT:
        return analysis && uploadedImage ? (
          <Report analysis={analysis} image={uploadedImage} onSchedule={() => setCurrentView(View.SCHEDULE)} />
        ) : <Home onReportGenerated={handleReportGenerated} />;
      case View.PROFILE:
        return <Profile user={user} />;
      case View.POINTS:
        return <Points user={user} onEarnMore={() => setCurrentView(View.HOME)} />;
      case View.SCHEDULE:
        return <Schedule onScheduled={() => {
            // Show the requested confirmation message
            alert("pickup confirmed");
            // Navigate back to home
            setCurrentView(View.HOME);
        }} />;
      default:
        return <Home onReportGenerated={handleReportGenerated} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {currentView !== View.LOGIN && (
        <Header 
          currentView={currentView} 
          onNavigate={navigateTo} 
          onLogout={handleLogout}
          user={user}
        />
      )}
      <main className={`flex-grow ${currentView === View.LOGIN ? '' : 'container mx-auto px-4 py-8'}`}>
        {renderView()}
      </main>
      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-100 mt-auto">
        &copy; {new Date().getFullYear()} Xtrema Waste Management. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
