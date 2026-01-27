import { motion } from 'framer-motion';
import { Target, WifiOff, Gift, BarChart3, MapPin, Barcode } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Instant AI Recognition',
    description: 'TensorFlow.js-powered classification identifies materials in under 100ms',
    gradient: 'from-eco-leaf to-eco-lime',
    size: 'large',
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    description: 'Full functionality without internet. Perfect for kitchens and recycling bins.',
    gradient: 'from-eco-sky to-eco-ocean',
    size: 'small',
  },
  {
    icon: Gift,
    title: 'Earn Real Rewards',
    description: 'Collect eco-points and redeem at partner cafes for discounts.',
    gradient: 'from-amber-500 to-orange-500',
    size: 'small',
  },
  {
    icon: BarChart3,
    title: 'Track Your Impact',
    description: 'Visualize CO₂ saved, items recycled, and your environmental contribution.',
    gradient: 'from-eco-forest to-eco-leaf',
    size: 'large',
  },
  {
    icon: MapPin,
    title: 'Local Recycling Rules',
    description: 'Get location-specific guidance based on your city\'s recycling program.',
    gradient: 'from-purple-500 to-pink-500',
    size: 'small',
  },
  {
    icon: Barcode,
    title: 'Barcode Scanner Backup',
    description: 'When AI isn\'t confident, scan the barcode for verified product data.',
    gradient: 'from-eco-earth to-amber-600',
    size: 'small',
  },
];

export const FeaturesGrid = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Everything You Need to{' '}
            <span className="eco-gradient-text">Recycle Right</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make sustainable choices effortless.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-card transition-all duration-300 ${
                feature.size === 'large' ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Gradient Glow on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-display font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
