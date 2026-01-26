import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, ScanBarcode, RotateCcw, Zap } from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';
import { classifyMaterial, ClassificationResult } from '@/lib/classifier';
import { Button } from './ui/button';

interface CameraCaptureProps {
  onClassify: (result: ClassificationResult) => void;
  onScanBarcode: () => void;
  isClassifying: boolean;
  setIsClassifying: (value: boolean) => void;
}

export function CameraCapture({
  onClassify,
  onScanBarcode,
  isClassifying,
  setIsClassifying,
}: CameraCaptureProps) {
  const {
    videoRef,
    canvasRef,
    isActive,
    error,
    startCamera,
    stopCamera,
    captureFrame,
  } = useCamera();

  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = useCallback(async () => {
    const imageData = captureFrame();
    
    // Get captured image for display
    if (canvasRef.current) {
      setCapturedImage(canvasRef.current.toDataURL('image/jpeg', 0.8));
    }
    
    setIsClassifying(true);
    
    try {
      const result = await classifyMaterial(imageData);
      onClassify(result);
    } catch (err) {
      console.error('Classification error:', err);
    } finally {
      setIsClassifying(false);
    }
  }, [captureFrame, canvasRef, onClassify, setIsClassifying]);

  const handleReset = useCallback(() => {
    setCapturedImage(null);
  }, []);

  return (
    <div className="space-y-4">
      {/* Camera Viewfinder */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
        {!isActive && !capturedImage ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-4"
            >
              <Camera className="w-16 h-16 text-muted-foreground" />
            </motion.div>
            <p className="text-muted-foreground mb-4">
              Point your camera at an item to identify its material
            </p>
            <Button variant="eco" size="lg" onClick={startCamera}>
              <Camera className="w-5 h-5 mr-2" />
              Start Camera
            </Button>
            {error && (
              <p className="text-destructive mt-4 text-sm">{error}</p>
            )}
          </div>
        ) : capturedImage ? (
          <>
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
            {isClassifying && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full eco-scanner-ring animate-spin-slow" />
                  <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
                    <Zap className="w-8 h-8 text-eco-leaf animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Viewfinder overlay */}
            <div className="camera-viewfinder absolute inset-0" />
            
            {/* Scan guide */}
            <div className="absolute inset-8 border-2 border-dashed border-eco-leaf/50 rounded-xl pointer-events-none" />
          </>
        )}
        
        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        {isActive && !capturedImage && (
          <>
            <Button
              variant="eco-outline"
              size="lg"
              onClick={onScanBarcode}
            >
              <ScanBarcode className="w-5 h-5 mr-2" />
              Scan Barcode
            </Button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCapture}
              disabled={isClassifying}
              className="relative w-20 h-20 rounded-full eco-button-primary flex items-center justify-center shadow-glow disabled:opacity-50"
            >
              <div className="absolute inset-2 rounded-full border-4 border-primary-foreground/30" />
              <Camera className="w-8 h-8" />
            </motion.button>
            
            <Button
              variant="eco-ghost"
              size="lg"
              onClick={stopCamera}
            >
              Stop
            </Button>
          </>
        )}
        
        {capturedImage && !isClassifying && (
          <Button
            variant="eco-outline"
            size="lg"
            onClick={handleReset}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Scan Another
          </Button>
        )}
      </div>
    </div>
  );
}
