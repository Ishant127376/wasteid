import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Quagga from 'quagga';
import { X, Loader2 } from 'lucide-react';
import { lookupBarcode } from '@/lib/classifier';
import { Button } from './ui/button';

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (result: {
    barcode: string;
    productName?: string;
    material?: 'plastic' | 'paper' | 'metal' | 'glass' | 'unknown';
    recyclingInfo?: string;
  }) => void;
}

export function BarcodeScanner({ isOpen, onClose, onResult }: BarcodeScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);

  const handleDetected = useCallback(async (result: { codeResult: { code: string } }) => {
    const code = result.codeResult.code;
    
    // Prevent duplicate scans
    if (code === lastScannedCode || isLookingUp) return;
    
    setLastScannedCode(code);
    setIsLookingUp(true);
    
    // Stop scanner while looking up
    Quagga.stop();
    
    try {
      const productInfo = await lookupBarcode(code);
      
      onResult({
        barcode: code,
        productName: productInfo.productName,
        material: productInfo.material,
        recyclingInfo: productInfo.recyclingInfo,
      });
    } catch (err) {
      console.error('Lookup error:', err);
      onResult({ barcode: code });
    } finally {
      setIsLookingUp(false);
      onClose();
    }
  }, [lastScannedCode, isLookingUp, onResult, onClose]);

  useEffect(() => {
    if (!isOpen || !scannerRef.current) return;

    setError(null);
    setLastScannedCode(null);

    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            facingMode: 'environment',
            width: { min: 640 },
            height: { min: 480 },
          },
        },
        decoder: {
          readers: [
            'ean_reader',
            'ean_8_reader',
            'upc_reader',
            'upc_e_reader',
            'code_128_reader',
            'code_39_reader',
          ],
        },
        locate: true,
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
      },
      (err) => {
        if (err) {
          console.error('Quagga init error:', err);
          setError('Could not access camera for barcode scanning');
          return;
        }
        Quagga.start();
        setIsInitialized(true);
      }
    );

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
      setIsInitialized(false);
    };
  }, [isOpen, handleDetected]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-bold">Scan Barcode</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Scanner Area */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-black">
              {error ? (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <div>
                    <p className="text-destructive mb-4">{error}</p>
                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : isLookingUp ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 text-eco-leaf animate-spin" />
                    <p className="text-lg font-medium">Looking up product...</p>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    ref={scannerRef}
                    className="absolute inset-0 [&>video]:w-full [&>video]:h-full [&>video]:object-cover [&>canvas]:hidden"
                  />
                  
                  {/* Scan guide overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-x-8 top-1/3 h-24 border-2 border-eco-leaf rounded-lg">
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-eco-leaf animate-scan-line" />
                    </div>
                  </div>

                  {!isInitialized && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                      <Loader2 className="w-8 h-8 text-eco-leaf animate-spin" />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Position the barcode within the frame</p>
              <p className="mt-1">Works with EAN, UPC, and Code 128 barcodes</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
