import { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

export function ConnectionIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastSync(new Date());
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update sync time periodically when online
    const interval = setInterval(() => {
      if (isOnline) {
        setLastSync(new Date());
      }
    }, 30000); // Update every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [isOnline]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700">
      <div className="flex items-center gap-2 text-xs">
        {isOnline ? (
          <>
            <CheckCircle className="w-3 h-3 text-green-400" />
            <span className="text-green-400">Synced</span>
            <span className="text-slate-400">{formatTime(lastSync)}</span>
          </>
        ) : (
          <>
            <AlertCircle className="w-3 h-3 text-yellow-400" />
            <span className="text-yellow-400">Offline</span>
          </>
        )}
      </div>
    </div>
  );
}