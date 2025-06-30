/**
 * 📊 Powerball Superposition - Similarity Analysis System
 * Analyzes generated numbers against historical Powerball data
 */

class SimilarityAnalyzer {
    constructor() {
        this.historicalData = [];
        this.isDataLoaded = false;
        this.analysisCache = new Map();
        
        // Initialize with sample data first, then load full dataset
        this.initializeSampleData();
        
        console.log('📊 Similarity Analyzer initialized');
    }

    /**
     * Initialize with sample historical data for immediate functionality
     */
    initializeSampleData() {
        // Sample historical Powerball draws for demonstration
        this.historicalData = [
            { date: '2024-12-25', numbers: [15, 26, 27, 30, 35], powerball: 3, jackpot: 150000000 },
            { date: '2024-12-21', numbers: [2, 15, 27, 30, 50], powerball: 18, jackpot: 137000000 },
            { date: '2018-12-19', numbers: [15, 29, 31, 37, 43], powerball: 16, jackpot: 45000000 },
            { date: '2015-07-01', numbers: [7, 24, 26, 31, 41], powerball: 25, jackpot: 78000000 },
            { date: '2014-08-27', numbers: [17, 24, 26, 45, 46], powerball: 19, jackpot: 90000000 },
            { date: '2012-10-10', numbers: [18, 26, 29, 35, 43], powerball: 28, jackpot: 67000000 },
            { date: '2020-03-14', numbers: [3, 14, 15, 26, 53], powerball: 8, jackpot: 89000000 },
            { date: '2021-07-04', numbers: [4, 17, 19, 26, 49], powerball: 11, jackpot: 234000000 },
            { date: '2019-11-28', numbers: [12, 28, 35, 47, 56], powerball: 22, jackpot: 178000000 },
            { date: '2023-05-15', numbers: [8, 23, 29, 41, 67], powerball: 7, jackpot: 298000000 }
        ];
        
        this.isDataLoaded = true;
        console.log(`📊 Loaded ${this.historicalData.length} sample historical draws`);
    }

    /**
     * Load full historical data from JSON file
     * @returns {Promise<boolean>} Success status
     */
    async loadHistoricalData() {
        try {
            const response = await fetch('/data/historical-draws.json');
            if (response.ok) {
                const data = await response.json();
                this.historicalData = data.draws || data;
                this.isDataLoaded = true;
                console.log(`📊 Loaded ${this.historicalData.length} historical draws from database`);
                return true;
            } else {
                console.warn('📊 Could not load historical data file, using sample data');
                return false;
            }
        } catch (error) {
            console.warn('📊 Error loading historical data:', error.message);
            return false;
        }
    }

    /**
     * Calculate direct number matches between two sets
     * @param {number[]} generated - Generated numbers
     * @param {number[]} historical - Historical numbers
     * @returns {number} Number of direct matches
     */
    calculateDirectMatches(generated, historical) {
        return generated.filter(num => historical.includes(num)).length;
    }

    /**
     * Calculate sum difference between two sets
     * @param {number[]} generated - Generated numbers
     * @param {number[]} historical - Historical numbers
     * @returns {number} Absolute difference in sums
     */
    calculateSumDifference(generated, historical) {
        const generatedSum = generated.reduce((sum, num) => sum + num, 0);
        const historicalSum = historical.reduce((sum, num) => sum + num, 0);
        return Math.abs(generatedSum - historicalSum);
    }

    /**
     * Analyze zone distribution pattern
     * @param {number[]} numbers - Numbers to analyze
     * @returns {Object} Zone distribution
     */
    analyzeZoneDistribution(numbers) {
        // Powerball zones: Low (1-23), Mid (24-46), High (47-69)
        const zones = { low: 0, mid: 0, high: 0 };
        
        numbers.forEach(num => {
            if (num <= 23) zones.low++;
            else if (num <= 46) zones.mid++;
            else zones.high++;
        });
        
        return zones;
    }

