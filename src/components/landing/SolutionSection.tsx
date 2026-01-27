import { motion } from 'framer-motion';
import { Camera, Cpu, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={onTrySample}
            variant="eco"
            size="xl"
            className="group"
          >
            Try Sample Scan
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
