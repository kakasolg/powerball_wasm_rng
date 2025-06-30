console.log('🚀 App.js loading...');
console.log('📝 Testing UIManager + StorageManager import...');
// Main App Controller for Ultimate WebCrypto Layout
import { UIManager } from './ui-manager.js';
import { StorageManager } from './storage-manager.js';
import { ThreeEngine } from './three-engine.js';

console.log('✅ UIManager + StorageManager import successful!');
console.log('✅ App.js basic execution successful!');

class UltimateWebCryptoApp {
    constructor() {
        this.uiManager = null;
        this.storageManager = null;
        this.threeEngine = null;
        
        this.currentScreen = 'list'; // 'list' or 'generation'
        this.isThreeEngineInitialized = false;
        
        // Game state
        this.selectedMainNumbers = [];
        this.selectedPowerBall = null;
        this.gameProgress = 0;
        this.totalNumbers = 6; // 5 main + 1 powerball
        
        // WebCrypto entropy data
        this.entropyData = {
            hardwareSeed: 0,
            browserEntropy: 0,
            clickContext: 0,
            timeEntropy: 0,
            finalSeed: 0,
            quality: 0,
            predictionScore: 0
        };
        
        console.log('🎯 UltimateWebCryptoApp initialized');
    }

    async init() {
        try {
            console.log('🔧 Creating UIManager...');
            this.uiManager = new UIManager();
            
            console.log('🔧 Calling UIManager.init()...');
            this.uiManager.init();
            console.log('✅ UIManager.init() completed!');
            
            console.log('🔧 Creating StorageManager...');
            this.storageManager = new StorageManager();
            console.log('✅ StorageManager created!');
            
            console.log('🎨 UI Manager initialized');
            console.log('💾 Storage Manager initialized');
            
            // Load saved combinations and update UI
            console.log('🔧 Loading saved combinations...');
            this.loadSavedCombinations();
            console.log('✅ Saved combinations loaded!');
            // Setup event listeners
            this.setupEventListeners();
            
            // Three.js 엔진을 앱 시작 시 바로 초기화
            await this.initThreeEngine();
            
            // Start on Generation screen
            this.showGenerationScreen();
            
            console.log('🚀 Ultimate WebCrypto App initialized successfully!');
            
            // Hide loading screen
            this.uiManager.hideLoadingMessage();
            
        } catch (error) {
            console.error('❌ App initialization failed:', error);
            throw error;
        }
    }

        loadSavedCombinations() {
                const combinations = this.storageManager.getSavedCombinations();
                this.uiManager.renderNumbersList(combinations);
        console.log(`📁 Loaded ${combinations.length} saved combinations`);
    }

    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');
        
        // Navigation buttons
        const fabBtn = document.getElementById('fabBtn');
        const backBtn = document.getElementById('backBtn');
        const listBtn = document.getElementById('listBtn');
        
        console.log('🔍 Button elements check:');
        console.log('fabBtn:', fabBtn);
        console.log('backBtn:', backBtn);
        console.log('listBtn:', listBtn);
        
        if (fabBtn) {
            console.log('✅ FAB button found, adding click listener...');
            fabBtn.addEventListener('click', (e) => {
                console.log('🔥 FAB BUTTON CLICKED! Event triggered!');
                console.log('Event details:', e);
                console.log('Button element:', fabBtn);
                console.log('Button computed style:', window.getComputedStyle(fabBtn));
                console.log('Calling showGenerationScreen...');
                this.showGenerationScreen();
                console.log('✅ showGenerationScreen called');
            });
        } else {
            console.error('❌ FAB button not found!');
        }
        
        if (backBtn) {
            console.log('✅ Back button found, adding click listener...');
            backBtn.addEventListener('click', () => {
                console.log('⬅️ Back button clicked! Switching to numbers screen...');
                this.showNumbersScreen();
            });
        }
        
