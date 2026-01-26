import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-50 bg-eco-earth text-primary-foreground py-2 px-4"
        >
          <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
            <WifiOff className="w-4 h-4 offline-indicator" />
            <span>You're offline. ML classification still works!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OnlineStatusBadge() {
  const isOnline = useOnlineStatus();

  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
      isOnline 
        ? 'bg-eco-leaf/10 text-eco-leaf' 
        : 'bg-eco-earth/10 text-eco-earth'
    }`}>
      {isOnline ? (
        <>
          <Wifi className="w-3 h-3" />
          <span>Online</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3" />
          <span>Offline</span>
        </>
      )}
    </div>
  );
}
