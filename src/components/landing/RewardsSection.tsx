import { motion } from 'framer-motion';
import { Gift, Coffee, ShoppingBag, Leaf, Star } from 'lucide-react';

const rewards = [
  {
    partner: 'GreenBean Coffee',
    reward: '15% off any drink',
    requirement: '50 scans',
    icon: Coffee,
    color: 'from-amber-600 to-orange-500',
  },
  {
    partner: 'EcoMart',
    reward: '$5 store credit',
    requirement: '100 scans',
    icon: ShoppingBag,
    color: 'from-eco-leaf to-eco-lime',
  },
  {
    partner: 'PlantShop',
    reward: 'Free mini succulent',
    requirement: '200 scans',
    icon: Leaf,
    color: 'from-eco-forest to-eco-leaf',
  },
];

export const RewardsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Floating Coins Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 12)}%`,
              top: -40,
            }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear',
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
              <Star className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Gift className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-600">Partner Rewards</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Turn Trash Into <span className="eco-gradient-text">Treats</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Earn real rewards from local partners. Every scan brings you closer to free stuff.
          </p>
        </motion.div>

        {/* Rewards Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.partner}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="bg-card rounded-2xl border border-border shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className={`bg-gradient-to-r ${reward.color} p-6 text-white`}>
                  <reward.icon className="w-10 h-10 mb-3" />
                  <h3 className="font-display font-bold text-lg">{reward.partner}</h3>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-xl font-display font-bold mb-2">{reward.reward}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-eco-leaf" />
                    <span>Unlock at {reward.requirement}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${reward.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${30 + index * 20}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">More partners coming soon</p>
          <div className="flex justify-center items-center gap-8 opacity-40">
            {['☕', '🛒', '🌿', '🍕', '📚'].map((emoji, i) => (
              <span key={i} className="text-3xl">{emoji}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
