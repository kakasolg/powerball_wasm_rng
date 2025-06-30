console.log('💾 Storage Manager loading...');
// Storage Manager for Ultimate WebCrypto Layout
// Handles localStorage operations for saved lottery combinations

export class StorageManager {
    constructor() {
        this.storageKey = 'ultimateWebCryptoLotteryNumbers';
        this.savedCombinations = [];
        this.loadSavedCombinations();
    }

    // Load saved combinations from localStorage
    loadSavedCombinations() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.savedCombinations = JSON.parse(saved);
                console.log(`📁 Loaded ${this.savedCombinations.length} saved combinations`);
            } else {
                this.savedCombinations = [];
                console.log('📁 No saved combinations found');
            }
        } catch (error) {
            console.error('❌ Failed to load saved combinations:', error);
            this.savedCombinations = [];
        }
    }

    // Save combination to localStorage
    saveCombination(combinationOrMainNumbers, powerBall, entropy = 'WebCrypto Hybrid') {
        try {
            let combination;
            
            // Handle both combination object and separate parameters
            if (typeof combinationOrMainNumbers === 'object' && combinationOrMainNumbers.main) {
                // If it's already a combination object
                combination = {
                    ...combinationOrMainNumbers,
                    timestamp: Date.now()
                };
            } else {
                // If it's separate parameters
                combination = {
                    id: Date.now(),
                    main: [...combinationOrMainNumbers].sort((a, b) => a - b),
                    powerball: powerBall,
                    date: new Date().toISOString(),
                    entropy: entropy,
                    timestamp: Date.now()
                };
            }
    
            this.savedCombinations.unshift(combination); // Add to beginning
            
            // Keep only latest 50 combinations to prevent storage bloat
            if (this.savedCombinations.length > 50) {
                this.savedCombinations = this.savedCombinations.slice(0, 50);
            }
    
            localStorage.setItem(this.storageKey, JSON.stringify(this.savedCombinations));
            
            console.log('💾 Combination saved:', combination);
            return combination;
            
        } catch (error) {
            console.error('❌ Failed to save combination:', error);
            throw new Error('Failed to save combination');
        }
    }

    // Delete combination by ID
    deleteCombination(id) {
        try {
            const originalLength = this.savedCombinations.length;
            this.savedCombinations = this.savedCombinations.filter(combo => combo.id !== id);
            
            if (this.savedCombinations.length < originalLength) {
                localStorage.setItem(this.storageKey, JSON.stringify(this.savedCombinations));
                console.log('🗑️ Combination deleted:', id);
                return true;
            } else {
                console.warn('⚠️ Combination not found for deletion:', id);
                return false;
            }
        } catch (error) {
            console.error('❌ Failed to delete combination:', error);
            throw new Error('Failed to delete combination');
        }
    }

    // Get all saved combinations
    getSavedCombinations() {
        return [...this.savedCombinations]; // Return copy to prevent external modification
    }

    // Get combination by ID
    getCombinationById(id) {
        return this.savedCombinations.find(combo => combo.id === id);
    }

    // Get combinations count
    getCount() {
        return this.savedCombinations.length;
    }

    // Clear all combinations
    clearAll() {
        try {
            this.savedCombinations = [];
            localStorage.removeItem(this.storageKey);
            console.log('🧹 All combinations cleared');
            return true;
        } catch (error) {
            console.error('❌ Failed to clear combinations:', error);
            throw new Error('Failed to clear combinations');
        }
    }

    // Export combinations to JSON
    exportCombinations() {
        try {
            const exportData = {
                exportDate: new Date().toISOString(),
                version: '1.0',
                combinations: this.savedCombinations,
                total: this.savedCombinations.length
            };
            
            const jsonString = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            // Create download link
            const a = document.createElement('a');
            a.href = url;
            a.download = `lottery-combinations-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('📤 Combinations exported');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to export combinations:', error);
            throw new Error('Failed to export combinations');
        }
    }

    // Import combinations from JSON
    async importCombinations(file) {
        try {
            const text = await file.text();
            const importData = JSON.parse(text);
            
            if (importData.combinations && Array.isArray(importData.combinations)) {
                // Validate and merge combinations
                const validCombinations = importData.combinations.filter(combo => 
                    combo.main && Array.isArray(combo.main) && combo.main.length === 5 &&
                    combo.powerball && typeof combo.powerball === 'number' &&
                    combo.id && combo.date
                );
                
                // Merge with existing combinations (avoid duplicates by ID)
                const existingIds = new Set(this.savedCombinations.map(c => c.id));
                const newCombinations = validCombinations.filter(c => !existingIds.has(c.id));
                
                this.savedCombinations = [...newCombinations, ...this.savedCombinations];
                
                // Limit to 50 combinations
                if (this.savedCombinations.length > 50) {
                    this.savedCombinations = this.savedCombinations.slice(0, 50);
                }
                
                localStorage.setItem(this.storageKey, JSON.stringify(this.savedCombinations));
                
                console.log(`📥 Imported ${newCombinations.length} new combinations`);
                return newCombinations.length;
                
            } else {
                throw new Error('Invalid file format');
            }
            
        } catch (error) {
            console.error('❌ Failed to import combinations:', error);
            throw new Error('Failed to import combinations: ' + error.message);
        }
    }

    // Get storage usage info
    getStorageInfo() {
        try {
            const data = localStorage.getItem(this.storageKey);
            const sizeInBytes = new Blob([data || '']).size;
            const sizeInKB = (sizeInBytes / 1024).toFixed(2);
            
            return {
                combinations: this.savedCombinations.length,
                sizeBytes: sizeInBytes,
                sizeKB: sizeInKB,
                maxCombinations: 50
            };
        } catch (error) {
            console.error('❌ Failed to get storage info:', error);
            return {
                combinations: 0,
                sizeBytes: 0,
                sizeKB: '0.00',
                maxCombinations: 50
            };
        }
    }

    // Check if localStorage is available
    static isStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
}