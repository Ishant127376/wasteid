import { motion } from 'framer-motion';
import { TrendingUp, Leaf, Droplets, Zap, Recycle } from 'lucide-react';

const stats = [
  { label: 'Items Scanned', value: '127', icon: Recycle, color: 'text-eco-leaf' },
  { label: 'CO₂ Saved', value: '45kg', icon: Leaf, color: 'text-eco-forest' },
  { label: 'Water Saved', value: '890L', icon: Droplets, color: 'text-eco-sky' },
  { label: 'Energy Saved', value: '23kWh', icon: Zap, color: 'text-amber-500' },
];

const weeklyData = [
  { day: 'Mon', value: 12 },
  { day: 'Tue', value: 8 },
  { day: 'Wed', value: 15 },
  { day: 'Thu', value: 6 },
  { day: 'Fri', value: 18 },
  { day: 'Sat', value: 22 },
  { day: 'Sun', value: 14 },
];

export const ImpactPreview = () => {
  const maxValue = Math.max(...weeklyData.map(d => d.value));

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
            See Your <span className="eco-gradient-text">Real Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track every item you recycle and watch your environmental contribution grow.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-hero p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Your Eco Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold">890</span>
                    <span className="text-white/80">points</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+12% this week</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-muted/50 rounded-xl p-4 text-center"
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-display font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Weekly Chart */}
            <div className="px-6 pb-6">
              <div className="bg-muted/30 rounded-xl p-6">
                <h4 className="font-display font-semibold mb-4">Weekly Activity</h4>
                <div className="flex items-end justify-between gap-2 h-32">
                  {weeklyData.map((day, index) => (
                    <motion.div
                      key={day.day}
                      className="flex-1 flex flex-col items-center gap-2"
                      initial={{ height: 0 }}
                      whileInView={{ height: 'auto' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    >
                      <motion.div
                        className="w-full bg-gradient-to-t from-eco-leaf to-eco-lime rounded-t-lg"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(day.value / maxValue) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                        style={{ minHeight: 8 }}
                      />
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