    /**
     * Calculate zone pattern similarity
     * @param {Object} generatedZones - Generated numbers zone distribution
     * @param {Object} historicalZones - Historical numbers zone distribution
     * @returns {number} Similarity score (0-100)
     */
    calculateZonePatternSimilarity(generatedZones, historicalZones) {
        const totalGenerated = generatedZones.low + generatedZones.mid + generatedZones.high;
        const totalHistorical = historicalZones.low + historicalZones.mid + historicalZones.high;
        
        if (totalGenerated === 0 || totalHistorical === 0) return 0;
        
        // Calculate percentage distribution
        const genPercentages = {
            low: (generatedZones.low / totalGenerated) * 100,
            mid: (generatedZones.mid / totalGenerated) * 100,
            high: (generatedZones.high / totalGenerated) * 100
        };
        
        const histPercentages = {
            low: (historicalZones.low / totalHistorical) * 100,
            mid: (historicalZones.mid / totalHistorical) * 100,
            high: (historicalZones.high / totalHistorical) * 100
        };
        
        // Calculate similarity based on percentage differences
        const lowDiff = Math.abs(genPercentages.low - histPercentages.low);
        const midDiff = Math.abs(genPercentages.mid - histPercentages.mid);
        const highDiff = Math.abs(genPercentages.high - histPercentages.high);
        
        const avgDiff = (lowDiff + midDiff + highDiff) / 3;
        return Math.max(0, 100 - avgDiff);
    }

    /**
     * Calculate number spacing pattern
     * @param {number[]} numbers - Sorted numbers
     * @returns {number[]} Gaps between consecutive numbers
     */
    calculateSpacing(numbers) {
        const sorted = [...numbers].sort((a, b) => a - b);
        const gaps = [];
        
        for (let i = 1; i < sorted.length; i++) {
            gaps.push(sorted[i] - sorted[i - 1]);
        }
        
        return gaps;
    }

    /**
     * Calculate overall similarity score
     * @param {number[]} generatedNumbers - Generated main numbers
     * @param {number} generatedPowerball - Generated powerball
     * @param {Object} historicalDraw - Historical draw data
     * @returns {Object} Detailed similarity analysis
     */
    calculateSimilarity(generatedNumbers, generatedPowerball, historicalDraw) {
        const directMatches = this.calculateDirectMatches(generatedNumbers, historicalDraw.numbers);
        const sumDifference = this.calculateSumDifference(generatedNumbers, historicalDraw.numbers);
        const powerballMatch = generatedPowerball === historicalDraw.powerball;
        
        const generatedZones = this.analyzeZoneDistribution(generatedNumbers);
        const historicalZones = this.analyzeZoneDistribution(historicalDraw.numbers);
        const zonePatternScore = this.calculateZonePatternSimilarity(generatedZones, historicalZones);
        
        const generatedSpacing = this.calculateSpacing(generatedNumbers);
        const historicalSpacing = this.calculateSpacing(historicalDraw.numbers);
        
        // Weight factors for different aspects
        const weights = {
            directMatch: 30,    // 30% weight for direct matches
            zonePattern: 25,    // 25% weight for zone distribution
            sumSimilarity: 20,  // 20% weight for sum similarity
            spacing: 15,        // 15% weight for number spacing
            powerball: 10       // 10% weight for powerball match
        };
        
        // Calculate individual scores
        const scores = {
            directMatch: (directMatches / 5) * 100,
            zonePattern: zonePatternScore,
            sumSimilarity: Math.max(0, 100 - (sumDifference / 2)), // Normalize sum difference
            spacing: this.calculateSpacingSimilarity(generatedSpacing, historicalSpacing),
            powerball: powerballMatch ? 100 : 0
        };
        
        // Calculate weighted overall score
        const overallScore = Object.keys(weights).reduce((total, key) => {
            return total + (scores[key] * weights[key] / 100);
        }, 0);
        
        return {
            overallScore: Math.round(overallScore * 100) / 100,
            directMatches,
            sumDifference,
            powerballMatch,
            zonePattern: {
                generated: generatedZones,
                historical: historicalZones,
                similarity: Math.round(zonePatternScore * 100) / 100
            },
            spacing: {
                generated: generatedSpacing,
                historical: historicalSpacing,
                similarity: Math.round(scores.spacing * 100) / 100
            },
            breakdown: scores
        };
    }

