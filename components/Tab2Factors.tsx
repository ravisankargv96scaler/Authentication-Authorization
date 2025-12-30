import React, { useState } from 'react';
import { Lock, Smartphone, ShieldCheck, RefreshCw } from 'lucide-react';
import { Card, Section } from './ui/Card';

const Tab2Factors: React.FC = () => {
  const [mode, setMode] = useState<"basic" | "mfa">("basic");
  const [step, setStep] = useState<"login" | "verify" | "success">("login");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const reset = () => {
    setStep("login");
    setPassword("");
    setCode("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      if (mode === "basic") {
        setStep("success");
      } else {
        setStep("verify");
      }
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "1234") {
      setStep("success");
    } else {
      alert("Incorrect code. Hint: 1234");
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Authentication Factors" subtitle="Something you know, something you have, something you are.">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => { setMode("basic"); reset(); }}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-bold transition-colors
              ${mode === "basic" ? "bg-blue-600/20 border-blue-500 text-blue-400" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750"}
            `}
          >
            Single Factor (Basic)
          </button>
          <button
            onClick={() => { setMode("mfa"); reset(); }}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-bold transition-colors
              ${mode === "mfa" ? "bg-purple-600/20 border-purple-500 text-purple-400" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750"}
            `}
          >
            Multi-Factor (MFA)
          </button>
        </div>

        <Section title="Login Simulator">
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 p-8 rounded-xl shadow-2xl relative">
              
              {/* Header Icon */}
              <div className="flex justify-center mb-6">
                 <div className={`p-4 rounded-full transition-all duration-500
                   ${step === "success" ? "bg-emerald-500/20 text-emerald-500" : "bg-slate-800 text-slate-400"}
                 `}>
                   {step === "success" ? <ShieldCheck className="w-10 h-10" /> : <Lock className="w-10 h-10" />}
                 </div>
              </div>

              {/* Step 1: Password */}
              {step === "login" && (
                <form onSubmit={handleLogin} className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 uppercase font-bold">Username</label>
                    <input type="text" value="user@example.com" disabled className="w-full bg-slate-800 border border-slate-700 text-slate-300 rounded p-2 text-sm opacity-50 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 uppercase font-bold">Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 text-white rounded p-2 text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="Type anything..."
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors"
                    disabled={!password}
                  >
                    {mode === 'basic' ? 'Log In' : 'Next'}
                  </button>
                </form>
              )}

              {/* Step 2: MFA Code */}
              {step === "verify" && (
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="text-center mb-4">
                    <Smartphone className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-bounce" />
                    <p className="text-sm text-slate-300">We sent a code to your device.</p>
                    <p className="text-xs text-slate-500 font-mono mt-1">Code: 1234</p>
                  </div>
                  <div>
                     <input 
                      type="text" 
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 text-white rounded p-2 text-center text-lg tracking-widest focus:border-purple-500 focus:outline-none"
                      placeholder="0000"
                      maxLength={4}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded transition-colors"
                  >
                    Verify
                  </button>
                </form>
              )}

              {/* Step 3: Success */}
              {step === "success" && (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-white">Access Granted</h3>
                  <p className="text-sm text-slate-400">
                    You have successfully authenticated using 
                    {mode === 'basic' ? <span className="text-blue-400"> Single Factor</span> : <span className="text-purple-400"> Multi-Factor</span>}.
                  </p>
                  <button 
                    onClick={reset}
                    className="flex items-center justify-center gap-2 w-full mt-4 py-2 border border-slate-700 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> Reset Simulator
                  </button>
                </div>
              )}

            </div>
          </div>
        </Section>
      </Card>
    </div>
  );
};

export default Tab2Factors;