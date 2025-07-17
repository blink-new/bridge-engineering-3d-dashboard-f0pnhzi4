import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Users } from 'lucide-react';
import { teamDataService } from '../services/teamDataService';

export function NetworkStatus() {
  const [status, setStatus] = useState({ connected: false, peers: 0 });

  useEffect(() => {
    const checkStatus = async () => {
      const networkStatus = await teamDataService.getNetworkStatus();
      setStatus(networkStatus);
    };

    // Check immediately
    checkStatus();

    // Check every 5 seconds
    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          {status.connected ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-400" />
          )}
          <span className={status.connected ? 'text-green-400' : 'text-red-400'}>
            {status.connected ? 'Connected' : 'Offline'}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-blue-400">
          <Users className="w-4 h-4" />
          <span>{status.peers} PC{status.peers !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}