import React, { useState, useEffect } from 'react';
import { UserCheck, Music, Ticket, Ban, CheckCircle } from 'lucide-react';
import { Card, Section } from './ui/Card';

const Tab1Analogy: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Init, 1: ID Checked (AuthN), 2: VIP Upgrade (AuthZ)
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"neutral" | "success" | "error">("neutral");

  // Step 0: Initial
  // Step 1: ID Verified (Wristband given)
  // Step 2: Attempt Backstage (Failed if not VIP)
  // Step 3: Upgraded to VIP
  
  const handleVerifyIdentity = () => {
    setStatusMessage("Scanning ID... Verifying Identity...");
    setStatusType("neutral");
    setTimeout(() => {
      setStep(1);
      setStatusMessage("Identity Verified: Welcome, Alice! (AuthN Complete)");
      setStatusType("success");
    }, 1500);
  };

  const attemptAccess = (area: "general" | "backstage") => {
    if (step === 0) {
      setStatusMessage("Stop! You must verify your identity at the gate first.");
      setStatusType("error");
      return;
    }

    if (area === "general") {
      setStatusMessage("Access Granted: Enjoy the music! (Authorized for General)");
      setStatusType("success");
    } else if (area === "backstage") {
      if (step < 3) {
        setStatusMessage("Access Denied: You do not have VIP permissions. (AuthZ Fail)");
        setStatusType("error");
      } else {
        setStatusMessage("Access Granted: Welcome back stage! (AuthZ Success)");
        setStatusType("success");
      }
    }
  };

  const handleUpgrade = () => {
    setStatusMessage("Processing upgrade...");
    setTimeout(() => {
      setStep(3);
      setStatusMessage("Permissions Updated: VIP Access Added.");
      setStatusType("success");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card title="The Core Difference" subtitle="Authentication (Who you are) vs. Authorization (What you can do)">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold text-lg mb-2 flex items-center gap-2">
              <UserCheck className="w-5 h-5" /> Authentication (AuthN)
            </h3>
            <p className="text-slate-300 text-sm">
              Verifying the identity of a user, process, or device.
              <br/><br/>
              <span className="italic opacity-80">"Hello, I am Alice. Here is my ID."</span>
            </p>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
            <h3 className="text-purple-400 font-bold text-lg mb-2 flex items-center gap-2">
              <Ban className="w-5 h-5" /> Authorization (AuthZ)
            </h3>
            <p className="text-slate-300 text-sm">
              Determining what permissions an authenticated user has.
              <br/><br/>
              <span className="italic opacity-80">"Can Alice enter the VIP room? Yes/No."</span>
            </p>
          </div>
        </div>

        <Section title="Interactive Analogy: The Music Festival">
          <div className="bg-cyber-900 rounded-xl p-6 border border-cyber-700 relative overflow-hidden">
             
             {/* Status Bar */}
            <div className={`mb-6 p-3 rounded-lg text-center font-mono text-sm transition-colors duration-300
              ${statusType === 'neutral' ? 'bg-slate-800 text-slate-300' : ''}
              ${statusType === 'success' ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-800' : ''}
              ${statusType === 'error' ? 'bg-red-900/50 text-red-300 border border-red-800' : ''}
            `}>
              {statusMessage || "Waiting for user action..."}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Zone 1: The Gate (AuthN) */}
              <div className={`flex flex-col items-center p-4 rounded-lg border-2 border-dashed transition-all
                ${step > 0 ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-slate-700'}`}>
                <div className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">The Gate (AuthN)</div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all
                   ${step > 0 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-700 text-slate-400'}
                `}>
                  <UserCheck className="w-8 h-8" />
                </div>
                {step === 0 ? (
                   <button onClick={handleVerifyIdentity} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-bold transition-colors">
                     Show ID
                   </button>
                ) : (
                  <div className="text-center">
                    <div className="text-emerald-400 font-bold text-sm mb-1">Identity Verified</div>
                    <div className="text-xs text-slate-500">ID: Alice</div>
                  </div>
                )}
              </div>

              {/* Zone 2: Wristband (AuthZ State) */}
              <div className="flex flex-col items-center justify-center p-4 border-l border-r border-cyber-700">
                <div className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Your Wristband</div>
                {step === 0 ? (
                  <div className="text-xs text-slate-600 italic">No wristband yet</div>
                ) : (
                  <div className={`flex flex-col items-center gap-2 animate-[pulse-fast_3s_infinite]`}>
                     <Ticket className={`w-12 h-12 ${step === 3 ? 'text-purple-400' : 'text-blue-400'}`} />
                     <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                        ${step === 3 ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}
                     `}>
                       {step === 3 ? "VIP Access" : "General Admission"}
                     </span>
                  </div>
                )}
                
                {step > 0 && step < 3 && (
                  <button onClick={handleUpgrade} className="mt-4 text-xs text-purple-400 hover:text-purple-300 underline">
                    Upgrade to VIP
                  </button>
                )}
              </div>

              {/* Zone 3: Restricted Areas (Enforcement) */}
              <div className="flex flex-col gap-3">
                 <div className="text-sm font-bold text-slate-400 text-center uppercase tracking-wider">Restricted Areas</div>
                 
                 <button 
                  onClick={() => attemptAccess("general")}
                  className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-750 rounded border border-slate-700 group">
                    <span className="flex items-center gap-2 text-sm text-slate-300">
                      <Music className="w-4 h-4" /> General Stage
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">Enter</span>
                 </button>

                 <button 
                   onClick={() => attemptAccess("backstage")}
                   className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-750 rounded border border-slate-700 group">
                    <span className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-purple-500" /> Backstage VIP
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">Enter</span>
                 </button>
              </div>
            </div>
          </div>
        </Section>
      </Card>
    </div>
  );
};

export default Tab1Analogy;