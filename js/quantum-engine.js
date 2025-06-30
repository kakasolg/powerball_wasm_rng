/**
 * ⚛️ Quantum Engine - WebCrypto-based Random Number Generator
 * Powerball Superposition - Scientific-grade randomness with quantum humor
 */

class QuantumEngine {
    constructor() {
        this.entropyQuality = 0;
        this.webCryptoSupported = this.checkWebCryptoSupport();
        this.quantumState = 'coherent';
        this.lastGeneratedNumbers = null;
        this.generationCount = 0;
        
        console.log('⚛️ Quantum Engine initializing...');
        this.initializeQuantumComputer();
    }

    /**
     * Check if WebCrypto API is supported
     */
    checkWebCryptoSupport() {
        if (!window.crypto || !window.crypto.getRandomValues) {
            console.warn('⚠️ WebCrypto not supported, falling back to Math.random()');
            return false;
        }
        console.log('✅ WebCrypto API supported - hardware entropy available');
        return true;
    }

    /**
     * Initialize the quantum computer (with humor)
     */
    async initializeQuantumComputer() {
        console.log('🔬 Initializing quantum computer...');
        console.log('⚛️ Calibrating qubits...');
        console.log('🌀 Enabling quantum superposition...');
        console.log('📡 Connecting to multiverse...');
        
        // Simulate initialization delay for dramatic effect
        await this.sleep(1000);
        
        this.quantumState = 'superposition';
        console.log('✅ Quantum computer online! Ready for number generation.');
    }

    /**
     * Generate WebCrypto hardware entropy
     */
    async getWebCryptoEntropy() {
        if (!this.webCryptoSupported) {
            // Fallback to Math.random() with timestamp mixing
            const fallback = Math.random() * Date.now() * Math.random();
            return new Uint32Array([fallback * 0xFFFFFFFF]);
        }

        try {
            // Generate cryptographically secure random bytes
            const randomBytes = new Uint8Array(32);
            window.crypto.getRandomValues(randomBytes);
            
            // Convert to Uint32Array for easier handling
            const uint32Array = new Uint32Array(randomBytes.buffer);
            return uint32Array;
        } catch (error) {
            console.error('❌ WebCrypto entropy generation failed:', error);
            // Fallback to timestamp-based entropy
            return new Uint32Array([Date.now() * Math.random() * 0xFFFFFFFF]);
        }
    }

    /**
     * Get browser environment entropy
     */
    getBrowserEntropy() {
        const entropy = {
            timestamp: performance.now(),
            userAgent: navigator.userAgent.length,
            screen: screen.width * screen.height,
            timezone: new Date().getTimezoneOffset(),
            language: navigator.language.length,
            memory: navigator.deviceMemory || 4,
            cores: navigator.hardwareConcurrency || 4,
            battery: navigator.getBattery ? 1 : 0
        };

        // Mix all entropy sources
        let mixed = 0;
        Object.values(entropy).forEach(val => {
            mixed ^= val * 0x9E3779B9; // Golden ratio multiplier
        });

        return mixed >>> 0; // Convert to unsigned 32-bit
    }

    /**
     * Get high-resolution timestamp entropy
     */
    getTimestampEntropy() {
        const now = performance.now();
        const micro = (now * 1000) % 1000; // Microsecond precision
        const nano = (now * 1000000) % 1000; // Simulated nanosecond
        
        return ((micro * 1000 + nano) * 0x9E3779B9) >>> 0;
    }

    /**
     * Get user interaction entropy (mouse, touch, etc.)
     */
    getInteractionEntropy() {
        // Use mouse position, click timing, etc.
        const mouseX = window.lastMouseX || Math.random() * window.innerWidth;
        const mouseY = window.lastMouseY || Math.random() * window.innerHeight;
        const clickTime = window.lastClickTime || Date.now();
        
        const interaction = (mouseX * mouseY * clickTime) % 0xFFFFFFFF;
        return interaction >>> 0;
    }

