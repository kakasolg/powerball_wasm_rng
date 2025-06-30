/**
 * 🚀 Powerball Superposition - Quantum Number Generation Engine
 * Simplified WebCrypto-based random number generator without WASM dependency
 */

class QuantumEngine {
    constructor() {
        this.isInitialized = false;
        this.generationHistory = [];
        this.entropyQuality = 99.7;
        this.lastGenerationTime = null;
        
        // Initialize the engine
        this.initialize();
    }

    /**
     * Initialize the quantum engine
     */
    async initialize() {
        try {
            // Test WebCrypto API availability
            if (!window.crypto || !window.crypto.getRandomValues) {
                throw new Error('WebCrypto API not available');
            }

            // Test crypto functionality
            const testArray = new Uint32Array(1);
            crypto.getRandomValues(testArray);
            
            this.isInitialized = true;
            console.log('🚀 Quantum Engine initialized successfully');
            
        } catch (error) {
            console.error('❌ Quantum Engine initialization failed:', error);
            this.isInitialized = false;
        }
    }

    /**
     * Generate WebCrypto-based hardware entropy
     * @returns {number} High-quality random seed
     */
    async getWebCryptoEntropy() {
        const cryptoArray = new Uint32Array(4);
        crypto.getRandomValues(cryptoArray);
        
        // Combine multiple crypto values with bit operations
        const entropy = cryptoArray.reduce((acc, val, index) => {
            return acc ^ (val << (index * 8));
        }, 0);
        
        return Math.abs(entropy);
    }

    /**
     * Generate browser context entropy
     * @returns {number} Context-based entropy
     */
    getBrowserEntropy() {
        const factors = [
            navigator.hardwareConcurrency || 4,
            navigator.deviceMemory || 8,
            screen.width * screen.height,
            Date.now() % 1000000,
            Math.floor(Math.random() * 1000000),
            performance.now() % 1000000,
            navigator.maxTouchPoints || 0,
            window.devicePixelRatio * 1000 || 1000
        ];
        
        return factors.reduce((acc, val, index) => {
            return acc ^ (Math.floor(val) << (index % 16));
        }, 0);
    }

    /**
     * Generate high-resolution timestamp entropy
     * @returns {number} Time-based entropy
     */
    getTimestampEntropy() {
        const now = performance.now();
        const highRes = now * 1000000;
        const microSeconds = Math.floor(highRes) % 0xFFFFFFFF;
        
        // Add some date-based entropy
        const date = new Date();
        const dateEntropy = (
            date.getMilliseconds() * 1000 +
            date.getSeconds() * 100 +
            date.getMinutes() * 10 +
            date.getHours()
        );
        
        return microSeconds ^ dateEntropy;
    }

    /**
     * Generate user interaction entropy
     * @returns {number} Interaction-based entropy
     */
    getInteractionEntropy() {
        // Simple interaction entropy based on current state
        const mouse = {
            x: window.lastMouseX || Math.random() * 1000,
            y: window.lastMouseY || Math.random() * 1000
        };
        
        const scroll = {
            x: window.scrollX || 0,
            y: window.scrollY || 0
        };
        
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        return Math.floor(
            (mouse.x * mouse.y) + 
            (scroll.x * scroll.y) + 
            (viewport.width * viewport.height)
        ) % 0xFFFFFFFF;
    }

    /**
     * Generate ultimate hybrid entropy seed
     * @returns {Promise<number>} High-quality entropy seed
     */
    async generateUltimateEntropy() {
        const [
            webCryptoEntropy,
            browserEntropy,
            timestampEntropy,
            interactionEntropy
        ] = await Promise.all([
            this.getWebCryptoEntropy(),
            this.getBrowserEntropy(),
            this.getTimestampEntropy(),
            this.getInteractionEntropy()
        ]);

        // Combine all entropy sources with XOR and bit shifting
        const hybridSeed = (
            webCryptoEntropy ^ 
            (browserEntropy << 8) ^ 
            (timestampEntropy << 16) ^ 
            (interactionEntropy << 24)
        ) >>> 0; // Ensure unsigned 32-bit

        // Log entropy sources for debugging (remove in production)
        console.log('🔬 Entropy Sources:', {
            webCrypto: webCryptoEntropy,
            browser: browserEntropy,
            timestamp: timestampEntropy,
            interaction: interactionEntropy,
            hybrid: hybridSeed
        });

        return hybridSeed;
    }

