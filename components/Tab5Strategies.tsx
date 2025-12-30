import React, { useState } from 'react';
import { Clock, Briefcase, FileText, Lock, Unlock } from 'lucide-react';
import { Card, Section } from './ui/Card';

const Tab5Strategies: React.FC = () => {
  const [strategy, setStrategy] = useState<'rbac' | 'abac'>('rbac');
  const [role, setRole] = useState<'manager' | 'intern'>('manager');
  const [time, setTime] = useState<'day' | 'night'>('day'); // Day = 2PM, Night = 10PM

  // Logic
  // RBAC: Manager always has access.
  // ABAC: Manager has access ONLY during day (2PM). 
  
  const hasAccess = () => {
    if (role === 'intern') return false; // Intern never has access
    if (strategy === 'rbac') return true; // Manager always has access in RBAC
    if (strategy === 'abac') {
      // In ABAC, Manager + Day is required
      return time === 'day';
    }
    return false;
  };

  const access = hasAccess();

  return (
    <div className="space-y-6">
      <Card title="Authorization Strategies" subtitle="Comparing Static Roles (RBAC) vs Dynamic Attributes (ABAC).">
        
        {/* Strategy Switcher */}
        <div className="flex bg-slate-800 p-1 rounded-lg mb-6 max-w-md mx-auto">
          <button
            onClick={() => setStrategy('rbac')}
            className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${strategy === 'rbac' ? 'bg-cyber-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            RBAC (Static)
          </button>
          <button
            onClick={() => setStrategy('abac')}
            className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${strategy === 'abac' ? 'bg-cyber-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            ABAC (Dynamic)
          </button>
        </div>

        <Section title="The Policy Engine">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Controls */}
            <div className="space-y-6">
               <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 space-y-4">
                 <h4 className="text-cyber-accent font-bold uppercase text-xs tracking-wider mb-4">Context Attributes</h4>
                 
                 {/* Role Toggle */}
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Briefcase className="w-4 h-4" />
                      <span>User Role</span>
                    </div>
                    <div className="flex bg-slate-800 rounded p-1">
                      <button 
                        onClick={() => setRole('manager')}
                        className={`px-3 py-1 text-xs rounded ${role === 'manager' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                      >
                        Manager
                      </button>
                      <button 
                        onClick={() => setRole('intern')}
                        className={`px-3 py-1 text-xs rounded ${role === 'intern' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                      >
                        Intern
                      </button>
                    </div>
                 </div>

                 {/* Time Toggle (Only relevant for ABAC visuals basically) */}
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4" />
                      <span>Current Time</span>
                    </div>
                    <div className="flex bg-slate-800 rounded p-1">
                      <button 
                        onClick={() => setTime('day')}
                        className={`px-3 py-1 text-xs rounded ${time === 'day' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
                      >
                        2:00 PM
                      </button>
                      <button 
                        onClick={() => setTime('night')}
                        className={`px-3 py-1 text-xs rounded ${time === 'night' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                      >
                        10:00 PM
                      </button>
                    </div>
                 </div>
               </div>

               <div className="p-4 bg-slate-800/50 rounded text-xs text-slate-400 border border-slate-700">
                 <strong>Current Policy:</strong>
                 <p className="font-mono mt-2 text-slate-300">
                   {strategy === 'rbac' 
                     ? "IF user.role == 'Manager' THEN Allow Access"
                     : "IF user.role == 'Manager' AND time < 5:00 PM THEN Allow Access"}
                 </p>
               </div>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-700 rounded-lg relative overflow-hidden transition-colors duration-500">
               {/* Background Glow */}
               <div className={`absolute inset-0 opacity-10 ${access ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <FileText className="w-16 h-16 text-slate-600 mb-4" />
                  <div className={`p-4 rounded-full mb-4 border-4 transition-all duration-300
                    ${access ? 'bg-emerald-500 border-emerald-300 text-white shadow-lg shadow-emerald-500/40' : 'bg-red-500 border-red-300 text-white shadow-lg shadow-red-500/40'}
                  `}>
                    {access ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                  </div>
                  <h3 className={`text-2xl font-bold ${access ? 'text-emerald-400' : 'text-red-400'}`}>
                    {access ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                  </h3>
                  
                  {!access && strategy === 'abac' && role === 'manager' && time === 'night' && (
                    <p className="mt-2 text-red-300 text-xs text-center">
                      Denied by Policy: Outside business hours.
                    </p>
                  )}
               </div>
            </div>

          </div>
        </Section>
      </Card>
    </div>
  );
};

export default Tab5Strategies;