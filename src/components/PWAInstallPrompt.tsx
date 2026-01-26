import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button } from './ui/button';
import { useState } from 'react';

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isInstalled || isDismissed || !isInstallable) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
      >
        <div className="pwa-install-banner rounded-2xl p-4 text-primary-foreground shadow-glow">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary-foreground/20">
              <Download className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold">Install EcoSnap</h3>
              <p className="text-sm opacity-90 mt-1">
                Add to your home screen for offline access and quick scanning.
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-primary-foreground text-eco-forest hover:bg-primary-foreground/90"
                  onClick={promptInstall}
                >
                  Install
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => setIsDismissed(true)}
                >
                  Not now
                </Button>
              </div>
            </div>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-full hover:bg-primary-foreground/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
