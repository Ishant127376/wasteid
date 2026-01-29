import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download, Users, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CTASectionProps {
  onStartScanning: () => void;
}

export const CTASection = ({ onStartScanning }: CTASectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to Make Recycling{' '}
            <span className="text-eco-lime">Rewarding?</span>
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
            Join thousands of eco-warriors making a real difference, one scan at a time.
          </p>

          {/* Email Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
              <Button className="bg-white text-eco-forest hover:bg-white/90 font-semibold px-6">
                Join Waitlist
              </Button>
            </div>
            <p className="text-sm text-white/60 mt-3">
              Get early access and exclusive rewards. No spam, ever.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button
              onClick={onStartScanning}
              size="xl"
              className="bg-white text-eco-forest hover:bg-white/90 group"
            >
              <Camera className="w-5 h-5 mr-2" />
              Open Camera & Scan
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Download className="w-5 h-5 mr-2" />
              Add to Home Screen
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-eco-lime to-eco-leaf border-2 border-eco-forest"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">1,000+ eco-warriors</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <span className="text-sm">🏆 Hackathon Winner 2024</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