    /**
     * Generate ultimate hybrid entropy
     */
    async generateUltimateEntropy() {
        console.log('🔥 Generating hybrid quantum entropy...');
        
        const webCryptoEntropy = await this.getWebCryptoEntropy();
        const browserEntropy = this.getBrowserEntropy();
        const timestampEntropy = this.getTimestampEntropy();
        const interactionEntropy = this.getInteractionEntropy();

        // Mix all entropy sources using XOR and bit rotation
        let ultimateSeed = webCryptoEntropy[0];
        ultimateSeed ^= browserEntropy;
        ultimateSeed ^= timestampEntropy;
        ultimateSeed ^= interactionEntropy;
        
        // Additional mixing with rotation
        ultimateSeed = ((ultimateSeed << 13) | (ultimateSeed >>> 19)) ^ 0x9E3779B9;
        ultimateSeed = ((ultimateSeed << 17) | (ultimateSeed >>> 15)) ^ 0x6C078965;
        ultimateSeed = ((ultimateSeed << 5) | (ultimateSeed >>> 27)) ^ 0xB5297A4D;

        // Calculate entropy quality (0-100)
        this.entropyQuality = this.calculateEntropyQuality(webCryptoEntropy, browserEntropy, timestampEntropy, interactionEntropy);

        console.log(`📊 Entropy Quality: ${this.entropyQuality.toFixed(1)}%`);
        console.log(`🚀 Ultimate Seed: 0x${ultimateSeed.toString(16).toUpperCase()}`);

        return ultimateSeed >>> 0; // Ensure unsigned 32-bit
    }

    /**
     * Calculate entropy quality score
     */
    calculateEntropyQuality(webCrypto, browser, timestamp, interaction) {
        let quality = 50; // Base quality

        // WebCrypto bonus (major factor)
        if (this.webCryptoSupported && webCrypto.length > 0) {
            quality += 30;
        }

        // Browser entropy bonus
        if (browser > 0) {
            quality += 10;
        }

        // Timestamp precision bonus
        if (timestamp > 0) {
            quality += 5;
        }

        // Interaction entropy bonus
        if (interaction > 0) {
            quality += 5;
        }

        // Randomness test (simple)
        const combined = webCrypto[0] ^ browser ^ timestamp ^ interaction;
        const bits = combined.toString(2);
        const ones = (bits.match(/1/g) || []).length;
        const zeros = bits.length - ones;
        const balance = 1 - Math.abs(ones - zeros) / bits.length;
        quality = Math.min(100, quality * balance);

        return quality;
    }

    /**
     * Linear Congruential Generator (LCG) for deterministic randomness
     */
    lcgRandom(seed) {
        const a = 1664525;
        const c = 1013904223;
        const m = Math.pow(2, 32);
        
        this.lcgSeed = ((a * (seed || this.lcgSeed || 1)) + c) % m;
        return this.lcgSeed / m;
    }

    /**
     * Generate a random number within range using quantum entropy
     */
    async generateQuantumRandom(min, max, seed = null) {
        if (seed === null) {
            seed = await this.generateUltimateEntropy();
        }

        // Use quantum entropy for better randomness
        const random = this.lcgRandom(seed);
        const result = Math.floor(random * (max - min + 1)) + min;
        
        console.log(`🎲 Quantum random [${min}-${max}]: ${result}`);
        return result;
    }

