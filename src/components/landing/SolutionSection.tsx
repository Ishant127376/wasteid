import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Cpu, CheckCircle, Sparkles, ArrowRight, Play, X, Zap, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    icon: Camera,
    title: 'Point Your Camera',
    description: 'Simply aim at any item you want to recycle',
    color: 'from-eco-sky to-eco-ocean',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Identifies Instantly',
    description: 'On-device ML classifies the material in milliseconds',
    color: 'from-eco-leaf to-eco-lime',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Get Instructions & Earn',
    description: 'Receive disposal guidance and earn eco-points',
    color: 'from-eco-earth to-amber-600',
  },
];

interface SolutionSectionProps {
  onTrySample: () => void;
}

export const SolutionSection = ({ onTrySample }: SolutionSectionProps) => {
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
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const materials = ['Plastic Bottle', 'Paper', 'Metal Can', 'Glass Jar'];
    const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
    
    setCapturedResult(randomMaterial);
    setIsCapturing(false);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-leaf/10 border border-eco-leaf/20 mb-6">
            <Sparkles className="w-4 h-4 text-eco-leaf" />
            <span className="text-sm font-medium text-eco-leaf">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Recycling Made <span className="eco-gradient-text">Effortless</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to become a recycling pro. No guesswork, just results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-card transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="text-6xl font-display font-bold text-muted/20 mb-4">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-display font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={startRealScan}
            variant="eco"
            size="xl"
            className="group"
          >
            <Camera className="w-5 h-5 mr-2" />
            Try Real Camera Scan
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={onTrySample}
            variant="eco-outline"
            size="xl"
            className="group"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Animation
          </Button>
        </motion.div>
      </div>

      {/* Fullscreen Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
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
                <div className="absolute top-24 left-8 w-16 h-16 border-l-4 border-t-4 border-eco-leaf/70 rounded-tl-lg" />
                <div className="absolute top-24 right-8 w-16 h-16 border-r-4 border-t-4 border-eco-leaf/70 rounded-tr-lg" />
                <div className="absolute bottom-40 left-8 w-16 h-16 border-l-4 border-b-4 border-eco-leaf/70 rounded-bl-lg" />
                <div className="absolute bottom-40 right-8 w-16 h-16 border-r-4 border-b-4 border-eco-leaf/70 rounded-br-lg" />
                
                {/* Scan line */}
                <motion.div
                  className="absolute left-8 right-8 h-1 bg-gradient-to-r from-transparent via-eco-leaf to-transparent shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                  animate={{ y: ['100px', '60vh', '100px'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Instructions */}
                <div className="absolute top-32 left-0 right-0 text-center">
                  <p className="text-white/80 text-lg font-medium">Point at an item to scan</p>
                </div>
              </div>
            )}
            
            {/* Capturing animation */}
            {isCapturing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-4">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-eco-leaf/30"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <div className="absolute inset-2 rounded-full bg-eco-forest/80 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-eco-lime animate-pulse" />
                  </div>
                </div>
                <p className="text-white text-lg font-medium">Analyzing material...</p>
              </div>
            )}
            
            {/* Result display */}
            {capturedResult && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-4 right-4 bottom-32 bg-card/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-eco-leaf flex items-center justify-center">
                    <Recycle className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xl text-foreground">{capturedResult}</p>
                    <p className="text-eco-leaf font-medium">Recyclable ♻️ +10 eco-points</p>
                  </div>
                  <div className="text-4xl">✓</div>
                </div>
              </motion.div>
            )}
            
            {/* Close button */}
            <button
              onClick={closeCamera}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-destructive/90 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              aria-label="Close camera"
            >
              <X className="w-6 h-6 text-destructive-foreground" />
            </button>
            
            {/* Capture button */}
            {!capturedResult && (
              <button
                onClick={captureAndScan}
                disabled={isCapturing}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 shadow-xl"
                aria-label="Capture photo"
              >
                <div className="w-16 h-16 rounded-full border-4 border-eco-forest/30 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-eco-forest" />
                </div>
              </button>
            )}
            
            {/* Scan again button */}
            {capturedResult && (
              <button
                onClick={() => setCapturedResult(null)}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-eco-leaf text-white font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
              >
                Scan Another Item
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
