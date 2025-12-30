import React, { useState } from 'react';
import { RefreshCcw, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, Section } from './ui/Card';

const Tab4JWT: React.FC = () => {
  const [tampered, setTampered] = useState(false);

  // Mock JWT Parts
  const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  const payloadNormal = "eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJBbGljZSIsInJvbGUiOiJhZG1pbiJ9";
  const payloadTampered = "eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJBbGljZSIsInJvbGUiOiJzdXBlci1hZG1pbiJ9"; // role: super-admin
  const signatureValid = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const signatureInvalid = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // Signature doesn't match payload change

  return (
    <div className="space-y-6">
      <Card title="JSON Web Token (JWT)" subtitle="A compact, URL-safe means of representing claims to be transferred between two parties.">
        
        <Section title="JWT Inspector">
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Left: Encoded Token */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-400 uppercase">Encoded (Header.Payload.Signature)</h4>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm break-all border border-slate-700 leading-relaxed">
                <span className="text-red-400 hover:bg-red-900/30 transition-colors cursor-help" title="Header">{header}</span>
                <span className="text-slate-500">.</span>
                <span className="text-purple-400 hover:bg-purple-900/30 transition-colors cursor-help" title="Payload">{tampered ? payloadTampered : payloadNormal}</span>
                <span className="text-slate-500">.</span>
                <span className={`transition-colors cursor-help ${tampered ? 'text-red-500 line-through decoration-2 decoration-white' : 'text-blue-400 hover:bg-blue-900/30'}`} title="Signature">
                  {signatureValid}
                </span>
              </div>
              
              <div className="pt-4 flex justify-between items-center">
                 <div className={`text-sm flex items-center gap-2 font-bold ${tampered ? 'text-red-400' : 'text-emerald-400'}`}>
                   {tampered ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                   {tampered ? "INVALID SIGNATURE" : "VALID TOKEN"}
                 </div>
                 <button 
                  onClick={() => setTampered(!tampered)}
                  className={`text-xs px-3 py-1 rounded border transition-colors
                    ${tampered ? 'bg-emerald-900/20 text-emerald-400 border-emerald-800' : 'bg-red-900/20 text-red-400 border-red-800'}
                  `}
                 >
                   {tampered ? 'Reset Token' : 'Tamper Payload'}
                 </button>
              </div>
            </div>

            {/* Right: Decoded JSON */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-400 uppercase">Decoded</h4>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm border border-slate-700 h-full flex flex-col justify-center space-y-4">
                
                {/* Header */}
                <div className="border-l-2 border-red-400 pl-3">
                  <span className="text-red-400 text-xs block mb-1">// Header: Algorithm & Type</span>
                  <pre className="text-slate-300">
{`{
  "alg": "HS256",
  "typ": "JWT"
}`}
                  </pre>
                </div>

                {/* Payload */}
                <div className="border-l-2 border-purple-400 pl-3 relative">
                  <span className="text-purple-400 text-xs block mb-1">// Payload: Data (Claims)</span>
                  <pre className="text-slate-300">
{`{
  "sub": "12345",`} <span className="text-blue-400 font-bold"> // AuthN (Who)</span>
{`  "name": "Alice",
  "role": "${tampered ? 'super-admin' : 'admin'}"`} <span className="text-green-400 font-bold"> // AuthZ (What)</span>
{`}`}
                  </pre>
                  {tampered && (
                     <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] px-2 py-1 rounded">
                        MODIFIED
                     </div>
                  )}
                </div>

                {/* Signature */}
                <div className="border-l-2 border-blue-400 pl-3">
                  <span className="text-blue-400 text-xs block mb-1">// Signature: Validation</span>
                  <div className="text-slate-400 text-xs">
                    HMACSHA256(<br/>
                    &nbsp;&nbsp;base64UrlEncode(header) + "." +<br/>
                    &nbsp;&nbsp;base64UrlEncode(payload),<br/>
                    &nbsp;&nbsp;<span className="text-amber-400">your-256-bit-secret</span><br/>
                    )
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Section>
      </Card>
    </div>
  );
};

export default Tab4JWT;