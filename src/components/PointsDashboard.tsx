import { motion } from 'framer-motion';
import { Leaf, Droplets, Zap, TreePine, Package, Scan, Trophy } from 'lucide-react';
import { UserStats, calculateEnvironmentalImpact } from '@/lib/storage';

interface PointsDashboardProps {
  stats: UserStats;
}

export function PointsDashboard({ stats }: PointsDashboardProps) {
  const impact = calculateEnvironmentalImpact(stats);
  
  const materialBreakdown = [
    { name: 'Plastic', count: stats.plasticItems, color: 'bg-eco-sky', icon: '🧴' },
    { name: 'Paper', count: stats.paperItems, color: 'bg-eco-sand', icon: '📄' },
    { name: 'Metal', count: stats.metalItems, color: 'bg-muted', icon: '🥫' },
    { name: 'Glass', count: stats.glassItems, color: 'bg-eco-leaf', icon: '🍶' },
  ];

  const impactStats = [
    { label: 'CO₂ Saved', value: `${impact.co2Saved} kg`, icon: Leaf, color: 'text-eco-leaf' },
    { label: 'Water Saved', value: `${impact.waterSaved} L`, icon: Droplets, color: 'text-eco-sky' },
    { label: 'Energy Saved', value: `${impact.energySaved} kWh`, icon: Zap, color: 'text-yellow-500' },
    { label: 'Trees Equivalent', value: impact.treesEquivalent, icon: TreePine, color: 'text-eco-forest' },
  ];

  return (
    <div className="space-y-6">
      {/* Total Points Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="eco-card p-6 text-center"
      >
        <Trophy className="w-12 h-12 mx-auto mb-3 text-eco-leaf" />
        <div className="text-5xl font-display font-bold eco-gradient-text mb-2">
          {stats.totalPoints}
        </div>
        <p className="text-muted-foreground">Eco Points</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="eco-card p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-full bg-eco-leaf/10">
            <Package className="w-5 h-5 text-eco-leaf" />
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.itemsRecycled}</div>
            <div className="text-sm text-muted-foreground">Items Recycled</div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="eco-card p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-full bg-eco-earth/10">
            <Scan className="w-5 h-5 text-eco-earth" />
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.barcodeScans}</div>
            <div className="text-sm text-muted-foreground">Barcode Scans</div>
          </div>
        </motion.div>
      </div>

      {/* Material Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="eco-card p-4"
      >
        <h3 className="font-display font-semibold mb-4">Materials Recycled</h3>
        <div className="space-y-3">
          {materialBreakdown.map((material, index) => {
            const total = stats.itemsRecycled || 1;
            const percentage = (material.count / total) * 100;
            
            return (
              <div key={material.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span>{material.icon}</span>
                    {material.name}
                  </span>
                  <span className="font-medium">{material.count}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className={`h-full ${material.color} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Environmental Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="eco-card p-4"
      >
        <h3 className="font-display font-semibold mb-4">Your Environmental Impact</h3>
        <div className="grid grid-cols-2 gap-4">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center p-3 rounded-lg bg-muted/50"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