    /**
     * Calculate spacing similarity between two number sets
     * @param {number[]} spacing1 - First spacing array
     * @param {number[]} spacing2 - Second spacing array
     * @returns {number} Similarity score (0-100)
     */
    calculateSpacingSimilarity(spacing1, spacing2) {
        if (spacing1.length !== spacing2.length) return 0;
        
        const differences = spacing1.map((gap, index) => 
            Math.abs(gap - spacing2[index])
        );
        
        const avgDifference = differences.reduce((sum, diff) => sum + diff, 0) / differences.length;
        return Math.max(0, 100 - (avgDifference * 5)); // Scale the difference
    }

    /**
     * Find top similar historical draws
     * @param {number[]} generatedNumbers - Generated main numbers
     * @param {number} generatedPowerball - Generated powerball
     * @param {number} topCount - Number of top matches to return
     * @returns {Object[]} Top similar draws with analysis
     */
    findSimilarDraws(generatedNumbers, generatedPowerball, topCount = 5) {
        if (!this.isDataLoaded || this.historicalData.length === 0) {
            console.warn('📊 Historical data not loaded');
            return [];
        }

        // Create cache key
        const cacheKey = `${generatedNumbers.join(',')}-${generatedPowerball}`;
        
        // Check cache first
        if (this.analysisCache.has(cacheKey)) {
            console.log('📊 Using cached analysis results');
            return this.analysisCache.get(cacheKey);
        }

        console.log('📊 Analyzing similarity against historical data...');
        
        const similarities = this.historicalData.map(draw => {
            const analysis = this.calculateSimilarity(generatedNumbers, generatedPowerball, draw);
            return {
                ...draw,
                similarity: analysis,
                grade: this.getGrade(analysis.overallScore)
            };
        });

        // Sort by similarity score (highest first)
        similarities.sort((a, b) => b.similarity.overallScore - a.similarity.overallScore);

        // Get top matches
        const topMatches = similarities.slice(0, topCount);

        // Cache results
        this.analysisCache.set(cacheKey, topMatches);

        console.log(`📊 Found ${topMatches.length} similar draws`);
        return topMatches;
    }

    /**
     * Get letter grade based on similarity score
     * @param {number} score - Similarity score (0-100)
     * @returns {string} Letter grade
     */
    getGrade(score) {
        if (score >= 90) return 'A+';
        if (score >= 85) return 'A';
        if (score >= 80) return 'A-';
        if (score >= 75) return 'B+';
        if (score >= 70) return 'B';
        if (score >= 65) return 'B-';
        if (score >= 60) return 'C+';
        if (score >= 55) return 'C';
        if (score >= 50) return 'C-';
        if (score >= 45) return 'D+';
        if (score >= 40) return 'D';
        return 'F';
    }

    /**
     * Generate analysis summary statistics
     * @param {number[]} generatedNumbers - Generated main numbers
     * @param {number} generatedPowerball - Generated powerball
     * @returns {Object} Summary statistics
     */
    generateAnalysisSummary(generatedNumbers, generatedPowerball) {
        const similarDraws = this.findSimilarDraws(generatedNumbers, generatedPowerball, 10);
        
        if (similarDraws.length === 0) {
            return {
                totalAnalyzed: this.historicalData.length,
                averageSimilarity: 0,
                maxSimilarity: 0,
                minSimilarity: 0,
                generatedAnalysis: this.analyzeGeneratedNumbers(generatedNumbers)
            };
        }

        const scores = similarDraws.map(draw => draw.similarity.overallScore);
        const averageSimilarity = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        const maxSimilarity = Math.max(...scores);
        const minSimilarity = Math.min(...scores);

        return {
            totalAnalyzed: this.historicalData.length,
            averageSimilarity: Math.round(averageSimilarity * 100) / 100,
            maxSimilarity: Math.round(maxSimilarity * 100) / 100,
            minSimilarity: Math.round(minSimilarity * 100) / 100,
            generatedAnalysis: this.analyzeGeneratedNumbers(generatedNumbers),
            topGrade: this.getGrade(maxSimilarity)
        };
    }