    /**
     * Generate unique numbers (no duplicates)
     */
    async generateUniqueNumbers(count, min, max) {
        const numbers = new Set();
        const maxAttempts = (max - min + 1) * 2; // Prevent infinite loops
        let attempts = 0;

        console.log(`🎯 Generating ${count} unique numbers [${min}-${max}]...`);

        while (numbers.size < count && attempts < maxAttempts) {
            const seed = await this.generateUltimateEntropy();
            const number = await this.generateQuantumRandom(min, max, seed);
            numbers.add(number);
            attempts++;
            
            // Small delay for dramatic effect and entropy variation
            if (numbers.size < count) {
                await this.sleep(50);
            }
        }

        if (numbers.size < count) {
            throw new Error(`⚠️ Could not generate ${count} unique numbers in range [${min}-${max}]`);
        }

        const result = Array.from(numbers).sort((a, b) => a - b);
        console.log(`✅ Generated unique numbers: [${result.join(', ')}]`);
        return result;
    }

    /**
     * Generate a complete Powerball number set
     */
    async generatePowerballNumbers() {
        console.log('🎯 Generating Powerball numbers...');
        console.log('⚛️ Entering quantum superposition...');
        
        this.generationCount++;
        
        try {
            // Generate 5 main numbers (1-69)
            const mainNumbers = await this.generateUniqueNumbers(5, 1, 69);
            
            // Generate Powerball number (1-26)
            console.log('🔴 Generating Powerball number...');
            const powerball = await this.generateQuantumRandom(1, 26);

            const result = {
                mainNumbers: mainNumbers,
                powerball: powerball,
                entropyQuality: this.entropyQuality,
                quantumState: this.quantumState,
                generationId: this.generationCount,
                timestamp: new Date().toISOString(),
                universeId: Math.floor(Math.random() * 9999) + 1 // For humor
            };

            this.lastGeneratedNumbers = result;
            
            console.log('✅ Powerball numbers generated successfully!');
            console.log(`📊 Main Numbers: [${mainNumbers.join(', ')}]`);
            console.log(`🔴 Powerball: ${powerball}`);
            console.log(`⚛️ Generated in universe #${result.universeId}`);
            
            return result;
            
        } catch (error) {
            console.error('❌ Quantum generation failed:', error);
            this.quantumState = 'decoherent';
            throw error;
        }
    }

    /**
     * Get quantum status information
     */
    getQuantumStatus() {
        return {
            quantumState: this.quantumState,
            entropyQuality: this.entropyQuality,
            webCryptoSupported: this.webCryptoSupported,
            generationCount: this.generationCount,
            lastGenerated: this.lastGeneratedNumbers?.timestamp || null
        };
    }

    /**
     * Reset quantum computer
     */
    async resetQuantumComputer() {
        console.log('🔄 Resetting quantum computer...');
        this.quantumState = 'coherent';
        this.entropyQuality = 0;
        this.lastGeneratedNumbers = null;
        this.lcgSeed = null;
        
        await this.initializeQuantumComputer();
        console.log('✅ Quantum computer reset complete!');
    }

    /**
     * Utility: Sleep function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get random quantum excuse message
     */
    getQuantumExcuse() {
        const excuses = [
            "🔬 Qubits are entangled... untangling in progress...",
            "⚛️ Heisenberg Uncertainty Principle causing delays",
            "🌀 Numbers quantum tunneled to another dimension. Retrieving...",
            "📡 Waiting for Schrödinger's cat to open the box...",
            "🎭 Scanning 2,847 parallel universes for optimal numbers",
            "🤖 Teaching AI the uncertainty principle...",
            "🧠 Quantum computer caught in infinite loop... debugging...",
            "🌌 Multiverse bandwidth congestion detected",
            "⚡ Quantum coherence at 47.3%... recalibrating...",
            "🔋 Charging quantum batteries with cosmic rays...",
            "🎯 Numbers are social distancing in quantum space",
            "🎪 Quantum circus in town - numbers performing tricks",
            "🎨 Painting numbers with quantum brushes...",
            "🎵 Numbers humming quantum melodies...",
            "🎲 Dice rolling in 11 dimensions simultaneously..."
        ];

        return excuses[Math.floor(Math.random() * excuses.length)];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumEngine;
} else {
    window.QuantumEngine = QuantumEngine;
}

console.log('⚛️ Quantum Engine loaded successfully!');