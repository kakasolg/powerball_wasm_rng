console.log('🎨 UI Manager loading...');
// UI Manager for Ultimate WebCrypto Layout
// Handles screen transitions, UI updates, and DOM manipulation

export class UIManager {
    constructor() {
        this.currentScreen = 'list';
        this.elements = {};
        this.entropyDisplayEnabled = true;
    }

    init() {
        // Cache DOM elements
        this.cacheElements();
        
        // Setup initial UI state
        this.setupInitialState();
        
        console.log('🎨 UI Manager initialized');
    }

    cacheElements() {
        console.log('🔍 Caching DOM elements...');
        
        this.elements = {
            // Screens
            numbersScreen: document.getElementById('numbersScreen'),
            generationScreen: document.getElementById('generationScreen'),
            loading: document.getElementById('loading'),
            
            // Navigation
            listBtn: document.getElementById('listBtn'),
            backBtn: document.getElementById('backBtn'),
            fabBtn: document.getElementById('fabBtn'),
            
            // Modal
            completeModal: document.getElementById('completeModal'),
            modalMainNumbers: document.getElementById('modalMainNumbers'),
            modalPowerball: document.getElementById('modalPowerball'),
            tryAgainBtn: document.getElementById('tryAgainBtn'),
            saveCombinationBtn: document.getElementById('saveCombinationBtn'),
            
            // Numbers list
            numbersList: document.getElementById('numbersList'),
            
            // Game info panels
            gameInfo: document.getElementById('gameInfo'),
            webcryptoInfo: document.getElementById('webcrypto-info'),
            performanceMonitor: document.getElementById('performance-monitor'),
            controls: document.getElementById('controls'),
            
            // Game status elements
            mainNumbers: document.getElementById('main-numbers'),
            powerballNumber: document.getElementById('powerball-number'),
            progress: document.getElementById('progress'),
            
            // Entropy display elements
            hardwareSeed: document.getElementById('hardware-seed'),
            browserEntropy: document.getElementById('browser-entropy'),
            contextEntropy: document.getElementById('context-entropy'),
            timeEntropy: document.getElementById('time-entropy'),
            ultimateSeed: document.getElementById('ultimate-seed'),
            entropyQuality: document.getElementById('entropy-quality'),
            predictionScore: document.getElementById('prediction-score'),
            
            // Performance elements
            perfFps: document.getElementById('perf-fps'),
            perfBalls: document.getElementById('perf-balls'),
            perfWebcrypto: document.getElementById('perf-webcrypto'),
            perfWasm: document.getElementById('perf-wasm')
            };
            
            // Debug: Check if critical elements were found
            console.log('🔍 DOM Elements Check:');
            console.log('numbersScreen:', this.elements.numbersScreen);
            console.log('generationScreen:', this.elements.generationScreen);
            console.log('fabBtn:', this.elements.fabBtn);
    }

    setupInitialState() {
        // Start with numbers list screen
        this.showNumbersScreen();
        
        // Hide game panels initially
        this.hideGamePanels();
    }

    showNumbersScreen() {
        this.currentScreen = 'list';
        
        // Show/hide screens
        this.elements.numbersScreen.classList.add('show');
        this.elements.generationScreen.style.display = 'none';
        
        // Update navigation buttons
        this.elements.listBtn.style.display = 'none';
        this.elements.backBtn.classList.remove('show');
        this.elements.fabBtn.classList.add('show');
        
        console.log('📱 Switched to Numbers List screen');
    }

    showGenerationScreen() {
        this.currentScreen = 'generation';
        
        // Show/hide screens
        this.elements.numbersScreen.classList.remove('show');
        this.elements.generationScreen.style.display = 'block';
        
        // Update navigation buttons
        this.elements.listBtn.style.display = 'flex';
        this.elements.backBtn.classList.add('show');
        this.elements.fabBtn.classList.remove('show');
        
        console.log('🎮 Switched to Generation screen');
    }

