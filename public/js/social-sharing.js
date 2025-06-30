/**
 * 📤 Powerball Superposition - Social Sharing System
 * Handle sharing of quantum lottery results across social platforms
 */

class SocialSharing {
    constructor() {
        this.shareData = null;
        this.shareTemplates = this.initializeShareTemplates();
        
        console.log('📤 Social Sharing System initialized');
    }

    /**
     * Initialize social media share templates
     * @returns {Object} Share templates for different platforms
     */
    initializeShareTemplates() {
        return {
            twitter: {
                quantum: [
                    "My lottery numbers just quantum tunneled from {universes} parallel universes! 🌀⚛️ {numbers} #PowerballSuperposition #QuantumLottery",
                    "Waited {qubitHours} Qubit-Hours for these numbers. Totally worth it! ⚡🎯 {numbers} #EngineeredUnpredictability",
                    "Schrödinger's cat personally selected my Powerball number: {powerball} 🐱✨ {numbers} #QuantumPhysics",
                    "These numbers violated Bell's inequality {quality}% of the time! 📊⚛️ {numbers} #QuantumMechanics",
                    "My quantum computer is {quality}% sure these numbers came from the future 🚀🔮 {numbers}",
                    "Just collapsed {count} wave functions into winning numbers! Physics is wild! 🌊⚛️ {numbers}"
                ],
                humorous: [
                    "My quantum computer caught Monday Blues while generating these numbers 😴⚛️ {numbers} #QuantumProblems",
                    "Einstein said God doesn't play dice, so my computer is rolling them instead 🎲⚛️ {numbers}",
                    "Downloaded more RAM for my quantum computer to generate: {numbers} 💾🤖 #TechHumor",
                    "Reality.exe crashed while making these numbers, but they turned out great! 💻⚛️ {numbers}",
                    "My quantum computer needed coffee to generate: {numbers} ☕🤖 #QuantumCaffeine"
                ],
                simple: [
                    "Generated with quantum-grade randomness: {numbers} 🎯⚛️ #PowerballSuperposition",
                    "Scientifically engineered lottery numbers: {numbers} 🔬🎰 #EngineeredUnpredictability",
                    "These numbers have {quality}% quantum purity: {numbers} ✨⚛️ #QuantumLottery"
                ]
            },
            
            facebook: {
                story: [
                    "🎯 Just used the most over-engineered lottery number generator ever created!\n\nMy numbers: {numbers}\nPowerball: {powerball}\n\n⚛️ Generated using quantum superposition (okay, it's really just WebCrypto, but quantum sounds cooler)\n🌌 Scanned {universes} parallel universes\n⏱️ Used {qubitHours} Qubit-Hours of processing time\n\nNobody actually understands quantum mechanics anyway, so these numbers are as good as any! 😂\n\n#PowerballSuperposition #QuantumHumor #LotteryNumbers"
                ],
                simple: [
                    "🎲 Generated my Powerball numbers with some seriously fancy technology: {numbers} (Powerball: {powerball})\n\n⚛️ Quantum purity: {quality}%\n🌌 Universes scanned: {universes}\n\nWorth a shot! 🤞 #PowerballSuperposition"
                ]
            },

            instagram: {
                story: [
                    "🎯✨ QUANTUM LOTTERY NUMBERS ✨⚛️\n\n{numbers}\nPowerball: {powerball}\n\n🔬 Quantum purity: {quality}%\n🌌 Parallel universes: {universes}\n⚡ Qubit-Hours: {qubitHours}\n\n#PowerballSuperposition #QuantumLottery #EngineeredUnpredictability #LotteryNumbers #QuantumPhysics #TechHumor"
                ]
            },

            linkedin: {
                professional: [
                    "Leveraging quantum computing principles for optimal lottery number generation. \n\nResults: {numbers} (Powerball: {powerball})\n\n✅ Quantum-grade entropy: {quality}%\n✅ Multi-universe analysis: {universes} scenarios\n✅ Computational efficiency: {qubitHours} Qubit-Hours\n\nSometimes you need to apply enterprise-level technology to everyday problems. 😄\n\n#Innovation #QuantumComputing #TechHumor #Powerball"
                ]
            },

            reddit: {
                casual: [
                    "Used a quantum lottery number generator and got: {numbers} (PB: {powerball})\n\nApparently it scanned {universes} parallel universes and used {qubitHours} Qubit-Hours of processing time. The quantum computer also caught Monday Blues during generation. 😂\n\nQuantum purity: {quality}%\n\nThoughts? Still probably won't win, but at least science was involved!"
                ],
                technical: [
                    "Built a WebCrypto-based lottery number generator with quantum humor overlay:\n\nGenerated: {numbers} | Powerball: {powerball}\n\nTechnical specs:\n- Hardware entropy via WebCrypto API\n- Browser context entropy compilation\n- High-resolution timestamp seeding\n- {quality}% quantum purity rating\n\nThe comedy loading messages are the real MVP though. Sample: \"Quantum computer caught Monday Blues\" 😄"
                ]
            }
        };
    }