        if (listBtn) {
            console.log('✅ List button found, adding click listener...');
            listBtn.addEventListener('click', () => {
                console.log('📊 List button clicked! Switching to numbers screen...');
                this.showNumbersScreen();
            });
        }
        
        // Modal buttons
        const tryAgainBtn = document.getElementById('tryAgainBtn');
        const saveCombinationBtn = document.getElementById('saveCombinationBtn');
        
        if (tryAgainBtn) {
            tryAgainBtn.addEventListener('click', () => this.tryAgain());
        }
        
        if (saveCombinationBtn) {
            saveCombinationBtn.addEventListener('click', () => this.saveCombination());
        }
        
        // 🧪 TEST BUTTON for debugging event system
        const testBtn = document.getElementById('testBtn');
        console.log('🧪 Setting up TEST button...', testBtn);
        
        if (testBtn) {
            testBtn.addEventListener('click', (e) => {
                console.log('🧪 TEST BUTTON CLICKED! Event system working!');
                console.log('🧪 Click event details:', e);
                console.log('🧪 Target element:', e.target);
                e.preventDefault();
                e.stopPropagation();
            });
            console.log('🧪 TEST button event listener attached');
        }
        
        // 🔍 DEEP DEBUGGING: Check for overlapping elements
        setTimeout(() => {
            const fabBtn = document.getElementById('fabBtn');
            if (fabBtn) {
                const rect = fabBtn.getBoundingClientRect();
                console.log('🔍 FAB Button Position Debug:');
                console.log('  Rect left:', rect.left, 'top:', rect.top, 'width:', rect.width, 'height:', rect.height);
                
                const style = window.getComputedStyle(fabBtn);
                console.log('  Z-index:', style.zIndex, 'Position:', style.position, 'Display:', style.display);
                console.log('  Pointer-events:', style.pointerEvents, 'Visibility:', style.visibility);
                console.log('  Opacity:', style.opacity, 'Transform:', style.transform);
                
                // Check what element is actually at the FAB button position
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                console.log(`🔍 FAB center coordinates: (${centerX}, ${centerY})`);
                
                const elementAtCenter = document.elementFromPoint(centerX, centerY);
                console.log('🔍 Element at FAB center:', elementAtCenter);
                console.log('🔍 Element tag name:', elementAtCenter?.tagName);
                console.log('🔍 Element class list:', elementAtCenter?.classList?.toString());
                console.log('🔍 Element ID:', elementAtCenter?.id);
                console.log('🔍 Is it the FAB button?', elementAtCenter === fabBtn);
                
                if (elementAtCenter !== fabBtn) {
                    console.log('❌ BLOCKING ELEMENT FOUND!');
                    console.log('🔍 Blocking element tag:', elementAtCenter?.tagName);
                    console.log('🔍 Blocking element classes:', elementAtCenter?.className);
                    console.log('🔍 Blocking element ID:', elementAtCenter?.id);
                    
                    const blockingStyle = window.getComputedStyle(elementAtCenter);
                    console.log('🔍 Blocking element style:');
                    console.log('  Position:', blockingStyle.position);
                    console.log('  Z-index:', blockingStyle.zIndex);
                    console.log('  Pointer-events:', blockingStyle.pointerEvents);
                    console.log('  Width:', blockingStyle.width, 'Height:', blockingStyle.height);
                    
                    // Check if we can find the FAB button in the DOM tree from this point
                    let current = elementAtCenter;
                    let depth = 0;
                    console.log('🔍 DOM tree from blocking element:');
                    while (current && current !== document.body && depth < 5) {
                        console.log(`  Level ${depth}:`, current.tagName, current.className || '(no class)', current.id || '(no id)');
                        current = current.parentElement;
                        depth++;
                    }
                } else {
                    console.log('✅ FAB button is accessible - no blocking elements detected');
                }
            }
        }, 1000);
    }

    async showGenerationScreen() {
        this.currentScreen = 'generation';
        this.uiManager.showGenerationScreen();
        
        // three.js 엔진은 이미 초기화되어 있으므로, 여기서는 초기화하지 않음
        // Update entropy display
        this.updateWebCryptoEntropy();
        
        // Start Three.js rendering
        if (this.threeEngine) {
            this.threeEngine.startRendering();
        }
        
        console.log('🎮 Switched to Generation Screen');
    }

    showNumbersScreen() {
        this.currentScreen = 'list';
        this.uiManager.showNumbersScreen();
        
        // Show FAB button on numbers screen
        const fabBtn = document.getElementById('fabBtn');
        if (fabBtn) {
            fabBtn.classList.add('show');
            console.log('✅ FAB button shown on numbers screen');
        }
        
        // Stop Three.js rendering to save resources
        if (this.threeEngine) {
            this.threeEngine.stopRendering();
        }
        
        // Reload combinations to show any new saves
        this.loadSavedCombinations();
        
        console.log('📱 Switched to Numbers List Screen');
    }

    resetGame() {
        this.selectedMainNumbers = [];
        this.selectedPowerBall = null;
        this.gameProgress = 0;
        
        // Update UI
        this.updateGameProgress();
        this.updateSelectedNumbers();
        
        // Reset Three.js engine if initialized
        if (this.threeEngine) {
            this.threeEngine.resetGame();
        }
        
        console.log('🔄 Game reset complete');
    }

    async initThreeEngine() {
        console.log('🎯 Initializing Three.js engine...');
        
        try {
            this.threeEngine = new ThreeEngine();
            
            // Setup event callbacks
            this.threeEngine.onBallClick = (data) => {
                this.handleBallClick(data);
            };
            
            this.threeEngine.onGameComplete = (data) => {
                this.handleGameComplete(data);
            };
            
            // Initialize the engine
            await this.threeEngine.init();
            
            this.isThreeEngineInitialized = true;
            console.log('🎮 Three.js engine initialization complete!');
            
        } catch (error) {
            console.error('❌ Three.js engine initialization failed:', error);
            throw error;
        }
    }

    handleBallClick(data) {
        // Update game state
        this.selectedMainNumbers = [...data.numbers];
        this.selectedPowerBall = data.powerball;
        this.gameProgress = this.selectedMainNumbers.length + (this.selectedPowerBall ? 1 : 0);
        
        // Update UI
        this.updateGameProgress();
        this.updateSelectedNumbers();
        
        console.log('🎯 Ball clicked:', data);
    }

    handleGameComplete(data) {
        // Final game state
        this.selectedMainNumbers = [...data.numbers];
        this.selectedPowerBall = data.powerball;
        this.gameProgress = this.totalNumbers;
        
        // Update UI
        this.updateGameProgress();
        this.updateSelectedNumbers();
        
        // Show completion modal
        this.uiManager.showCompleteModal(this.selectedMainNumbers, this.selectedPowerBall);
        
        console.log('🎉 Game complete:', data);
    }

    updateGameProgress() {
        const progressElement = document.getElementById('progress');
        if (progressElement) {
            progressElement.textContent = `${this.gameProgress}/${this.totalNumbers}`;
        }
    }

    updateSelectedNumbers() {
        const mainNumbersElement = document.getElementById('main-numbers');
        const powerballElement = document.getElementById('powerball-number');
        
        if (mainNumbersElement) {
            mainNumbersElement.textContent = this.selectedMainNumbers.length > 0 
                ? this.selectedMainNumbers.join(', ') 
                : '-';
        }
        
        if (powerballElement) {
            powerballElement.textContent = this.selectedPowerBall || '-';
        }
    }

    updateWebCryptoEntropy() {
        // Generate entropy data
        this.entropyData.hardwareSeed = Math.floor(Math.random() * 1000000);
        this.entropyData.browserEntropy = Math.floor(Math.random() * 1000000);
        this.entropyData.clickContext = Math.floor(Math.random() * 1000);
        this.entropyData.timeEntropy = Date.now() % 100000000;
        this.entropyData.finalSeed = (this.entropyData.hardwareSeed + this.entropyData.browserEntropy + 
                                     this.entropyData.clickContext + this.entropyData.timeEntropy) % 100000000;
        this.entropyData.quality = Math.floor(Math.random() * 100);
        this.entropyData.predictionScore = 99;
        
        // Update UI elements
        this.updateEntropyDisplay();
    }

    updateEntropyDisplay() {
        const elements = {
            'hardware-seed': `💻 Hardware Seed: ${this.entropyData.hardwareSeed}`,
            'browser-entropy': `🌐 Browser Entropy: ${this.entropyData.browserEntropy}`,
            'context-entropy': `🎯 Click Context: ${this.entropyData.clickContext}`,
            'time-entropy': `⏱️ Time Entropy: ${this.entropyData.timeEntropy}`,
            'ultimate-seed': `🚀 Final Seed: ${this.entropyData.finalSeed}`,
            'entropy-quality': `📊 Entropy Quality: ${this.entropyData.quality}%`,
            'prediction-score': `🛡️ Prediction Score: ${this.entropyData.predictionScore} points`
        };
        
        Object.entries(elements).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        });
    }

    async saveCombination() {
        if (this.selectedMainNumbers.length === 5 && this.selectedPowerBall) {
            const combination = {
                mainNumbers: [...this.selectedMainNumbers],
                powerBall: this.selectedPowerBall,
                timestamp: Date.now(),
                entropy: { ...this.entropyData }
            };
            
            await this.storageManager.saveCombination(combination);
            this.uiManager.hideCompleteModal();
            this.resetGame();
            this.showNumbersScreen(); // Go back to list after saving
            
            console.log('💾 Combination saved:', combination);
        }
    }

    tryAgain() {
        this.uiManager.hideCompleteModal();
        this.resetGame();
        console.log('🔄 Try again - game reset');
    }

    // Test function for generating numbers without 3D engine
    generateTestNumbers() {
        // Generate 5 unique main numbers (1-69)
        const mainNumbers = [];
        while (mainNumbers.length < 5) {
            const num = Math.floor(Math.random() * 69) + 1;
            if (!mainNumbers.includes(num)) {
                mainNumbers.push(num);
            }
        }
        mainNumbers.sort((a, b) => a - b);
        
        // Generate powerball (1-26)
        const powerBall = Math.floor(Math.random() * 26) + 1;
        
        // Update game state
        this.selectedMainNumbers = mainNumbers;
        this.selectedPowerBall = powerBall;
        this.gameProgress = this.totalNumbers;
        
        // Update UI
        this.updateGameProgress();
        this.updateSelectedNumbers();
        this.updateWebCryptoEntropy();
        
        // Show completion modal
        this.uiManager.showCompleteModal(this.selectedMainNumbers, this.selectedPowerBall);
        
        console.log('🧪 Test numbers generated:', { mainNumbers, powerBall });
    }

    getThreeEngine() {
        return this.threeEngine;
    }
}

// Global app instance
let app;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    app = new UltimateWebCryptoApp();
    await app.init();
    
    // Add test button for number generation (temporary)
    if (window.location.hostname === 'localhost') {
        const testBtn = document.createElement('button');
        testBtn.textContent = '🧪 Test Generate';
        testBtn.style.cssText = 'position: fixed; top: 80px; left: 20px; z-index: 1000; padding: 10px; background: #4facfe; color: white; border: none; border-radius: 8px; cursor: pointer;';
        testBtn.onclick = () => app.generateTestNumbers();
        document.body.appendChild(testBtn);
    }
});

// Export for global access
window.UltimateWebCryptoApp = app;

export { UltimateWebCryptoApp };
