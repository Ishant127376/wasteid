import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Camera, BarChart3, Info, Recycle, X, ArrowLeft } from 'lucide-react';
import { CameraCapture } from '@/components/CameraCapture';
import { ClassificationDisplay } from '@/components/ClassificationDisplay';
import { BarcodeScanner } from '@/components/BarcodeScanner';
import { PointsDashboard } from '@/components/PointsDashboard';
import { OfflineIndicator, OnlineStatusBadge } from '@/components/OfflineIndicator';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { ClassificationResult } from '@/lib/classifier';
import { getUserStats, addClassificationPoints, UserStats } from '@/lib/storage';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Navbar,
  HeroSection,
  ProblemSection,
  SolutionSection,
  FeaturesGrid,
  TechSection,
  ImpactPreview,
  RewardsSection,
  CTASection,
  Footer,
} from '@/components/landing';

type View = 'landing' | 'app';
type Tab = 'scan' | 'dashboard' | 'about';

const Index = () => {
  const [view, setView] = useState<View>('landing');
  const [activeTab, setActiveTab] = useState<Tab>('scan');
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  // Load user stats on mount
  useEffect(() => {
    getUserStats().then(setUserStats);
  }, []);

  const handleClassification = (result: ClassificationResult) => {
    setClassificationResult(result);
  };

  const handleConfirmClassification = async () => {
    if (!classificationResult || classificationResult.material === 'unknown') return;

    const newStats = await addClassificationPoints(classificationResult.material, false);
    setUserStats(newStats);
    
    toast.success(
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎉</span>
        <div>
          <div className="font-semibold">+10 Eco Points!</div>
          <div className="text-sm opacity-80">
            {classificationResult.material} item recycled
          </div>
        </div>
      </div>
    );
    
    setClassificationResult(null);
  };

  const handleBarcodeResult = async (result: {
    barcode: string;
    productName?: string;
    material?: ClassificationResult['material'];
    recyclingInfo?: string;
  }) => {
    if (result.material && result.material !== 'unknown') {
      const newStats = await addClassificationPoints(result.material, true);
      setUserStats(newStats);
      
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-2xl">📦</span>
          <div>
            <div className="font-semibold">+5 Eco Points!</div>
            <div className="text-sm opacity-80">
              {result.productName || 'Product'} verified
            </div>
          </div>
        </div>
      );
      
      // Show classification result
      setClassificationResult({
        material: result.material,
        confidence: 100,
        allPredictions: [{ material: result.material, confidence: 100 }],
        recyclingGuidance: result.recyclingInfo || '',
      });
    } else {
      toast.info(
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <div>
            <div className="font-semibold">Barcode: {result.barcode}</div>
            <div className="text-sm opacity-80">
              Product not found in database
            </div>
          </div>
        </div>
      );
    }
  };

  const handleStartScanning = () => {
    setView('app');
    setActiveTab('scan');
  };

  const tabs = [
    { id: 'scan' as const, label: 'Scan', icon: Camera },
    { id: 'dashboard' as const, label: 'Impact', icon: BarChart3 },
    { id: 'about' as const, label: 'About', icon: Info },
  ];

  // Landing Page View
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onStartScanning={handleStartScanning} />
        <main>
          <HeroSection onStartScanning={handleStartScanning} />
          <ProblemSection />
          <SolutionSection onTrySample={handleStartScanning} />
          <FeaturesGrid />
          <TechSection />
          <ImpactPreview />
          <RewardsSection />
          <CTASection onStartScanning={handleStartScanning} />
        </main>
        <Footer />
        <PWAInstallPrompt />
      </div>
    );
  }

  // App View
  return (
    <div className="min-h-screen bg-background pb-20">
      <OfflineIndicator />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('landing')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-nature">
                <Recycle className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-display font-bold">EcoSnap</h1>
            </div>
          </div>
          <OnlineStatusBadge />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-display font-bold mb-2">
                  Identify & Recycle
                </h2>
                <p className="text-muted-foreground">
                  Point your camera at an item to identify its material
                </p>
              </div>

              <CameraCapture
                onClassify={handleClassification}
                onScanBarcode={() => setShowBarcodeScanner(true)}
                isClassifying={isClassifying}
                setIsClassifying={setIsClassifying}
              />

              {classificationResult && !isClassifying && (
                <ClassificationDisplay
                  result={classificationResult}
                  isClassifying={isClassifying}
                  onConfirm={handleConfirmClassification}
                  onScanBarcode={() => setShowBarcodeScanner(true)}
                />
              )}
            </motion.div>
          )}

          {activeTab === 'dashboard' && userStats && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-display font-bold mb-2">
                  Your Impact
                </h2>
                <p className="text-muted-foreground">
                  Track your recycling journey and environmental contribution
                </p>
              </div>
              
              <PointsDashboard stats={userStats} />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-nature flex items-center justify-center shadow-glow">
                  <Leaf className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">
                  About EcoSnap
                </h2>
                <p className="text-muted-foreground">
                  Your pocket recycling companion
                </p>
              </div>

              <div className="eco-card p-6 space-y-4">
                <h3 className="font-display font-semibold text-lg">How it works</h3>
                <div className="space-y-3">
                  {[
                    { step: 1, title: 'Point & Capture', desc: 'Aim your camera at any recyclable item' },
                    { step: 2, title: 'AI Classification', desc: 'Our on-device ML identifies the material type' },
                    { step: 3, title: 'Get Guidance', desc: 'Receive recycling instructions for your area' },
                    { step: 4, title: 'Earn Points', desc: 'Track your impact and earn eco-points' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-eco-leaf/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-eco-leaf font-bold text-sm">{item.step}</span>
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="eco-card p-6 space-y-4">
                <h3 className="font-display font-semibold text-lg">Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-eco-leaf">✓</span>
                    Offline-first: Works without internet
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-eco-leaf">✓</span>
                    On-device ML: Privacy-focused classification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-eco-leaf">✓</span>
                    Barcode fallback: Verify with product database
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-eco-leaf">✓</span>
                    Impact tracking: See your environmental contribution
                  </li>
                </ul>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Version 1.0.0 (MVP)</p>
                <p className="mt-1">Built with 💚 for the planet</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                    isActive
                      ? 'text-eco-leaf'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon className={`w-6 h-6 ${isActive ? 'text-eco-leaf' : ''}`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-1 w-1 h-1 rounded-full bg-eco-leaf"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Barcode Scanner Modal */}
      <BarcodeScanner
        isOpen={showBarcodeScanner}
        onClose={() => setShowBarcodeScanner(false)}
        onResult={handleBarcodeResult}
      />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
