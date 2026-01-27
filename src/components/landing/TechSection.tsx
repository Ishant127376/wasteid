import { motion } from 'framer-motion';
import { Smartphone, Cloud, Database, Cpu, Zap, Shield } from 'lucide-react';

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'TensorFlow.js', icon: '🧠' },
  { name: 'PWA', icon: '📱' },
  { name: 'IndexedDB', icon: '💾' },
];

export const TechSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-eco-forest/20 to-transparent" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-eco-leaf text-xs font-mono"
            style={{
              left: `${(i % 10) * 10 + 5}%`,
              top: -20,
            }}
            animate={{
              y: ['0vh', '100vh'],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            {['01', '10', '♻️', '🌱', '00', '11'][Math.floor(Math.random() * 6)]}
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
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Powered by{' '}
            <span className="eco-gradient-text">Cutting-Edge Tech</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with modern technologies for speed, privacy, and reliability.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Phone */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 mx-auto rounded-2xl bg-gradient-nature flex items-center justify-center mb-4 shadow-glow"
                >
                  <Smartphone className="w-12 h-12 text-white" />
                </motion.div>
                <h4 className="font-display font-semibold mb-1">Your Device</h4>
                <p className="text-sm text-muted-foreground">Edge AI Processing</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="px-2 py-1 bg-eco-leaf/10 text-eco-leaf text-xs rounded-full">Camera API</span>
                  <span className="px-2 py-1 bg-eco-leaf/10 text-eco-leaf text-xs rounded-full">TF.js</span>
                </div>
              </div>

              {/* Connection */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden md:flex items-center gap-2"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-eco-leaf to-transparent" />
                  <Zap className="w-5 h-5 text-eco-leaf" />
                  <div className="h-px w-16 bg-gradient-to-l from-eco-leaf to-transparent" />
                </motion.div>
                
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <Cpu className="w-6 h-6 text-eco-leaf mb-1" />
                    <span className="text-xs text-muted-foreground">Local ML</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Shield className="w-6 h-6 text-eco-leaf mb-1" />
                    <span className="text-xs text-muted-foreground">Private</span>
                  </div>
                </div>
              </div>

              {/* Cloud (Optional) */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-eco-sky to-eco-ocean flex items-center justify-center mb-4"
                >
                  <Cloud className="w-12 h-12 text-white" />
                </motion.div>
                <h4 className="font-display font-semibold mb-1">Cloud Backup</h4>
                <p className="text-sm text-muted-foreground">Barcode Verification</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="px-2 py-1 bg-eco-sky/10 text-eco-sky text-xs rounded-full">Open Food Facts</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-soft"
            >
              <span className="text-xl">{tech.icon}</span>
              <span className="font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
