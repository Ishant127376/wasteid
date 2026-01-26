// Mock ML Classifier for EcoSnap
// In production, this would use TensorFlow.js with a real model

export interface ClassificationResult {
  material: 'plastic' | 'paper' | 'metal' | 'glass' | 'unknown';
  confidence: number;
  allPredictions: {
    material: string;
    confidence: number;
  }[];
  recyclingGuidance: string;
}

// Simulated model that analyzes image data
export async function classifyMaterial(imageData: ImageData | null): Promise<ClassificationResult> {
  // Simulate ML processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock classification based on random + some image analysis simulation
  const materials: ('plastic' | 'paper' | 'metal' | 'glass')[] = ['plastic', 'paper', 'metal', 'glass'];
  
  // Generate mock predictions with varying confidence
  const randomBase = Math.random();
  const predictions = materials.map((material, index) => {
    // Create somewhat realistic distribution
    const baseConfidence = index === 0 ? 0.5 + randomBase * 0.4 : 0.1 + Math.random() * 0.3;
    return {
      material,
      confidence: baseConfidence,
    };
  });
  
  // Normalize to sum to 1
  const total = predictions.reduce((sum, p) => sum + p.confidence, 0);
  predictions.forEach(p => {
    p.confidence = (p.confidence / total) * 100;
  });
  
  // Sort by confidence
  predictions.sort((a, b) => b.confidence - a.confidence);
  
  const topPrediction = predictions[0];
  const material = topPrediction.confidence > 30 
    ? topPrediction.material as ClassificationResult['material']
    : 'unknown';
  
  return {
    material,
    confidence: Math.round(topPrediction.confidence),
    allPredictions: predictions,
    recyclingGuidance: getRecyclingGuidance(material),
  };
}

function getRecyclingGuidance(material: ClassificationResult['material']): string {
  const guidance: Record<string, string> = {
    plastic: '♻️ Rinse container, remove caps and labels. Check for recycling symbol #1-7. Place in plastics bin.',
    paper: '📄 Keep dry and clean. Remove any plastic windows or coatings. Flatten boxes before recycling.',
    metal: '🥫 Rinse cans thoroughly. Labels can stay on. Crush if possible to save space.',
    glass: '🍶 Rinse container. Remove lids and corks. Sort by color if required locally.',
    unknown: '❓ Unable to classify. Try scanning the barcode for accurate identification.',
  };
  return guidance[material];
}

// Barcode-based material lookup using Open Food Facts
export async function lookupBarcode(barcode: string): Promise<{
  found: boolean;
  productName?: string;
  material?: ClassificationResult['material'];
  packaging?: string;
  recyclingInfo?: string;
}> {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = await response.json();
    
    if (data.status === 1 && data.product) {
      const product = data.product;
      const packaging = product.packaging || product.packaging_tags?.join(', ') || '';
      
      // Determine material from packaging info
      let material: ClassificationResult['material'] = 'unknown';
      const packagingLower = packaging.toLowerCase();
      
      if (packagingLower.includes('plastic') || packagingLower.includes('pet') || packagingLower.includes('hdpe')) {
        material = 'plastic';
      } else if (packagingLower.includes('paper') || packagingLower.includes('cardboard') || packagingLower.includes('carton')) {
        material = 'paper';
      } else if (packagingLower.includes('metal') || packagingLower.includes('alumin') || packagingLower.includes('steel') || packagingLower.includes('tin')) {
        material = 'metal';
      } else if (packagingLower.includes('glass')) {
        material = 'glass';
      }
      
      return {
        found: true,
        productName: product.product_name || 'Unknown Product',
        material,
        packaging,
        recyclingInfo: getRecyclingGuidance(material),
      };
    }
    
    return { found: false };
  } catch (error) {
    console.error('Barcode lookup failed:', error);
    return { found: false };
  }
}
