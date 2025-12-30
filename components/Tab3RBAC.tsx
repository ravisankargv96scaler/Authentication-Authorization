import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, ShieldAlert } from 'lucide-react';
import { Card, Section } from './ui/Card';

type Role = 'intern' | 'editor' | 'admin';

const Tab3RBAC: React.FC = () => {
  const [role, setRole] = useState<Role>('intern');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shaking, setShaking] = useState<string | null>(null);

  const handleAction = (action: 'view' | 'edit' | 'delete') => {
    let allowed = false;

    if (role === 'admin') allowed = true;
    else if (role === 'editor' && (action === 'view' || action === 'edit')) allowed = true;
    else if (role === 'intern' && false) allowed = false; // Intern can't do anything in this sim

    if (allowed) {
      setFeedback(`Success: ${action.toUpperCase()} action authorized for ${role}.`);
    } else {
      setFeedback(`403 FORBIDDEN: ${role} cannot perform ${action}.`);
      setShaking(action);
      setTimeout(() => setShaking(null), 500);
    }
  };

  useEffect(() => {
    setFeedback(null);
  }, [role]);

  return (
    <div className="space-y-6">
      <Card title="Role-Based Access Control (RBAC)" subtitle="Permissions are assigned to roles, not individual users.">
        
        <div className="flex items-center justify-between bg-cyber-800 p-4 rounded-lg border border-cyber-700 mb-8">
           <span className="text-slate-300 font-bold">Current Role:</span>
           <select 
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="bg-slate-900 border border-slate-600 text-white rounded px-4 py-2 focus:outline-none focus:border-cyber-accent"
           >
             <option value="intern">Intern</option>
             <option value="editor">Editor</option>
             <option value="admin">Admin</option>
           </select>
        </div>

        <Section title="Interactive Dashboard">
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
            {/* Mock Header */}
            <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
               </div>
               <div className="text-xs text-slate-500 font-mono">dashboard.sys</div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* View Card */}
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
                     <div className="bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
                       <Eye />
                     </div>
                     <h4 className="text-white font-bold mb-2">View Reports</h4>
                     <p className="text-xs text-slate-500 mb-4">Read-only access to data.</p>
                     <button 
                        onClick={() => handleAction('view')}
                        className={`w-full py-2 rounded text-sm font-bold transition-all ${shaking === 'view' ? 'animate-shake bg-red-900/50 border border-red-500 text-red-400' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                     >
                       Access Reports
                     </button>
                  </div>

                  {/* Edit Card */}
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
                     <div className="bg-emerald-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                       <Edit />
                     </div>
                     <h4 className="text-white font-bold mb-2">Edit Content</h4>
                     <p className="text-xs text-slate-500 mb-4">Modify existing articles.</p>
                     <button 
                        onClick={() => handleAction('edit')}
                        className={`w-full py-2 rounded text-sm font-bold transition-all 
                          ${shaking === 'edit' ? 'animate-shake bg-red-900/50 border border-red-500 text-red-400' : ''}
                          ${role === 'intern' ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}
                        `}
                     >
                       Edit Mode
                     </button>
                  </div>

                  {/* Delete Card */}
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center relative overflow-hidden">
                     {role !== 'admin' && <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-[1px]"><Lock className="text-slate-500 w-8 h-8 opacity-50"/></div>}
                     <div className="bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                       <Trash2 />
                     </div>
                     <h4 className="text-white font-bold mb-2">Delete User</h4>
                     <p className="text-xs text-slate-500 mb-4">Permanently remove data.</p>
                     <button 
                        onClick={() => handleAction('delete')}
                        className={`w-full py-2 rounded text-sm font-bold transition-all
                           ${shaking === 'delete' ? 'animate-shake bg-red-900/50 border border-red-500 text-red-400' : ''}
                           ${role !== 'admin' ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white'}
                        `}
                     >
                       Delete
                     </button>
                  </div>

               </div>

               {/* Feedback Area */}
               <div className="mt-8 h-12 flex items-center justify-center">
                 {feedback && (
                   <div className={`px-4 py-2 rounded-full text-sm font-mono flex items-center gap-2 animate-pulse
                     ${feedback.includes('Success') ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-800' : 'bg-red-900/50 text-red-400 border border-red-800'}
                   `}>
                     {feedback.includes('FORBIDDEN') && <ShieldAlert className="w-4 h-4" />}
                     {feedback}
                   </div>
                 )}
               </div>
            </div>
          </div>
        </Section>
      </Card>
    </div>
  );
};

export default Tab3RBAC;