/**
 * 🚀 Powerball Superposition - Main Application
 * Core application logic and UI coordination
 */

class PowerballSuperpositionApp {
    constructor() {
        this.isInitialized = false;
        this.isGenerating = false;
        this.currentResults = null;
        this.currentAnalysis = null;
        
        // Initialize app
        this.initialize();
    }

    /**
     * Initialize the application
     */
    async initialize() {
        console.log('🚀 Initializing Powerball Superposition App...');
        
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize all systems
            await this.initializeSystems();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Hide loading screen and show main app
            await this.completeInitialization();
            
            console.log('✅ App initialization complete');
            this.isInitialized = true;
            
        } catch (error) {
            console.error('❌ App initialization failed:', error);
            this.showInitializationError(error);
        }
    }

    /**
     * Show loading screen with quantum animation
     */
    showLoadingScreen() {
        const loadingScreen = document.getElementById('quantum-loading');
        const progressBar = document.getElementById('loading-progress');
        const progressText = document.getElementById('progress-percent');
        const messageElement = document.getElementById('loading-message');
        
        if (!loadingScreen) return;
        
        loadingScreen.style.display = 'flex';
        
        // Simulate loading progress with comedy messages
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random progress increments
            progress = Math.min(progress, 95); // Don't reach 100% until actually ready
            
            if (progressBar) progressBar.style.width = progress + '%';
            if (progressText) progressText.textContent = Math.floor(progress) + '%';
            
            // Update loading message
            if (messageElement && window.comedySystem) {
                const message = window.comedySystem.getRandomMessage('mixed');
                messageElement.textContent = message;
            }
            
            if (progress >= 95) {
                clearInterval(interval);
            }
        }, 800);
        
        // Store interval for cleanup
        this.loadingInterval = interval;
    }

    /**
     * Initialize all subsystems
     */
    async initializeSystems() {
        console.log('🔧 Initializing subsystems...');
        
        // Wait for all systems to be ready
        const systems = [
            window.quantumEngine,
            window.comedySystem,
            window.similarityAnalyzer,
            window.socialSharing
        ];
        
        // Check if all systems loaded
        const allSystemsReady = systems.every(system => system !== undefined);
        
        if (!allSystemsReady) {
            throw new Error('Required subsystems not loaded');
        }
        
        // Initialize quantum engine
        if (!window.quantumEngine.isInitialized) {
            await window.quantumEngine.initialize();
        }
        
        // Load historical data for similarity analysis
        await window.similarityAnalyzer.loadHistoricalData();
        
        console.log('✅ All subsystems initialized');
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        console.log('📡 Setting up event listeners...');
        
        // Main generate button
        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.handleGenerate());
        }
        
        // Generate again button
        const generateAgainBtn = document.getElementById('generate-again-btn');
        if (generateAgainBtn) {
            generateAgainBtn.addEventListener('click', () => this.handleGenerate());
        }
        
        // Save button
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.handleSave());
        }
        
        // Share button
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.handleShare());
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Update stats periodically
        setInterval(() => this.updateQuantumStats(), 5000);
        
        console.log('✅ Event listeners set up');
    }

    /**
     * Complete initialization and show main app
     */
    async completeInitialization() {
        // Final loading progress
        const progressBar = document.getElementById('loading-progress');
        const progressText = document.getElementById('progress-percent');
        const messageElement = document.getElementById('loading-message');
        
        if (progressBar) progressBar.style.width = '100%';
        if (progressText) progressText.textContent = '100%';
        if (messageElement) messageElement.textContent = '🎉 Quantum initialization complete!';
        
        // Clean up loading interval
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval);
        }
        
        // Wait a moment for final message
        await this.sleep(1000);
        
        // Hide loading screen
        const loadingScreen = document.getElementById('quantum-loading');
        const mainApp = document.getElementById('main-app');
        
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        if (mainApp) {
            mainApp.style.display = 'flex';
            mainApp.style.opacity = '0';
            setTimeout(() => {
                mainApp.style.opacity = '1';
            }, 100);
        }
        
        // Initialize quantum stats
        this.updateQuantumStats();
    }

    /**
     * Handle number generation
     */
    async handleGenerate() {
        if (this.isGenerating || !this.isInitialized) return;
        
        console.log('🎲 Starting quantum number generation...');
        
        this.isGenerating = true;
        
        try {
            // Show quantum overlay
            this.showQuantumOverlay();
            
            // Generate numbers
            const results = await this.generateQuantumNumbers();
            
            // Analyze similarity
            const analysis = await this.analyzeSimilarity(results);
            
            // Update UI with results
            this.displayResults(results, analysis);
            
            // Hide overlay
            this.hideQuantumOverlay();
            
            console.log('✅ Quantum generation complete');
            
        } catch (error) {
            console.error('❌ Generation failed:', error);
            this.showGenerationError(error);
            this.hideQuantumOverlay();
        } finally {
            this.isGenerating = false;
        }
    }

    /**
     * Show quantum processing overlay
     */
    showQuantumOverlay() {
        const overlay = document.getElementById('quantum-overlay');
        const titleElement = document.getElementById('overlay-title');
        const messageElement = document.getElementById('overlay-message');
        const progressBar = document.getElementById('quantum-progress');
        const progressText = document.getElementById('quantum-percent');
        
        if (!overlay) return;
        
        overlay.style.display = 'flex';
        
        // Start comedy loading sequence
        let progress = 0;
        const messages = window.comedySystem.getProgressMessages();
        let messageIndex = 0;
        
        const updateProgress = () => {
            if (!this.isGenerating) return;
            
            // Update progress
            progress += Math.random() * 20 + 5;
            progress = Math.min(progress, 95);
            
            if (progressBar) progressBar.style.width = progress + '%';
            if (progressText) progressText.textContent = Math.floor(progress) + '%';
            
            // Update comedy message
            if (messageElement && window.comedySystem) {
                const message = window.comedySystem.getRandomMessage('mixed');
                messageElement.textContent = message;
            }
            
            // Update title occasionally
            if (titleElement && Math.random() < 0.3) {
                const titles = [
                    'Quantum Processing...',
                    'Collapsing Wave Functions...',
                    'Scanning Parallel Universes...',
                    'Entangling Qubits...',
                    'Materializing Numbers...'
                ];
                titleElement.textContent = titles[Math.floor(Math.random() * titles.length)];
            }
            
            if (progress < 95) {
                setTimeout(updateProgress, 400 + Math.random() * 600);
            }
        };
        
        updateProgress();
    }

    /**
     * Hide quantum processing overlay
     */
    hideQuantumOverlay() {
        const overlay = document.getElementById('quantum-overlay');
        const progressBar = document.getElementById('quantum-progress');
        const progressText = document.getElementById('quantum-percent');
        const messageElement = document.getElementById('overlay-message');
        
        // Complete progress
        if (progressBar) progressBar.style.width = '100%';
        if (progressText) progressText.textContent = '100%';
        if (messageElement) messageElement.textContent = '🎉 Quantum collapse complete!';
        
        setTimeout(() => {
            if (overlay) overlay.style.display = 'none';
        }, 1000);
    }

    /**
     * Generate quantum numbers
     */
    async generateQuantumNumbers() {
        // Add some realistic delay for the comedy effect
        const comedyDelay = window.comedySystem.getRandomLoadingDuration();
        
        // Start generation
        const generationPromise = window.quantumEngine.generatePowerballNumbers();
        
        // Wait for minimum comedy timing
        const [results] = await Promise.all([
            generationPromise,
            this.sleep(comedyDelay)
        ]);
        
        this.currentResults = results;
        return results;
    }

    /**
     * Analyze similarity with historical data
     */
    async analyzeSimilarity(results) {
        console.log('📊 Analyzing historical similarity...');
        
        const analysis = window.similarityAnalyzer.generateAnalysisSummary(
            results.mainNumbers,
            results.powerball
        );
        
        this.currentAnalysis = analysis;
        return analysis;
    }

    /**
     * Display generation results
     */
    displayResults(results, analysis) {
        console.log('🎯 Displaying results...');
        
        // Show results sections
        const numbersSection = document.getElementById('numbers-section');
        const analysisSection = document.getElementById('analysis-section');
        
        if (numbersSection) numbersSection.style.display = 'block';
        if (analysisSection) analysisSection.style.display = 'block';
        
        // Display numbers with animation
        this.animateNumbers(results);
        
        // Update quantum details
        this.updateQuantumDetails(results);
        
        // Display similarity analysis
        this.displaySimilarityAnalysis(analysis);
        
        // Prepare sharing data
        window.socialSharing.prepareShareData(results, analysis);
        
        // Scroll to results
        setTimeout(() => {
            numbersSection?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }

    /**
     * Animate number reveal
     */
    animateNumbers(results) {
        const numberElements = [
            document.getElementById('num1'),
            document.getElementById('num2'),
            document.getElementById('num3'),
            document.getElementById('num4'),
            document.getElementById('num5')
        ];
        const powerballElement = document.getElementById('powerball');
        
        // Animate main numbers
        results.mainNumbers.forEach((number, index) => {
            const element = numberElements[index];
            if (element) {
                setTimeout(() => {
                    element.textContent = number;
                    element.style.animation = 'ball-materialize 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                }, index * 200);
            }
        });
        
        // Animate powerball
        if (powerballElement) {
            setTimeout(() => {
                powerballElement.textContent = results.powerball;
                powerballElement.style.animation = 'ball-materialize 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }, results.mainNumbers.length * 200 + 300);
        }
    }

    /**
     * Update quantum generation details
     */
    updateQuantumDetails(results) {
        const qubitCostElement = document.getElementById('qubit-cost');
        const universesCountElement = document.getElementById('universes-count');
        const quantumDetailsElement = document.getElementById('quantum-details');
        
        if (qubitCostElement) {
            qubitCostElement.textContent = `${results.metadata.qubitHours} Qubit-Hours`;
        }
        
        if (universesCountElement) {
            universesCountElement.textContent = results.metadata.universesSanned.toLocaleString();
        }
        
        if (quantumDetailsElement) {
            quantumDetailsElement.innerHTML = `
                Generated using <strong>${results.metadata.qubitHours} Qubit-Hours</strong> • 
                Scanned <strong>${results.metadata.universesSanned.toLocaleString()}</strong> parallel universes •
                Quantum purity: <strong>${results.metadata.entropyQuality}%</strong>
            `;
        }
    }

    /**
     * Display similarity analysis
     */
    displaySimilarityAnalysis(analysis) {
        const totalAnalyzedElement = document.getElementById('total-analyzed');
        const avgSimilarityElement = document.getElementById('avg-similarity');
        const maxSimilarityElement = document.getElementById('max-similarity');
        const matchesContainer = document.getElementById('matches-container');
        
        if (totalAnalyzedElement) {
            totalAnalyzedElement.textContent = analysis.totalAnalyzed.toLocaleString();
        }
        
        if (avgSimilarityElement) {
            avgSimilarityElement.textContent = `${analysis.averageSimilarity} pts`;
        }
        
        if (maxSimilarityElement) {
            maxSimilarityElement.textContent = `${analysis.maxSimilarity} pts`;
        }
        
        // Display top similar draws
        if (matchesContainer && this.currentResults) {
            const similarDraws = window.similarityAnalyzer.findSimilarDraws(
                this.currentResults.mainNumbers,
                this.currentResults.powerball,
                5
            );
            
            matchesContainer.innerHTML = this.generateMatchesHTML(similarDraws);
        }
    }

    /**
     * Generate HTML for similar draws
     */
    generateMatchesHTML(similarDraws) {
        if (!similarDraws || similarDraws.length === 0) {
            return '<p style="text-align: center; opacity: 0.7;">No historical data available for comparison</p>';
        }
        
        return similarDraws.map(draw => `
            <div class="match-item" style="
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 1.5rem;
                margin-bottom: 1rem;
                border-left: 4px solid ${this.getGradeColor(draw.grade)};
            ">
                <div class="match-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                ">
                    <div class="match-date" style="
                        font-size: 0.9rem;
                        opacity: 0.8;
                    ">${new Date(draw.date).toLocaleDateString()}</div>
                    <div class="match-grade" style="
                        background: ${this.getGradeColor(draw.grade)};
                        color: var(--electron-black);
                        padding: 0.3rem 0.8rem;
                        border-radius: 15px;
                        font-weight: bold;
                        font-size: 0.8rem;
                    ">
                        ${draw.grade} ${draw.similarity.overallScore.toFixed(1)} pts
                    </div>
                </div>
                
                <div class="match-numbers" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                ">
                    ${draw.numbers.map(num => `
                        <span style="
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            width: 35px;
                            height: 35px;
                            background: rgba(255, 255, 255, 0.9);
                            color: var(--electron-black);
                            border-radius: 50%;
                            font-size: 0.8rem;
                            font-weight: 600;
                        ">${num}</span>
                    `).join('')}
                    <span style="
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 35px;
                        height: 35px;
                        background: var(--entropy-red);
                        color: white;
                        border-radius: 50%;
                        font-size: 0.8rem;
                        font-weight: 600;
                        margin-left: 0.5rem;
                    ">${draw.powerball}</span>
                </div>
                
                <div class="match-details" style="
                    display: flex;
                    gap: 1rem;
                    font-size: 0.8rem;
                    opacity: 0.8;
                    flex-wrap: wrap;
                ">
                    <span><strong>Direct Match:</strong> ${draw.similarity.directMatches}</span>
                    <span><strong>Zone Pattern:</strong> ${draw.similarity.zonePattern.similarity} pts</span>
                    <span><strong>Sum Difference:</strong> ${draw.similarity.sumDifference}</span>
                </div>
            </div>
        `).join('');
    }

    /**
     * Get color for grade
     */
    getGradeColor(grade) {
        const colors = {
            'A+': '#00ff88',
            'A': '#00ff88',
            'A-': '#44ff44',
            'B+': '#88ff00',
            'B': '#ccff00',
            'B-': '#ffff00',
            'C+': '#ffcc00',
            'C': '#ff8800',
            'C-': '#ff6600',
            'D+': '#ff4400',
            'D': '#ff2200',
            'F': '#ff0000'
        };
        return colors[grade] || '#ffd700';
    }

    /**
     * Update quantum statistics display
     */
    updateQuantumStats() {
        const qualityElement = document.getElementById('quantum-quality');
        const universesElement = document.getElementById('universes-scanned');
        
        if (qualityElement) {
            // Vary the quality slightly for realism
            const baseQuality = 99.7;
            const variation = (Math.random() - 0.5) * 0.2;
            const currentQuality = (baseQuality + variation).toFixed(1);
            qualityElement.textContent = `${currentQuality}%`;
        }
        
        if (universesElement && this.currentResults) {
            universesElement.textContent = this.currentResults.metadata.universesSanned.toLocaleString();
        }
    }

    /**
     * Handle save button click
     */
    handleSave() {
        if (!this.currentResults) {
            console.warn('💾 No results to save');
            return;
        }
        
        console.log('💾 Saving quantum numbers...');
        
        // Save to localStorage
        const savedNumbers = JSON.parse(localStorage.getItem('powerball-superposition-saved') || '[]');
        
        const saveEntry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            results: this.currentResults,
            analysis: this.currentAnalysis
        };
        
        savedNumbers.unshift(saveEntry);
        
        // Keep only last 50 saves
        if (savedNumbers.length > 50) {
            savedNumbers.splice(50);
        }
        
        localStorage.setItem('powerball-superposition-saved', JSON.stringify(savedNumbers));
        
        // Show feedback
        this.showSaveFeedback();
        
        console.log('✅ Numbers saved successfully');
    }

    /**
     * Handle share button click
     */
    async handleShare() {
        if (!this.currentResults) {
            console.warn('📤 No results to share');
            return;
        }
        
        console.log('📤 Sharing quantum results...');
        
        // Try native share first
        const nativeShareSuccess = await window.socialSharing.shareNative('quantum');
        
        if (!nativeShareSuccess) {
            // Show share options modal
            this.showShareModal();
        }
    }

    /**
     * Show share options modal
     */
    showShareModal() {
        // Create modal dynamically
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--quantum-gradient);
                border-radius: 20px;
                padding: 2rem;
                max-width: 400px;
                width: 90vw;
                text-align: center;
            ">
                <h3 style="margin-bottom: 1.5rem; color: var(--probability-gold);">📤 Share Your Quantum Numbers</h3>
                
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <button class="share-platform-btn" data-platform="twitter">
                        🐦 Share on Twitter
                    </button>
                    <button class="share-platform-btn" data-platform="facebook">
                        📘 Share on Facebook
                    </button>
                    <button class="share-platform-btn" data-platform="copy">
                        📋 Copy to Clipboard
                    </button>
                    <button class="share-platform-btn" data-platform="download">
                        💾 Download Results
                    </button>
                </div>
                
                <button style="
                    margin-top: 1.5rem;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    cursor: pointer;
                " onclick="this.parentElement.parentElement.remove()">
                    Close
                </button>
            </div>
        `;
        
        // Add platform button styles
        const style = document.createElement('style');
        style.textContent = `
            .share-platform-btn {
                background: var(--energy-gradient);
                border: none;
                color: var(--electron-black);
                padding: 1rem 1.5rem;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.3s;
            }
            .share-platform-btn:hover {
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
        
        // Add event listeners
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('share-platform-btn')) {
                const platform = e.target.dataset.platform;
                this.handlePlatformShare(platform);
                modal.remove();
            } else if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }

    /**
     * Handle platform-specific sharing
     */
    async handlePlatformShare(platform) {
        switch (platform) {
            case 'twitter':
                window.socialSharing.shareToTwitter('quantum');
                break;
            case 'facebook':
                window.socialSharing.shareToFacebook('simple');
                break;
            case 'copy':
                await window.socialSharing.copyToClipboard('twitter', 'quantum');
                break;
            case 'download':
                window.socialSharing.downloadResults('txt');
                break;
        }
    }

    /**
     * Show save feedback
     */
    showSaveFeedback() {
        const feedback = document.createElement('div');
        feedback.textContent = '💾 Numbers saved!';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--probability-gold);
            color: var(--electron-black);
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 3000);
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeydown(e) {
        // Space or Enter: Generate
        if ((e.code === 'Space' || e.code === 'Enter') && !this.isGenerating) {
            e.preventDefault();
            this.handleGenerate();
        }
        
        // Ctrl+S: Save
        if (e.ctrlKey && e.code === 'KeyS' && this.currentResults) {
            e.preventDefault();
            this.handleSave();
        }
        
        // Ctrl+Shift+S: Share
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyS' && this.currentResults) {
            e.preventDefault();
            this.handleShare();
        }
    }

    /**
     * Show initialization error
     */
    showInitializationError(error) {
        const loadingScreen = document.getElementById('quantum-loading');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div style="text-align: center; color: var(--entropy-red);">
                    <h2>⚠️ Quantum Initialization Failed</h2>
                    <p>Error: ${error.message}</p>
                    <button onclick="location.reload()" style="
                        background: var(--energy-gradient);
                        border: none;
                        color: var(--electron-black);
                        padding: 1rem 2rem;
                        border-radius: 25px;
                        font-weight: bold;
                        cursor: pointer;
                        margin-top: 1rem;
                    ">
                        🔄 Restart Quantum Computer
                    </button>
                </div>
            `;
        }
    }

    /**
     * Show generation error
     */
    showGenerationError(error) {
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = document.getElementById('status-text');
        
        if (statusIndicator) {
            statusIndicator.className = 'status-indicator error';
        }
        
        if (statusText) {
            statusText.textContent = 'Quantum Error: ' + error.message;
        }
        
        // Reset after 5 seconds
        setTimeout(() => {
            if (statusIndicator) {
                statusIndicator.className = 'status-indicator ready';
            }
            if (statusText) {
                statusText.textContent = 'Quantum Computer Ready';
            }
        }, 5000);
    }

    /**
     * Utility sleep function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get app statistics
     */
    getStatistics() {
        return {
            isInitialized: this.isInitialized,
            isGenerating: this.isGenerating,
            hasResults: !!this.currentResults,
            hasAnalysis: !!this.currentAnalysis,
            version: '1.0.0'
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting Powerball Superposition...');
    window.powerballApp = new PowerballSuperpositionApp();
});

// Export for debugging
window.PowerballSuperpositionApp = PowerballSuperpositionApp;

console.log('🚀 Main application module loaded');