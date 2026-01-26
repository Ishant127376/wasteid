declare module 'quagga' {
  interface QuaggaConfig {
    inputStream?: {
      type?: string;
      target?: HTMLElement;
      constraints?: {
        facingMode?: string;
        width?: { min?: number };
        height?: { min?: number };
      };
    };
    decoder?: {
      readers?: string[];
    };
    locate?: boolean;
    locator?: {
      patchSize?: string;
      halfSample?: boolean;
    };
  }

  interface QuaggaResult {
    codeResult: {
      code: string;
      format: string;
    };
  }

  interface Quagga {
    init(config: QuaggaConfig, callback: (err: Error | null) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (result: QuaggaResult) => void): void;
    offDetected(callback: (result: QuaggaResult) => void): void;
    decodeSingle(config: QuaggaConfig, callback: (result: QuaggaResult | null) => void): void;
  }

  const Quagga: Quagga;
  export default Quagga;
}