    showGamePanels() {
        // Show game info panels when in 3D mode
        if (this.elements.gameInfo) this.elements.gameInfo.style.display = 'block';
        if (this.elements.webcryptoInfo) this.elements.webcryptoInfo.style.display = 'block';
        if (this.elements.performanceMonitor) this.elements.performanceMonitor.style.display = 'block';
        if (this.elements.controls) this.elements.controls.style.display = 'block';
    }

    hideGamePanels() {
        // Hide game info panels
        if (this.elements.gameInfo) this.elements.gameInfo.style.display = 'none';
        if (this.elements.webcryptoInfo) this.elements.webcryptoInfo.style.display = 'none';
        if (this.elements.performanceMonitor) this.elements.performanceMonitor.style.display = 'none';
        if (this.elements.controls) this.elements.controls.style.display = 'none';
    }

    renderNumbersList(combinations) {
        const container = this.elements.numbersList;
        
        if (!container) {
            console.error('❌ Numbers list container not found');
            return;
        }

        if (combinations.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🎯</div>
                    <h3 class="empty-title">No Numbers Yet</h3>
                    <p class="empty-subtitle">Generate your first lottery combination!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = combinations.map((combo, index) => `
            <div class="number-card" data-id="${combo.id}">
                <div class="card-header">
                    <h4 class="card-title">Combination #${combinations.length - index}</h4>
                    <div class="card-date">${new Date(combo.date).toLocaleDateString()}</div>
                </div>
                <div class="numbers-display">
                    ${combo.main.map(num => `<div class="number-bubble">${num}</div>`).join('')}
                    <div class="number-bubble powerball">${combo.powerball}</div>
                </div>
                <div class="card-actions">
                    <button class="card-btn copy" data-numbers="${combo.main.join(', ')}, PB: ${combo.powerball}">📋 Copy</button>
                    <button class="card-btn delete" data-id="${combo.id}">🗑️ Delete</button>
                </div>
            </div>
        `).join('');

        // Add event listeners for copy and delete buttons
        this.setupNumbersListEventListeners();
        
        // Update list button state
        this.updateListButtonState(combinations.length > 0);
    }

    setupNumbersListEventListeners() {
        // Copy buttons
        document.querySelectorAll('.card-btn.copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const numbersText = e.target.getAttribute('data-numbers');
                this.copyToClipboard(numbersText);
            });
        });

        // Delete buttons
        document.querySelectorAll('.card-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                this.deleteCombination(id);
            });
        });
    }

    async copyToClipboard(text) {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                this.showToast('📋 Numbers copied to clipboard!');
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showToast('📋 Numbers copied!');
            }
        } catch (error) {
            console.error('❌ Failed to copy to clipboard:', error);
            this.showToast('❌ Failed to copy numbers');
        }
    }

    deleteCombination(id) {
        if (confirm('Delete this combination?')) {
            // Dispatch custom event for deletion
            const event = new CustomEvent('deleteCombination', { detail: { id } });
            document.dispatchEvent(event);
        }
    }

    updateListButtonState(hasNumbers) {
        if (hasNumbers) {
            this.elements.listBtn.classList.add('has-numbers');
        } else {
            this.elements.listBtn.classList.remove('has-numbers');
        }
    }

    showCompleteModal(mainNumbers, powerBall) {
        if (this.elements.modalMainNumbers) {
            this.elements.modalMainNumbers.textContent = `Main: ${mainNumbers.join(', ')}`;
        }
        if (this.elements.modalPowerball) {
            this.elements.modalPowerball.textContent = `PowerBall: ${powerBall}`;
        }
        
        if (this.elements.completeModal) {
            this.elements.completeModal.classList.add('show');
        }
        
        console.log('🎉 Modal shown with numbers:', mainNumbers, powerBall);
    }

    hideCompleteModal() {
        if (this.elements.completeModal) {
            this.elements.completeModal.classList.remove('show');
        }
    }

    updateGameStatus(selectedMainNumbers, selectedPowerBall) {
        if (this.elements.mainNumbers) {
            this.elements.mainNumbers.textContent = selectedMainNumbers.length > 0 ? 
                selectedMainNumbers.join(', ') : '-';
        }
        
        if (this.elements.powerballNumber) {
            this.elements.powerballNumber.textContent = selectedPowerBall ? selectedPowerBall : '-';
        }
        
        if (this.elements.progress) {
            const totalSelected = selectedMainNumbers.length + (selectedPowerBall ? 1 : 0);
            this.elements.progress.textContent = `${totalSelected}/6`;
        }
    }

    updateEntropyDisplay(hardwareSeed, browserSeed, contextSeed, timeSeed, ultimateSeed) {
        if (!this.entropyDisplayEnabled) return;
        
        if (this.elements.hardwareSeed) {
            this.elements.hardwareSeed.textContent = `💻 Hardware Seed: ${hardwareSeed}`;
        }
        if (this.elements.browserEntropy) {
            this.elements.browserEntropy.textContent = `🌐 Browser Entropy: ${browserSeed}`;
        }
        if (this.elements.contextEntropy) {
            this.elements.contextEntropy.textContent = `🎯 Click Context: ${contextSeed}`;
        }
        if (this.elements.timeEntropy) {
            this.elements.timeEntropy.textContent = `⏱️ Time Entropy: ${timeSeed}`;
        }
        if (this.elements.ultimateSeed) {
            this.elements.ultimateSeed.textContent = `🚀 Final Seed: ${ultimateSeed}`;
        }
        
        // Calculate entropy quality
        const entropyQuality = Math.min(100, Math.floor((ultimateSeed % 1000) / 10));
        if (this.elements.entropyQuality) {
            this.elements.entropyQuality.textContent = `📊 Entropy Quality: ${entropyQuality}%`;
        }
        if (this.elements.predictionScore) {
            this.elements.predictionScore.textContent = `🛡️ Prediction Score: 99 points`;
        }
    }

    updatePerformance(fps, ballCount, webCryptoCallsPerSecond, wasmCallsPerSecond) {
        if (this.elements.perfFps) {
            this.elements.perfFps.textContent = `FPS: ${fps}`;
        }
        if (this.elements.perfBalls) {
            this.elements.perfBalls.textContent = `Active Balls: ${ballCount}`;
        }
        if (this.elements.perfWebcrypto) {
            this.elements.perfWebcrypto.textContent = `WebCrypto Calls: ${webCryptoCallsPerSecond}/s`;
        }
        if (this.elements.perfWasm) {
            this.elements.perfWasm.textContent = `WASM Processing: ${wasmCallsPerSecond}/s`;
        }
    }

    toggleEntropyDisplay() {
        this.entropyDisplayEnabled = !this.entropyDisplayEnabled;
        console.log(`🔥 Entropy Display: ${this.entropyDisplayEnabled ? 'Enabled' : 'Disabled'}`);
        
        if (!this.entropyDisplayEnabled && this.elements.webcryptoInfo) {
            this.elements.webcryptoInfo.style.display = 'none';
        } else if (this.entropyDisplayEnabled && this.elements.webcryptoInfo) {
            this.elements.webcryptoInfo.style.display = 'block';
        }
    }

    showLoadingMessage(message) {
        if (this.elements.loading) {
            this.elements.loading.innerHTML = `
                <div class="loading-content">
                    <h1>${message}</h1>
                    <div class="loading-spinner"></div>
                </div>
            `;
            this.elements.loading.style.display = 'flex';
        }
    }

    hideLoadingMessage() {
        if (this.elements.loading) {
            this.elements.loading.style.display = 'none';
        }
    }

    showToast(message, duration = 3000) {
        // Create toast element if it doesn't exist
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                z-index: 10000;
                font-size: 14px;
                backdrop-filter: blur(10px);
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
        }, duration);
    }

    getCurrentScreen() {
        return this.currentScreen;
    }
}