    /**
     * Generate a quantum random number in range
     * @param {number} min - Minimum value (inclusive)
     * @param {number} max - Maximum value (inclusive)
     * @param {number} seed - Optional entropy seed
     * @returns {Promise<number>} Random number in range
     */
    async generateQuantumRandom(min, max, seed = null) {
        if (!this.isInitialized) {
            throw new Error('Quantum Engine not initialized');
        }

        const entropy = seed || await this.generateUltimateEntropy();
        
        // Use the entropy as seed for additional randomization
        const cryptoArray = new Uint32Array(1);
        crypto.getRandomValues(cryptoArray);
        
        // Combine entropy with fresh crypto random
        const combined = (entropy ^ cryptoArray[0]) >>> 0;
        const normalized = combined / 0xFFFFFFFF;
        
        // Generate number in range
        const range = max - min + 1;
        const result = min + Math.floor(normalized * range);
        
        return Math.min(Math.max(result, min), max);
    }

    /**
     * Generate a unique set of numbers (no duplicates)
     * @param {number} count - How many numbers to generate
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {Promise<number[]>} Array of unique numbers
     */
    async generateUniqueNumbers(count, min, max) {
        const numbers = new Set();
        const maxAttempts = (max - min + 1) * 2; // Prevent infinite loops
        let attempts = 0;

        while (numbers.size < count && attempts < maxAttempts) {
            const num = await this.generateQuantumRandom(min, max);
            numbers.add(num);
            attempts++;
        }

        if (numbers.size < count) {
            throw new Error('Cannot generate enough unique numbers in range');
        }

        return Array.from(numbers).sort((a, b) => a - b);
    }

    /**
     * Generate Powerball numbers
     * @returns {Promise<Object>} Generated numbers object
     */
    async generatePowerballNumbers() {
        if (!this.isInitialized) {
            throw new Error('Quantum Engine not initialized');
        }

        const startTime = performance.now();
        
        // Generate 5 main numbers (1-69)
        const mainNumbers = await this.generateUniqueNumbers(5, 1, 69);
        
        // Generate Powerball (1-26)
        const powerball = await this.generateQuantumRandom(1, 26);
        
        const endTime = performance.now();
        const generationTime = endTime - startTime;
        
        // Calculate some fun "quantum" metrics
        const universesScannedsimulation = Math.floor(Math.random() * 3000) + 1000;
        const qubitHours = (Math.random() * 5 + 1).toFixed(1);
        const coherenceTime = (Math.random() * 10 + 5).toFixed(2);
        
        const result = {
            mainNumbers,
            powerball,
            metadata: {
                generationTime: generationTime.toFixed(2),
                universesSanned: universesScannedsimulation,
                qubitHours: parseFloat(qubitHours),
                coherenceTime: parseFloat(coherenceTime),
                entropyQuality: this.entropyQuality,
                timestamp: new Date().toISOString(),
                engineVersion: '1.0.0'
            }
        };
        
        // Store in history
        this.generationHistory.push(result);
        this.lastGenerationTime = Date.now();
        
        console.log('🎯 Quantum Numbers Generated:', result);
        
        return result;
    }

    /**
     * Get generation statistics
     * @returns {Object} Engine statistics
     */
    getStatistics() {
        return {
            totalGenerations: this.generationHistory.length,
            lastGenerationTime: this.lastGenerationTime,
            entropyQuality: this.entropyQuality,
            isInitialized: this.isInitialized,
            averageGenerationTime: this.generationHistory.length > 0 
                ? this.generationHistory.reduce((sum, gen) => 
                    sum + parseFloat(gen.metadata.generationTime), 0) / this.generationHistory.length
                : 0
        };
    }

    /**
     * Clear generation history
     */
    clearHistory() {
        this.generationHistory = [];
        console.log('🧹 Generation history cleared');
    }

    /**
     * Test the quantum engine
     * @returns {Promise<Object>} Test results
     */
    async runDiagnostics() {
        console.log('🔬 Running Quantum Engine Diagnostics...');
        
        const diagnostics = {
            webCryptoAvailable: !!(window.crypto && window.crypto.getRandomValues),
            initializationStatus: this.isInitialized,
            entropyQuality: this.entropyQuality,
            testGeneration: null,
            performance: null
        };
        
        if (this.isInitialized) {
            try {
                const startTime = performance.now();
                const testNumbers = await this.generatePowerballNumbers();
                const endTime = performance.now();
                
                diagnostics.testGeneration = testNumbers;
                diagnostics.performance = {
                    generationTime: endTime - startTime,
                    status: 'PASS'
                };
                
                console.log('✅ Diagnostics completed successfully');
            } catch (error) {
                diagnostics.performance = {
                    error: error.message,
                    status: 'FAIL'
                };
                console.error('❌ Diagnostics failed:', error);
            }
        }
        
        return diagnostics;
    }
}

// Export for use in other modules
window.QuantumEngine = QuantumEngine;

// Initialize global instance
window.quantumEngine = new QuantumEngine();

// Track mouse movement for interaction entropy
window.lastMouseX = 0;
window.lastMouseY = 0;

document.addEventListener('mousemove', (e) => {
    window.lastMouseX = e.clientX;
    window.lastMouseY = e.clientY;
});

console.log('⚛️ Quantum Engine module loaded');