    /**
     * Analyze characteristics of generated numbers
     * @param {number[]} numbers - Generated numbers to analyze
     * @returns {Object} Analysis of generated numbers
     */
    analyzeGeneratedNumbers(numbers) {
        const sum = numbers.reduce((total, num) => total + num, 0);
        const sorted = [...numbers].sort((a, b) => a - b);
        const range = sorted[sorted.length - 1] - sorted[0];
        const zones = this.analyzeZoneDistribution(numbers);
        const spacing = this.calculateSpacing(numbers);
        
        // Calculate some interesting statistics
        const average = sum / numbers.length;
        const isConsecutive = spacing.some(gap => gap === 1);
        const hasPattern = this.detectPatterns(numbers);
        
        return {
            sum,
            range,
            average: Math.round(average * 100) / 100,
            zones,
            spacing,
            isConsecutive,
            hasPattern,
            evenCount: numbers.filter(n => n % 2 === 0).length,
            oddCount: numbers.filter(n => n % 2 === 1).length,
            primeCount: numbers.filter(n => this.isPrime(n)).length
        };
    }

    /**
     * Detect common patterns in numbers
     * @param {number[]} numbers - Numbers to analyze
     * @returns {Object} Detected patterns
     */
    detectPatterns(numbers) {
        const sorted = [...numbers].sort((a, b) => a - b);
        
        return {
            arithmetic: this.isArithmeticSequence(sorted),
            geometric: this.isGeometricSequence(sorted),
            fibonacci: this.hasFibonacciNumbers(numbers),
            multiples: this.hasMultiples(numbers)
        };
    }

    /**
     * Check if numbers form arithmetic sequence
     * @param {number[]} sortedNumbers - Sorted numbers
     * @returns {boolean} True if arithmetic sequence
     */
    isArithmeticSequence(sortedNumbers) {
        if (sortedNumbers.length < 3) return false;
        
        const diff = sortedNumbers[1] - sortedNumbers[0];
        for (let i = 2; i < sortedNumbers.length; i++) {
            if (sortedNumbers[i] - sortedNumbers[i - 1] !== diff) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if numbers form geometric sequence
     * @param {number[]} sortedNumbers - Sorted numbers
     * @returns {boolean} True if geometric sequence
     */
    isGeometricSequence(sortedNumbers) {
        if (sortedNumbers.length < 3 || sortedNumbers[0] === 0) return false;
        
        const ratio = sortedNumbers[1] / sortedNumbers[0];
        for (let i = 2; i < sortedNumbers.length; i++) {
            if (Math.abs(sortedNumbers[i] / sortedNumbers[i - 1] - ratio) > 0.001) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if numbers contain Fibonacci sequence elements
     * @param {number[]} numbers - Numbers to check
     * @returns {boolean} True if contains Fibonacci numbers
     */
    hasFibonacciNumbers(numbers) {
        const fibNumbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        return numbers.some(num => fibNumbers.includes(num));
    }

    /**
     * Check if numbers have common multiples
     * @param {number[]} numbers - Numbers to check
     * @returns {Object} Multiple analysis
     */
    hasMultiples(numbers) {
        const multiples = {};
        
        for (let divisor = 2; divisor <= 10; divisor++) {
            const count = numbers.filter(num => num % divisor === 0).length;
            if (count >= 2) {
                multiples[divisor] = count;
            }
        }
        
        return multiples;
    }

    /**
     * Check if number is prime
     * @param {number} n - Number to check
     * @returns {boolean} True if prime
     */
    isPrime(n) {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }

    /**
     * Clear analysis cache
     */
    clearCache() {
        this.analysisCache.clear();
        console.log('📊 Analysis cache cleared');
    }

    /**
     * Get analyzer statistics
     * @returns {Object} System statistics
     */
    getStatistics() {
        return {
            historicalDrawsLoaded: this.historicalData.length,
            isDataLoaded: this.isDataLoaded,
            cacheSize: this.analysisCache.size,
            analyzerVersion: '1.0.0'
        };
    }
}

// Export for global use
window.SimilarityAnalyzer = SimilarityAnalyzer;

// Initialize global instance
window.similarityAnalyzer = new SimilarityAnalyzer();

console.log('📊 Similarity Analyzer module loaded');