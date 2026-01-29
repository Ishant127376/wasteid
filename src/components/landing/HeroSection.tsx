import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Camera, Sparkles, Leaf, Recycle, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartScanning: () => void;
}

export const HeroSection = ({ onStartScanning }: HeroSectionProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedResult, setCapturedResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Camera lifecycle management
  useEffect(() => {
    if (showCamera) {
      const startCamera = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'environment',
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });
          
          setStream(mediaStream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } catch (error) {
          console.error('Camera access error:', error);
          alert('Camera access is required for scanning. Please allow camera permissions.');
          setShowCamera(false);
        }
      };
      
      startCamera();
    }
    
    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startRealScan = useCallback(() => {
    setCapturedResult(null);
    setShowCamera(true);
  }, []);

  const closeCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
    setCapturedResult(null);
  }, [stream]);

  const captureAndScan = useCallback(async () => {
    if (!videoRef.current) return;
    
    setIsCapturing(true);
    
    // Simulate ML processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock classification result
    const materials = ['Plastic Bottle', 'Paper', 'Metal Can', 'Glass Jar'];
    const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
    
    setCapturedResult(randomMaterial);
    setIsCapturing(false);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      {/* Floating Eco Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-eco-leaf/20"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '100%',
              rotate: 0 
            }}
            animate={{ 
              y: '-20%',
              rotate: 360,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
          >
            {i % 3 === 0 ? (
              <Leaf className="w-8 h-8" />
            ) : i % 3 === 1 ? (
              <Recycle className="w-10 h-10" />
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-leaf/10 border border-eco-leaf/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-eco-leaf" />
            <span className="text-sm font-medium text-eco-leaf">
              AI-Powered Recycling Assistant
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            <span className="eco-gradient-text">Scan.</span>{' '}
            <span className="eco-gradient-text">Sort.</span>{' '}
            <span className="eco-gradient-text">Earn.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Stop guessing. Start earning. Your pocket AI recycling assistant 
            that works offline and rewards every sustainable choice.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={startRealScan}
              variant="eco"
              size="xl"
              className="group"
            >
              <Camera className="w-5 h-5 mr-2 group-hover:animate-bounce-subtle" />
              Open Camera & Scan
            </Button>
            <Button
              variant="eco-outline"
              size="xl"
              className="group"
              onClick={onStartScanning}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Full App Demo
            </Button>
          </motion.div>

          {/* Phone Mockup with Camera */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto w-64 md:w-80">
              {/* Phone Frame */}
              <div className="relative bg-foreground/90 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19] relative">
                  {/* Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground/90 rounded-full z-30" />
                  
                  {/* Camera Feed */}
                  <AnimatePresence>
                    {showCamera && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-black rounded-[2.5rem] overflow-hidden"
                      >
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                          aria-label="Camera feed"
                        />
                        
                        {/* Scanning overlay */}
                        {!isCapturing && !capturedResult && (
                          <div className="absolute inset-0 pointer-events-none">
                            {/* Corner brackets */}
                            <div className="absolute top-16 left-6 w-12 h-12 border-l-2 border-t-2 border-eco-leaf/70" />
                            <div className="absolute top-16 right-6 w-12 h-12 border-r-2 border-t-2 border-eco-leaf/70" />
                            <div className="absolute bottom-24 left-6 w-12 h-12 border-l-2 border-b-2 border-eco-leaf/70" />
                            <div className="absolute bottom-24 right-6 w-12 h-12 border-r-2 border-b-2 border-eco-leaf/70" />
                            
                            {/* Scan line */}
                            <motion.div
                              className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-eco-leaf to-transparent"
                              animate={{ y: ['80px', '280px', '80px'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                          </div>
                        )}
                        
                        {/* Capturing animation */}
                        {isCapturing && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="relative w-20 h-20">
                              <motion.div
                                className="absolute inset-0 rounded-full border-4 border-eco-leaf/30"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                              <div className="absolute inset-2 rounded-full bg-eco-forest/80 flex items-center justify-center">
                                <Zap className="w-8 h-8 text-eco-lime animate-pulse" />
                              </div>
                            </div>
                            <p className="absolute bottom-32 text-white text-sm font-medium">
                              Analyzing...
                            </p>
                          </div>
                        )}
                        
                        {/* Result display */}
                        {capturedResult && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-x-4 bottom-24 bg-card/95 backdrop-blur p-4 rounded-xl shadow-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-eco-leaf flex items-center justify-center">
                                <Recycle className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground">{capturedResult}</p>
                                <p className="text-sm text-eco-leaf">Recyclable ♻️ +10 pts</p>
                              </div>
                              <div className="text-2xl">✓</div>
                            </div>
                          </motion.div>
                        )}
                        
                        {/* Close button */}
                        <button
                          onClick={closeCamera}
                          className="absolute top-14 right-4 w-10 h-10 rounded-full bg-destructive/90 flex items-center justify-center z-30 hover:scale-110 transition-transform"
                          aria-label="Close camera"
                        >
                          <X className="w-5 h-5 text-destructive-foreground" />
                        </button>
                        
                        {/* Capture button */}
                        {!capturedResult && (
                          <button
                            onClick={captureAndScan}
                            disabled={isCapturing}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white flex items-center justify-center z-30 hover:scale-110 transition-transform disabled:opacity-50 shadow-lg"
                            aria-label="Capture photo"
                          >
                            <div className="w-14 h-14 rounded-full border-4 border-eco-forest/30 flex items-center justify-center">
                              <Camera className="w-6 h-6 text-eco-forest" />
                            </div>
                          </button>
                        )}
                        
                        {/* Scan again button */}
                        {capturedResult && (
                          <button
                            onClick={() => setCapturedResult(null)}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-eco-leaf text-white font-medium z-30 hover:scale-105 transition-transform"
                          >
                            Scan Another
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Screen Content (Demo animation when camera is off) */}
                  {!showCamera && (
                    <div className="h-full bg-gradient-to-b from-eco-cream to-background p-6 pt-14">
                      <div className="space-y-4">
                        {/* Scan Area Mockup */}
                        <div className="aspect-square bg-eco-forest/10 rounded-2xl border-2 border-dashed border-eco-leaf/30 flex items-center justify-center relative overflow-hidden">
                          {/* Scanning Animation */}
                          <motion.div
                            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-eco-leaf to-transparent"
                            animate={{ y: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          />
                          <div className="text-center z-10">
                            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-eco-leaf/20 flex items-center justify-center">
                              <Recycle className="w-8 h-8 text-eco-leaf" />
                            </div>
                            <p className="text-xs text-muted-foreground">Scanning...</p>
                          </div>
                        </div>
                        
                        {/* Result Card */}
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1, duration: 0.3 }}
                          className="bg-card p-4 rounded-xl shadow-soft border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-eco-leaf flex items-center justify-center">
                              <span className="text-lg">♻️</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">Plastic Bottle</p>
                              <p className="text-xs text-eco-leaf">Recyclable +10 pts</p>
                            </div>
                            <div className="text-eco-leaf">✓</div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 blur-3xl bg-eco-leaf/20 rounded-full scale-75" />
            </div>
            
            {/* Floating Action Button */}
            <motion.button
              onClick={startRealScan}
              className="absolute -right-4 md:right-8 bottom-20 w-14 h-14 rounded-full bg-eco-leaf shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Open Camera"
              aria-label="Open Camera"
            >
              <Camera className="w-6 h-6 text-white" />
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-nature border-2 border-background"
                  />
                ))}
              </div>
              <span>1,000+ eco-warriors</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-eco-leaf" />
              <span>Works 100% offline</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
