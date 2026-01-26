import { motion } from 'framer-motion';
import { Check, AlertCircle, HelpCircle } from 'lucide-react';
import { ClassificationResult } from '@/lib/classifier';

interface ClassificationDisplayProps {
  result: ClassificationResult | null;
  isClassifying: boolean;
  onConfirm: () => void;
  onScanBarcode: () => void;
}

const materialIcons: Record<string, string> = {
  plastic: '🧴',
  paper: '📄',
  metal: '🥫',
  glass: '🍶',
  unknown: '❓',
};

const materialColors: Record<string, string> = {
  plastic: 'from-eco-sky to-eco-ocean',
  paper: 'from-eco-sand to-eco-earth',
  metal: 'from-gray-400 to-gray-600',
  glass: 'from-eco-leaf to-eco-forest',
  unknown: 'from-muted to-muted-foreground',
};

export function ClassificationDisplay({
  result,
  isClassifying,
  onConfirm,
  onScanBarcode,
}: ClassificationDisplayProps) {
  if (isClassifying) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="eco-card p-6 text-center"
      >
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full eco-scanner-ring animate-spin-slow" />
          <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
            <span className="text-3xl animate-pulse">🔍</span>
          </div>
        </div>
        <p className="text-muted-foreground">Analyzing material...</p>
      </motion.div>
    );
  }

  if (!result) return null;

  const isLowConfidence = result.confidence < 70;
  const icon = materialIcons[result.material];
  const gradient = materialColors[result.material];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="eco-card overflow-hidden"
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${gradient} p-6 text-primary-foreground`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="text-2xl font-display font-bold capitalize">
              {result.material === 'unknown' ? 'Unknown Material' : result.material}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{result.confidence}%</div>
            <div className="text-sm opacity-80">Confidence</div>
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          {isLowConfidence ? (
            <AlertCircle className="w-4 h-4 text-yellow-500" />
          ) : (
            <Check className="w-4 h-4 text-eco-leaf" />
          )}
          <span className="text-sm font-medium">
            {isLowConfidence ? 'Low confidence - consider barcode scan' : 'High confidence result'}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`h-full rounded-full ${
              isLowConfidence ? 'bg-yellow-500' : 'bg-eco-leaf'
            }`}
          />
        </div>
      </div>

      {/* All Predictions */}
      <div className="px-6 py-4 border-b border-border">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          All Predictions
        </h4>
        <div className="space-y-2">
          {result.allPredictions.map((pred) => (
            <div key={pred.material} className="flex items-center gap-2">
              <span className="text-lg">{materialIcons[pred.material]}</span>
              <span className="flex-1 capitalize text-sm">{pred.material}</span>
              <span className="text-sm text-muted-foreground">
                {pred.confidence.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recycling Guidance */}
      <div className="px-6 py-4 bg-muted/30">
        <h4 className="text-sm font-semibold mb-2">Recycling Guidance</h4>
        <p className="text-sm text-muted-foreground">{result.recyclingGuidance}</p>
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="flex-1 py-3 px-4 rounded-lg eco-button-primary font-medium"
          disabled={result.material === 'unknown'}
        >
          Confirm & Earn Points
        </motion.button>
        {isLowConfidence && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onScanBarcode}
            className="py-3 px-4 rounded-lg border-2 border-eco-earth text-eco-earth font-medium hover:bg-eco-earth hover:text-primary-foreground transition-colors"
          >
            Scan Barcode
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