    /**
     * Prepare share data from generation results
     * @param {Object} results - Quantum generation results
     * @param {Object} analysis - Similarity analysis results
     */
    prepareShareData(results, analysis = null) {
        this.shareData = {
            numbers: results.mainNumbers.join(' '),
            numbersWithDashes: results.mainNumbers.join('-'),
            powerball: results.powerball,
            qubitHours: results.metadata.qubitHours,
            universes: results.metadata.universesSanned.toLocaleString(),
            quality: results.metadata.entropyQuality,
            count: results.mainNumbers.length,
            timestamp: new Date().toLocaleDateString(),
            analysis: analysis ? {
                maxSimilarity: analysis.maxSimilarity,
                topGrade: analysis.topGrade,
                totalAnalyzed: analysis.totalAnalyzed
            } : null
        };

        console.log('📤 Share data prepared:', this.shareData);
    }

    /**
     * Generate share text for specific platform and style
     * @param {string} platform - Target platform (twitter, facebook, etc.)
     * @param {string} style - Message style (quantum, humorous, simple, etc.)
     * @returns {string} Formatted share text
     */
    generateShareText(platform = 'twitter', style = 'quantum') {
        if (!this.shareData) {
            console.error('📤 No share data prepared');
            return 'Check out this quantum lottery number generator!';
        }

        const templates = this.shareTemplates[platform]?.[style] || this.shareTemplates.twitter.simple;
        const template = templates[Math.floor(Math.random() * templates.length)];

        return this.replaceTemplatePlaceholders(template);
    }

    /**
     * Replace template placeholders with actual data
     * @param {string} template - Template string with placeholders
     * @returns {string} Text with placeholders replaced
     */
    replaceTemplatePlaceholders(template) {
        if (!this.shareData) return template;

        return template
            .replace(/{numbers}/g, this.shareData.numbers)
            .replace(/{numbersWithDashes}/g, this.shareData.numbersWithDashes)
            .replace(/{powerball}/g, this.shareData.powerball)
            .replace(/{qubitHours}/g, this.shareData.qubitHours)
            .replace(/{universes}/g, this.shareData.universes)
            .replace(/{quality}/g, this.shareData.quality)
            .replace(/{count}/g, this.shareData.count)
            .replace(/{timestamp}/g, this.shareData.timestamp);
    }

