import { motion } from 'framer-motion';
import { Play, Smartphone, Sparkles, Leaf, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartScanning: () => void;
}

export const HeroSection = ({ onStartScanning }: HeroSectionProps) => {
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
              onClick={onStartScanning}
              variant="eco"
              size="xl"
              className="group"
            >
              <Smartphone className="w-5 h-5 mr-2 group-hover:animate-bounce-subtle" />
              Start Scanning Now
            </Button>
            <Button
              variant="eco-outline"
              size="xl"
              className="group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto w-64 md:w-80">
              {/* Phone Frame */}
              <div className="relative bg-foreground/90 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground/90 rounded-full z-10" />
                  
                  {/* Screen Content */}
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
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 blur-3xl bg-eco-leaf/20 rounded-full scale-75" />
            </div>
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
