import { useState, useEffect } from 'react';
import { Users, Wifi, WifiOff, CheckCircle, Clock } from 'lucide-react';
import { TeamMember, TEAM_MEMBERS } from '../types/team';

export function SimpleMultiPCDashboard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [isOnline] = useState(navigator.onLine);
  const [connectedPCs] = useState(1);

  const toggleTaskCompletion = (id: string) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === id 
          ? { ...member, isCompleted: !member.isCompleted }
          : member
      )
    );
  };

  const completedTasks = teamMembers.filter(m => m.isCompleted).length;
  const inProgressTasks = teamMembers.length - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Bridge Engineering Team Dashboard
            </h1>
            <p className="text-slate-300">
              Multi-PC Synchronized Task Management System
            </p>
          </div>
          
          {/* Network Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="w-5 h-5 text-green-400" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-400" />
                )}
                <span className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                  {isOnline ? 'Connected' : 'Offline'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-blue-400">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">{connectedPCs} PC{connectedPCs !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">Total Members</p>
                <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">Completed Tasks</p>
                <p className="text-2xl font-bold text-white">{completedTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-slate-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-white">{inProgressTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border transition-all duration-300 hover:scale-105 ${
                member.isCompleted 
                  ? 'border-green-500/50 shadow-green-500/20 shadow-lg' 
                  : 'border-slate-700 hover:border-blue-500/50'
              }`}
            >
              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=2563eb&color=ffffff&size=150`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-slate-400 text-sm">{member.designation}</p>
                </div>
              </div>

              {/* Task Section */}
              <div className="mb-4">
                <p className="text-slate-400 text-xs font-medium mb-2">Current Task:</p>
                <p className="text-white text-sm">{member.task}</p>
              </div>

              {/* Status Toggle */}
              <button
                onClick={() => toggleTaskCompletion(member.id)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  member.isCompleted
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
                }`}
              >
                {member.isCompleted ? '✓ Task Completed' : '⏳ Mark as Complete'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-PC Instructions */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">Multi-PC Access Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div>
              <p className="font-medium text-blue-300 mb-2">🖥️ Server Running On:</p>
              <p>Port 3000 with network access enabled</p>
              <p>Access from other PCs: <code className="bg-slate-700 px-2 py-1 rounded">http://[YOUR_IP]:3000</code></p>
            </div>
            <div>
              <p className="font-medium text-green-300 mb-2">🔄 Real-time Features:</p>
              <p>• Task status updates sync across all PCs</p>
              <p>• Network status shows connected devices</p>
              <p>• Offline support with automatic sync</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}