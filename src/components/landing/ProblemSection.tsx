import { motion } from 'framer-motion';
import { AlertTriangle, HelpCircle, Gift, WifiOff } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Contamination',
    description: 'One wrong item ruins the entire batch. Most recyclables end up in landfills.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: HelpCircle,
    title: 'Confusion',
    description: 'Which plastics are actually recyclable? Rules vary by location and change constantly.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Gift,
    title: 'No Motivation',
    description: "Why bother when there's no reward? Good intentions fade without positive reinforcement.",
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: WifiOff,
    title: 'Offline Gaps',
    description: "Apps that need Wi-Fi don't work in kitchens. You need answers in the moment.",
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
];

export const ProblemSection = () => {
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
            Why Recycling Feels{' '}
            <span className="text-muted-foreground line-through">Broken</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The current recycling experience is frustrating. Here's what we're fixing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-card transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl ${problem.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <problem.icon className={`w-7 h-7 ${problem.color}`} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
