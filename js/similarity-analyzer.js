/**
 * 🔍 Similarity Analyzer - Quantum Number Pattern Recognition
 * Powerball Superposition - Analyzing cosmic number patterns
 */

class SimilarityAnalyzer {
    constructor() {
        this.analysisHistory = [];
        this.patternDatabase = new Map();
        this.quantumPatterns = new Set();
        this.cosmicSignatures = [];
        
        console.log('🔍 Similarity Analyzer initializing...');
        console.log('📊 Loading pattern recognition algorithms...');
        this.initializeAnalyzer();
    }

    /**
     * Initialize the analyzer with cosmic patterns
     */
    initializeAnalyzer() {
        this.loadCosmicPatterns();
        this.loadQuantumSequences();
        this.initializePatternDatabase();
        console.log('🧠 Pattern recognition neural networks online!');
        console.log('🌌 Cosmic pattern database loaded successfully!');
    }

    /**
     * Load cosmic mathematical patterns
     */
    loadCosmicPatterns() {
        this.cosmicSignatures = [
            { name: 'Fibonacci', sequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55] },
            { name: 'Prime Numbers', sequence: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29] },
            { name: 'Perfect Squares', sequence: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100] },
            { name: 'Triangular Numbers', sequence: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55] },
            { name: 'Powers of 2', sequence: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512] },
            { name: 'Catalan Numbers', sequence: [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862] },
            { name: 'Lucky Numbers', sequence: [1, 3, 7, 9, 13, 15, 21, 25, 31, 33] },
            { name: 'Happy Numbers', sequence: [1, 7, 10, 13, 19, 23, 28, 31, 32, 44] }
        ];
        console.log('🌟 Cosmic mathematical signatures loaded!');
    }

    /**
     * Load quantum number sequences
     */
    loadQuantumSequences() {
        // Quantum-inspired patterns
        this.quantumPatterns = new Set([
            'ascending', 'descending', 'palindrome', 'alternating',
            'consecutive', 'gaps_of_5', 'gaps_of_7', 'all_odd', 'all_even',
            'sum_divisible_by_7', 'digital_root_patterns', 'mirror_numbers'
        ]);
        console.log('⚛️ Quantum pattern recognition activated!');
    }

    /**
     * Initialize pattern database with historical analysis
     */
    initializePatternDatabase() {
        this.patternDatabase.set('frequency_hot', new Map());
        this.patternDatabase.set('frequency_cold', new Map());
        this.patternDatabase.set('recent_trends', []);
        this.patternDatabase.set('cosmic_alignments', []);
        console.log('📊 Pattern database initialized!');
    }

    /**
     * Analyze similarity between two number sets
     */
    analyzeSimilarity(set1, set2) {
        console.log('🔍 Analyzing quantum similarity between number sets...');
        
        const analysis = {
            exactMatches: this.findExactMatches(set1, set2),
            patternSimilarity: this.analyzePatternSimilarity(set1, set2),
            numericalDistance: this.calculateNumericalDistance(set1, set2),
            cosmicResonance: this.analyzeCosmicResonance(set1, set2),
            quantumCoherence: this.calculateQuantumCoherence(set1, set2),
            similarityScore: 0,
            insights: []
        };

        analysis.similarityScore = this.calculateOverallSimilarity(analysis);
        analysis.insights = this.generateInsights(analysis);

        this.recordAnalysis(set1, set2, analysis);
        return analysis;
    }

    /**
     * Find exact number matches
     */
    findExactMatches(set1, set2) {
        const matches = set1.filter(num => set2.includes(num));
        return {
            count: matches.length,
            numbers: matches,
            percentage: (matches.length / Math.min(set1.length, set2.length)) * 100
        };
    }

    /**
     * Analyze pattern similarity
     */
    analyzePatternSimilarity(set1, set2) {
        const patterns1 = this.identifyPatterns(set1);
        const patterns2 = this.identifyPatterns(set2);
        
        const commonPatterns = patterns1.filter(p => patterns2.includes(p));
        
        return {
            set1Patterns: patterns1,
            set2Patterns: patterns2,
            commonPatterns: commonPatterns,
            patternSimilarity: commonPatterns.length / Math.max(patterns1.length, patterns2.length, 1)
        };
    }

    /**
     * Identify patterns in a number set
     */
    identifyPatterns(numbers) {
        const patterns = [];
        const sorted = [...numbers].sort((a, b) => a - b);
        
        // Check for ascending sequence
        if (this.isAscending(sorted)) patterns.push('ascending');
        
        // Check for descending
        if (this.isDescending([...numbers].sort((a, b) => b - a))) patterns.push('descending');
        
        // Check for consecutive numbers
        if (this.hasConsecutive(sorted)) patterns.push('consecutive');
        
        // Check for all odd/even
        if (numbers.every(n => n % 2 === 0)) patterns.push('all_even');
        if (numbers.every(n => n % 2 === 1)) patterns.push('all_odd');
        
        // Check for palindrome property
        if (this.isPalindromeSet(numbers)) patterns.push('palindrome');
        
        // Check for alternating pattern
        if (this.isAlternating(sorted)) patterns.push('alternating');
        
        // Check sum properties
        const sum = numbers.reduce((a, b) => a + b, 0);
        if (sum % 7 === 0) patterns.push('sum_divisible_by_7');
        
        // Check for cosmic signatures
        for (const signature of this.cosmicSignatures) {
            if (this.matchesCosmicSignature(numbers, signature)) {
                patterns.push(`cosmic_${signature.name.toLowerCase()}`);
            }
        }
        
        return patterns;
    }

    /**
     * Check if numbers are in ascending order
     */
    isAscending(numbers) {
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] <= numbers[i-1]) return false;
        }
        return true;
    }

    /**
     * Check if numbers are in descending order
     */
    isDescending(numbers) {
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] >= numbers[i-1]) return false;
        }
        return true;
    }

    /**
     * Check for consecutive numbers
     */
    hasConsecutive(sorted) {
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] === sorted[i-1] + 1) return true;
        }
        return false;
    }

    /**
     * Check palindrome property
     */
    isPalindromeSet(numbers) {
        const str = numbers.join('');
        return str === str.split('').reverse().join('');
    }

    /**
     * Check alternating pattern
     */
    isAlternating(numbers) {
        if (numbers.length < 3) return false;
        
        for (let i = 2; i < numbers.length; i++) {
            const diff1 = numbers[i-1] - numbers[i-2];
            const diff2 = numbers[i] - numbers[i-1];
            if (Math.sign(diff1) === Math.sign(diff2)) return false;
        }
        return true;
    }

    /**
     * Check if numbers match a cosmic signature
     */
    matchesCosmicSignature(numbers, signature) {
        const matches = numbers.filter(num => signature.sequence.includes(num));
        return matches.length >= 2; // At least 2 numbers from the sequence
    }

    /**
     * Calculate numerical distance between sets
     */
    calculateNumericalDistance(set1, set2) {
        const distances = [];
        
        for (const num1 of set1) {
            const closestDistance = Math.min(...set2.map(num2 => Math.abs(num1 - num2)));
            distances.push(closestDistance);
        }
        
        const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
        const maxDistance = Math.max(...distances);
        
        return {
            averageDistance: avgDistance,
            maxDistance: maxDistance,
            totalDistance: distances.reduce((a, b) => a + b, 0),
            normalizedScore: Math.max(0, 1 - (avgDistance / 50)) // Normalize to 0-1
        };
    }

    /**
     * Analyze cosmic resonance
     */
    analyzeCosmicResonance(set1, set2) {
        const resonance = {
            mathSimilarity: this.calculateMathematicalSimilarity(set1, set2),
            harmonicResonance: this.calculateHarmonicResonance(set1, set2),
            digitalRootAlignment: this.analyzeDigitalRoots(set1, set2),
            cosmicPhase: this.calculateCosmicPhase(set1, set2)
        };
        
        resonance.overallResonance = (
            resonance.mathSimilarity * 0.3 +
            resonance.harmonicResonance * 0.3 +
            resonance.digitalRootAlignment * 0.2 +
            resonance.cosmicPhase * 0.2
        );
        
        return resonance;
    }

    /**
     * Calculate mathematical similarity
     */
    calculateMathematicalSimilarity(set1, set2) {
        const sum1 = set1.reduce((a, b) => a + b, 0);
        const sum2 = set2.reduce((a, b) => a + b, 0);
        const mean1 = sum1 / set1.length;
        const mean2 = sum2 / set2.length;
        
        const variance1 = set1.reduce((acc, val) => acc + Math.pow(val - mean1, 2), 0) / set1.length;
        const variance2 = set2.reduce((acc, val) => acc + Math.pow(val - mean2, 2), 0) / set2.length;
        
        const meanDiff = Math.abs(mean1 - mean2);
        const varianceDiff = Math.abs(variance1 - variance2);
        
        return Math.max(0, 1 - (meanDiff + varianceDiff) / 100);
    }

    /**
     * Calculate harmonic resonance
     */
    calculateHarmonicResonance(set1, set2) {
        // Use GCD and LCM patterns for harmonic analysis
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        
        let harmonicScore = 0;
        let comparisons = 0;
        
        for (const num1 of set1) {
            for (const num2 of set2) {
                const ratio = Math.max(num1, num2) / Math.min(num1, num2);
                const gcdValue = gcd(num1, num2);
                
                // Higher harmonic resonance for simple ratios and higher GCD
                if (ratio <= 2) harmonicScore += 0.5;
                if (gcdValue > 1) harmonicScore += gcdValue / 10;
                comparisons++;
            }
        }
        
        return comparisons > 0 ? harmonicScore / comparisons : 0;
    }

    /**
     * Analyze digital root patterns
     */
    analyzeDigitalRoots(set1, set2) {
        const digitalRoot = (n) => {
            while (n >= 10) {
                n = n.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
            }
            return n;
        };
        
        const roots1 = set1.map(digitalRoot);
        const roots2 = set2.map(digitalRoot);
        
        const commonRoots = roots1.filter(root => roots2.includes(root));
        return commonRoots.length / Math.max(roots1.length, roots2.length);
    }

    /**
     * Calculate cosmic phase
     */
    calculateCosmicPhase(set1, set2) {
        // Use modular arithmetic for cosmic phase calculation
        const phase1 = set1.reduce((acc, num, idx) => acc + (num * Math.cos(idx * Math.PI / 3)), 0);
        const phase2 = set2.reduce((acc, num, idx) => acc + (num * Math.cos(idx * Math.PI / 3)), 0);
        
        const phaseDifference = Math.abs(phase1 - phase2);
        return Math.max(0, 1 - phaseDifference / 1000);
    }

    /**
     * Calculate quantum coherence
     */
    calculateQuantumCoherence(set1, set2) {
        // Quantum-inspired coherence measurement
        const entropy1 = this.calculateEntropy(set1);
        const entropy2 = this.calculateEntropy(set2);
        
        const coherence = {
            entropy1: entropy1,
            entropy2: entropy2,
            entropyDifference: Math.abs(entropy1 - entropy2),
            quantumInterference: this.calculateQuantumInterference(set1, set2),
            coherenceScore: 0
        };
        
        coherence.coherenceScore = Math.max(0, 1 - coherence.entropyDifference / 5) * coherence.quantumInterference;
        return coherence;
    }

    /**
     * Calculate entropy of a number set
     */
    calculateEntropy(numbers) {
        const frequency = new Map();
        for (const num of numbers) {
            frequency.set(num, (frequency.get(num) || 0) + 1);
        }
        
        let entropy = 0;
        const total = numbers.length;
        
        for (const count of frequency.values()) {
            const probability = count / total;
            entropy -= probability * Math.log2(probability);
        }
        
        return entropy;
    }

    /**
     * Calculate quantum interference pattern
     */
    calculateQuantumInterference(set1, set2) {
        let interference = 0;
        
        for (let i = 0; i < Math.min(set1.length, set2.length); i++) {
            const wave1 = Math.sin(set1[i] * Math.PI / 35); // Powerball range normalization
            const wave2 = Math.sin(set2[i] * Math.PI / 35);
            
            interference += Math.abs(wave1 + wave2); // Constructive interference
        }
        
        return interference / Math.min(set1.length, set2.length);
    }

    /**
     * Calculate overall similarity score
     */
    calculateOverallSimilarity(analysis) {
        const weights = {
            exactMatches: 0.4,
            patternSimilarity: 0.25,
            numericalDistance: 0.2,
            cosmicResonance: 0.1,
            quantumCoherence: 0.05
        };
        
        const score = (
            (analysis.exactMatches.percentage / 100) * weights.exactMatches +
            analysis.patternSimilarity.patternSimilarity * weights.patternSimilarity +
            analysis.numericalDistance.normalizedScore * weights.numericalDistance +
            analysis.cosmicResonance.overallResonance * weights.cosmicResonance +
            analysis.quantumCoherence.coherenceScore * weights.quantumCoherence
        ) * 100;
        
        return Math.min(100, Math.max(0, score));
    }

    /**
     * Generate insights from analysis
     */
    generateInsights(analysis) {
        const insights = [];
        
        if (analysis.exactMatches.count > 0) {
            insights.push(`🎯 Found ${analysis.exactMatches.count} exact matches: ${analysis.exactMatches.numbers.join(', ')}`);
        }
        
        if (analysis.patternSimilarity.commonPatterns.length > 0) {
            insights.push(`🔮 Shared cosmic patterns: ${analysis.patternSimilarity.commonPatterns.join(', ')}`);
        }
        
        if (analysis.cosmicResonance.overallResonance > 0.7) {
            insights.push(`🌌 High cosmic resonance detected! The universe approves.`);
        }
        
        if (analysis.quantumCoherence.coherenceScore > 0.8) {
            insights.push(`⚛️ Quantum coherence achieved! Numbers are in superposition harmony.`);
        }
        
        if (analysis.numericalDistance.averageDistance < 5) {
            insights.push(`📏 Numbers are quantum entangled - very close numerically!`);
        }
        
        if (analysis.similarityScore > 80) {
            insights.push(`🚀 Exceptional similarity! These numbers share a cosmic destiny.`);
        } else if (analysis.similarityScore > 60) {
            insights.push(`✨ Good similarity detected. Quantum vibrations align.`);
        } else if (analysis.similarityScore > 40) {
            insights.push(`🔍 Moderate similarity. Some cosmic connections present.`);
        } else {
            insights.push(`🌀 Low similarity. Numbers exist in different quantum states.`);
        }
        
        return insights;
    }

    /**
     * Record analysis in history
     */
    recordAnalysis(set1, set2, analysis) {
        const record = {
            timestamp: new Date(),
            set1: [...set1],
            set2: [...set2],
            analysis: analysis,
            id: this.generateAnalysisId()
        };
        
        this.analysisHistory.push(record);
        
        // Keep only last 100 analyses
        if (this.analysisHistory.length > 100) {
            this.analysisHistory.shift();
        }
        
        console.log(`📊 Analysis recorded: ${record.id}`);
    }

    /**
     * Generate unique analysis ID
     */
    generateAnalysisId() {
        return 'QSA_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Get analysis statistics
     */
    getStats() {
        return {
            totalAnalyses: this.analysisHistory.length,
            cosmicPatternsLoaded: this.cosmicSignatures.length,
            quantumPatternsActive: this.quantumPatterns.size,
            averageSimilarityScore: this.analysisHistory.length > 0 
                ? this.analysisHistory.reduce((sum, record) => sum + record.analysis.similarityScore, 0) / this.analysisHistory.length 
                : 0,
            lastAnalysis: this.analysisHistory.length > 0 ? this.analysisHistory[this.analysisHistory.length - 1].timestamp : null
        };
    }

    /**
     * Find most similar numbers in history
     */
    findMostSimilar(targetSet, limit = 5) {
        const similarities = this.analysisHistory
            .map(record => ({
                ...record,
                similarity1: this.analyzeSimilarity(targetSet, record.set1).similarityScore,
                similarity2: this.analyzeSimilarity(targetSet, record.set2).similarityScore
            }))
            .map(record => ({
                record: record,
                bestSimilarity: Math.max(record.similarity1, record.similarity2),
                bestSet: record.similarity1 > record.similarity2 ? record.set1 : record.set2
            }))
            .sort((a, b) => b.bestSimilarity - a.bestSimilarity)
            .slice(0, limit);
            
        return similarities;
    }
}

// Initialize global similarity analyzer
window.SimilarityAnalyzer = SimilarityAnalyzer;

// Auto-initialize if in browser environment
if (typeof document !== 'undefined') {
    window.quantumAnalyzer = new SimilarityAnalyzer();
    console.log('🔍 Global quantum similarity analyzer ready!');
}

console.log('🔍 Similarity Analyzer module loaded successfully!');