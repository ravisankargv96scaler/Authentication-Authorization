import React, { useState } from 'react';
import { Shield, Lock, Key, FileCode, Sliders, GraduationCap, Menu, X } from 'lucide-react';
import Tab1Analogy from './components/Tab1Analogy';
import Tab2Factors from './components/Tab2Factors';
import Tab3RBAC from './components/Tab3RBAC';
import Tab4JWT from './components/Tab4JWT';
import Tab5Strategies from './components/Tab5Strategies';
import Tab6Quiz from './components/Tab6Quiz';

enum Tabs {
  ANALOGY = 'analogy',
  FACTORS = 'factors',
  RBAC = 'rbac',
  JWT = 'jwt',
  STRATEGIES = 'strategies',
  QUIZ = 'quiz',
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.ANALOGY);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: Tabs.ANALOGY, label: 'The Concept', icon: Shield, desc: 'AuthN vs AuthZ' },
    { id: Tabs.FACTORS, label: 'Authentication', icon: Lock, desc: 'Factors & MFA' },
    { id: Tabs.RBAC, label: 'Authorization', icon: Key, desc: 'RBAC Systems' },
    { id: Tabs.JWT, label: 'The Token', icon: FileCode, desc: 'JWT Structure' },
    { id: Tabs.STRATEGIES, label: 'Strategies', icon: Sliders, desc: 'RBAC vs ABAC' },
    { id: Tabs.QUIZ, label: 'Quiz', icon: GraduationCap, desc: 'Test Knowledge' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case Tabs.ANALOGY: return <Tab1Analogy />;
      case Tabs.FACTORS: return <Tab2Factors />;
      case Tabs.RBAC: return <Tab3RBAC />;
      case Tabs.JWT: return <Tab4JWT />;
      case Tabs.STRATEGIES: return <Tab5Strategies />;
      case Tabs.QUIZ: return <Tab6Quiz />;
      default: return <Tab1Analogy />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-900 text-slate-100 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-cyber-800 p-4 border-b border-cyber-700 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <Shield className="text-cyber-accent w-6 h-6" />
          <span className="font-bold text-lg tracking-wider">AUTH ACADEMY</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`
        absolute md:relative w-full md:w-72 bg-cyber-800 border-r border-cyber-700 
        flex flex-col h-[calc(100vh-64px)] md:h-screen transition-transform duration-300 z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="hidden md:flex p-6 items-center gap-3 border-b border-cyber-700 mb-4">
          <div className="p-2 bg-cyber-accent/10 rounded-lg">
            <Shield className="text-cyber-accent w-8 h-8" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide">AUTH ACADEMY</h1>
            <p className="text-xs text-slate-400">Security Fundamentals</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 border-l-4
                ${activeTab === item.id 
                  ? 'bg-cyber-700 border-cyber-accent text-white' 
                  : 'border-transparent text-slate-400 hover:bg-cyber-700/50 hover:text-slate-200'
                }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-cyber-accent' : ''}`} />
              <div className="text-left">
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs opacity-70">{item.desc}</div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="p-6 border-t border-cyber-700">
          <p className="text-xs text-slate-500 text-center">
            v1.0.0 • Interactive Learning
          </p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 h-[calc(100vh-64px)] md:h-screen overflow-y-auto bg-cyber-900 relative">
        <div className="max-w-5xl mx-auto p-4 md:p-8 pb-20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;