    /**
     * Share via native Web Share API
     * @param {string} style - Message style
     * @returns {Promise<boolean>} Success status
     */
    async shareNative(style = 'quantum') {
        if (!navigator.share) {
            console.warn('📤 Native sharing not supported');
            return false;
        }

        try {
            const shareText = this.generateShareText('twitter', style);
            
            await navigator.share({
                title: '⚛️ Powerball Superposition',
                text: shareText,
                url: window.location.href
            });

            console.log('📤 Native share successful');
            return true;
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('📤 Native share failed:', error);
            }
            return false;
        }
    }

    /**
     * Share to Twitter
     * @param {string} style - Message style
     */
    shareToTwitter(style = 'quantum') {
        const text = this.generateShareText('twitter', style);
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
        
        this.openShareWindow(shareUrl, 'Twitter');
    }

    /**
     * Share to Facebook
     * @param {string} style - Message style
     */
    shareToFacebook(style = 'simple') {
        const text = this.generateShareText('facebook', style);
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`;
        
        this.openShareWindow(shareUrl, 'Facebook');
    }

    /**
     * Share to LinkedIn
     * @param {string} style - Message style
     */
    shareToLinkedIn(style = 'professional') {
        const text = this.generateShareText('linkedin', style);
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodeURIComponent(text)}`;
        
        this.openShareWindow(shareUrl, 'LinkedIn');
    }

    /**
     * Share to Reddit
     * @param {string} style - Message style
     */
    shareToReddit(style = 'casual') {
        const text = this.generateShareText('reddit', style);
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('⚛️ Quantum Lottery Number Generator Results');
        const shareUrl = `https://reddit.com/submit?url=${url}&title=${title}&text=${encodeURIComponent(text)}`;
        
        this.openShareWindow(shareUrl, 'Reddit');
    }

    /**
     * Copy share text to clipboard
     * @param {string} platform - Target platform
     * @param {string} style - Message style
     * @returns {Promise<boolean>} Success status
     */
    async copyToClipboard(platform = 'twitter', style = 'quantum') {
        try {
            const text = this.generateShareText(platform, style);
            await navigator.clipboard.writeText(text);
            
            console.log('📤 Text copied to clipboard');
            
            // Show visual feedback
            this.showCopyFeedback();
            
            return true;
        } catch (error) {
            console.error('📤 Copy to clipboard failed:', error);
            
            // Fallback: select text method
            return this.fallbackCopy(this.generateShareText(platform, style));
        }
    }

    /**
     * Fallback copy method for older browsers
     * @param {string} text - Text to copy
     * @returns {boolean} Success status
     */
    fallbackCopy(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            
            textArea.select();
            const success = document.execCommand('copy');
            
            document.body.removeChild(textArea);
            
            if (success) {
                this.showCopyFeedback();
            }
            
            return success;
        } catch (error) {
            console.error('📤 Fallback copy failed:', error);
            return false;
        }
    }

    /**
     * Create shareable image with results
     * @param {HTMLElement} element - Element to capture
     * @returns {Promise<string>} Data URL of generated image
     */
    async createShareableImage(element) {
        try {
            // This would require html2canvas library in a real implementation
            // For now, return a placeholder
            console.log('📤 Image sharing would require html2canvas library');
            return null;
        } catch (error) {
            console.error('📤 Image creation failed:', error);
            return null;
        }
    }

    /**
     * Generate QR code with share data
     * @returns {string} QR code data URL
     */
    generateQRCode() {
        // This would require a QR code library in a real implementation
        const shareUrl = window.location.href;
        const text = this.generateShareText('twitter', 'simple');
        
        console.log('📤 QR code generation would require QR library');
        console.log('📤 QR data:', { url: shareUrl, text });
        
        return null;
    }

    /**
     * Download results as text file
     * @param {string} format - File format (txt, json, csv)
     */
    downloadResults(format = 'txt') {
        if (!this.shareData) {
            console.error('📤 No share data to download');
            return;
        }

        let content = '';
        let filename = `powerball-superposition-${Date.now()}`;
        let mimeType = 'text/plain';

        switch (format) {
            case 'json':
                content = JSON.stringify(this.shareData, null, 2);
                filename += '.json';
                mimeType = 'application/json';
                break;
                
            case 'csv':
                content = this.generateCSVContent();
                filename += '.csv';
                mimeType = 'text/csv';
                break;
                
            default: // txt
                content = this.generateTextContent();
                filename += '.txt';
                break;
        }

        this.downloadFile(content, filename, mimeType);
    }

    /**
     * Generate text file content
     * @returns {string} Formatted text content
     */
    generateTextContent() {
        return `⚛️ Powerball Superposition - Quantum Lottery Results
Generated: ${this.shareData.timestamp}

WINNING NUMBERS:
Main Numbers: ${this.shareData.numbers}
Powerball: ${this.shareData.powerball}

QUANTUM SPECIFICATIONS:
Quantum Purity: ${this.shareData.quality}%
Parallel Universes Scanned: ${this.shareData.universes}
Qubit-Hours Consumed: ${this.shareData.qubitHours}

DISCLAIMER:
This quantum computer is actually just a very fast calculator.
Nobody actually understands quantum mechanics anyway.
Your odds are still 1 in 300 million. Good luck!

Generated with Powerball Superposition
"Engineered Unpredictability"
`;
    }

    /**
     * Generate CSV file content
     * @returns {string} CSV formatted content
     */
    generateCSVContent() {
        const numbers = this.shareData.numbers.split(' ');
        return `Date,Number1,Number2,Number3,Number4,Number5,Powerball,QubitHours,Universes,Quality
${this.shareData.timestamp},${numbers.join(',')},${this.shareData.powerball},${this.shareData.qubitHours},${this.shareData.universes.replace(/,/g, '')},${this.shareData.quality}`;
    }

    /**
     * Download file utility
     * @param {string} content - File content
     * @param {string} filename - File name
     * @param {string} mimeType - MIME type
     */
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        console.log(`📤 Downloaded ${filename}`);
    }

    /**
     * Open share window
     * @param {string} url - Share URL
     * @param {string} platform - Platform name
     */
    openShareWindow(url, platform) {
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        const popup = window.open(
            url,
            `share-${platform}`,
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );

        if (popup) {
            popup.focus();
            console.log(`📤 Opened ${platform} share window`);
        } else {
            console.warn(`📤 Popup blocked for ${platform} share`);
            // Fallback: open in same window
            window.open(url, '_blank');
        }
    }

    /**
     * Show visual feedback for copy action
     */
    showCopyFeedback() {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.textContent = '📋 Copied to clipboard!';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--probability-gold, #ffd700);
            color: var(--electron-black, #000);
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
     * Get sharing statistics
     * @returns {Object} Sharing system stats
     */
    getStatistics() {
        return {
            shareDataPrepared: !!this.shareData,
            nativeShareSupported: !!navigator.share,
            clipboardSupported: !!navigator.clipboard,
            availablePlatforms: Object.keys(this.shareTemplates),
            version: '1.0.0'
        };
    }
}

// Add CSS for copy feedback animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
}
`;
document.head.appendChild(style);

// Export for global use
window.SocialSharing = SocialSharing;

// Initialize global instance
window.socialSharing = new SocialSharing();

console.log('📤 Social Sharing System module loaded');