// OKR Copilot JavaScript - Main Application Logic

class OKRCopilot {
    constructor() {
        this.currentOKR = null;
        this.awaitingBaseline = false;
        this.baselineContext = null;
        this.publishedOKRs = JSON.parse(localStorage.getItem('publishedOKRs')) || [];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPublishedOKRs();
    }

    bindEvents() {
        // Main process button
        document.getElementById('process-btn').addEventListener('click', () => {
            this.processOKRInput();
        });

        // Enter key in input textarea
        document.getElementById('okr-input').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.processOKRInput();
            }
        });

        // Baseline submission
        document.getElementById('submit-baseline-btn').addEventListener('click', () => {
            this.submitBaseline();
        });

        // Approve button
        document.getElementById('approve-btn').addEventListener('click', () => {
            this.approveOKR();
        });

        // Edit button
        document.getElementById('edit-btn').addEventListener('click', () => {
            this.showEditSection();
        });

        // Submit edits button
        document.getElementById('submit-edits-btn').addEventListener('click', () => {
            this.submitEdits();
        });
    }

    async processOKRInput() {
        const input = document.getElementById('okr-input').value.trim();
        
        if (!input) {
            alert('Please enter your OKR idea first!');
            return;
        }

        this.showLoading();
        
        try {
            // Simulate processing time for realistic feel
            await this.delay(2000);
            
            const processedOKR = this.transformToOKR(input);
            this.displayResults(processedOKR);
        } catch (error) {
            console.error('Error processing OKR:', error);
            alert('Sorry, there was an error processing your OKR. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    transformToOKR(input) {
        // Core OKR transformation logic following the system prompt rules
        
        const lowerInput = input.toLowerCase();
        
        // Analyze input for theme and domain
        const theme = this.extractTheme(input);
        const objective = this.createObjective(input, theme);
        const keyResults = this.createKeyResults(input, theme);
        const confidence = this.assessConfidence(input, keyResults);
        const needsBaselines = this.checkForMissingBaselines(keyResults);

        return {
            theme,
            objective,
            keyResults,
            confidence,
            needsBaselines
        };
    }

    extractTheme(input) {
        const lowerInput = input.toLowerCase();
        
        // Theme mapping based on common keywords
        const themeKeywords = {
            'Customer Success': ['customer', 'support', 'satisfaction', 'nps', 'retention', 'loyalty', 'service'],
            'Sales Enablement': ['sales', 'crm', 'revenue', 'pipeline', 'lead', 'conversion', 'forecast'],
            'Team Cohesion': ['team', 'culture', 'engagement', 'collaboration', 'trust', 'communication', 'offsite'],
            'Product Innovation': ['product', 'feature', 'development', 'innovation', 'user', 'launch', 'platform'],
            'Operational Excellence': ['process', 'efficiency', 'quality', 'system', 'automation', 'performance'],
            'Growth Strategy': ['growth', 'market', 'expansion', 'acquisition', 'scaling', 'business'],
            'Digital Transformation': ['digital', 'technology', 'automation', 'data', 'analytics', 'integration']
        };

        for (const [theme, keywords] of Object.entries(themeKeywords)) {
            if (keywords.some(keyword => lowerInput.includes(keyword))) {
                return theme;
            }
        }

        return 'Strategic Initiative';
    }

    createObjective(input, theme) {
        const lowerInput = input.toLowerCase();
        
        // Remove tool words as per system prompt
        const toolWords = ['crm', 'jira', 'dashboard', 'portal', 'confluence', 'template', 'system', 'platform'];
        let cleanInput = input;
        toolWords.forEach(tool => {
            const regex = new RegExp(`\\b${tool}\\b`, 'gi');
            cleanInput = cleanInput.replace(regex, '');
        });

        // Extract core intent and transform to Action + What + Why format
        if (lowerInput.includes('customer') || lowerInput.includes('support')) {
            return 'Elevate customer support experience to deepen loyalty and drive sustainable growth';
        } else if (lowerInput.includes('sales') || lowerInput.includes('revenue')) {
            return 'Enhance sales pipeline visibility and effectiveness to accelerate predictable revenue growth';
        } else if (lowerInput.includes('team') || lowerInput.includes('culture')) {
            return 'Cultivate a high-trust collaborative culture that fuels innovation and performance';
        } else if (lowerInput.includes('product') || lowerInput.includes('launch')) {
            return 'Accelerate product innovation delivery to capture market opportunities and exceed user expectations';
        } else if (lowerInput.includes('process') || lowerInput.includes('efficiency')) {
            return 'Transform operational processes to achieve excellence and unlock organizational potential';
        } else if (lowerInput.includes('growth') || lowerInput.includes('expand')) {
            return 'Drive strategic growth initiatives to expand market presence and increase competitive advantage';
        } else {
            return 'Execute strategic initiative to achieve organizational excellence and deliver exceptional value';
        }
    }

    createKeyResults(input, theme) {
        const lowerInput = input.toLowerCase();
        const keyResults = [];

        // Generate theme-appropriate KRs with Metric + Now + Future format
        if (theme === 'Customer Success') {
            keyResults.push('Reduce average first-response time from 8 hours to 2 hours');
            keyResults.push('Increase Net Promoter Score from 30 to 45');
            keyResults.push('Improve SLA resolution rate from 65% to 95%');
            keyResults.push('Boost customer retention rate from 82% to 92%');
        } else if (theme === 'Sales Enablement') {
            keyResults.push('Increase CRM data completeness from 45% to 95%');
            keyResults.push('Improve forecast accuracy from 60% to 90%');
            keyResults.push('Reduce average sales cycle from 45 days to 25 days');
            keyResults.push('Boost qualified lead conversion from 15% to 35%');
        } else if (theme === 'Team Cohesion') {
            keyResults.push('Raise team trust index from 6.2 to 8.5');
            keyResults.push('Increase peer recognition instances from 15 to 45 per month');
            keyResults.push('Reduce voluntary attrition from 11% to 5%');
            keyResults.push('Improve collaboration score from 7.1 to 9.0');
        } else if (theme === 'Product Innovation') {
            keyResults.push('Accelerate feature delivery velocity from 12 to 20 per quarter');
            keyResults.push('Increase user adoption of new features from 25% to 65%');
            keyResults.push('Reduce time-to-market from 120 days to 75 days');
            keyResults.push('Boost user satisfaction rating from 3.8 to 4.6');
        } else if (theme === 'Operational Excellence') {
            keyResults.push('Reduce process cycle time from 8 days to 3 days');
            keyResults.push('Increase automation coverage from 30% to 80%');
            keyResults.push('Improve quality score from 85% to 98%');
            keyResults.push('Decrease operational costs by 25% while maintaining service levels');
        } else {
            // Generic high-quality KRs
            keyResults.push('Increase key performance metric from current baseline to 40% improvement');
            keyResults.push('Reduce process inefficiency from 25% to 8%');
            keyResults.push('Boost stakeholder satisfaction from 6.5 to 8.8');
            keyResults.push('Achieve 95% completion rate of strategic milestones');
        }

        // Return 3-4 KRs as per system prompt
        return keyResults.slice(0, Math.floor(Math.random() * 2) + 3);
    }

    assessConfidence(input, keyResults) {
        // Assess confidence based on input quality and specificity
        const specificityScore = this.calculateSpecificity(input);
        const clarityScore = this.calculateClarity(input);
        
        const overallScore = (specificityScore + clarityScore) / 2;
        
        if (overallScore >= 0.8) return 'High';
        if (overallScore >= 0.6) return 'Medium';
        return 'Low';
    }

    calculateSpecificity(input) {
        const specificWords = ['increase', 'decrease', 'improve', 'reduce', 'achieve', 'reach', 'by', 'from', 'to', '%'];
        const words = input.toLowerCase().split(/\s+/);
        const specificCount = words.filter(word => specificWords.some(sw => word.includes(sw))).length;
        return Math.min(specificCount / words.length * 4, 1);
    }

    calculateClarity(input) {
        const clarityIndicators = ['goal', 'objective', 'target', 'result', 'outcome', 'measure', 'metric'];
        const lowerInput = input.toLowerCase();
        const clarityScore = clarityIndicators.filter(indicator => lowerInput.includes(indicator)).length;
        return Math.min(clarityScore / 3, 1);
    }

    checkForMissingBaselines(keyResults) {
        // Check for KRs that might need baseline clarification
        const missingBaselines = [];
        
        keyResults.forEach((kr, index) => {
            if (kr.includes('current baseline') || kr.includes('from current')) {
                missingBaselines.push({
                    index,
                    question: `What is the current baseline for "${kr.split(' ')[1]} ${kr.split(' ')[2]}" so I can format it as 'Metric + Now + Future'?`
                });
            }
        });

        return missingBaselines;
    }

    displayResults(okr) {
        this.currentOKR = okr;
        
        // Show results section
        document.getElementById('results-section').style.display = 'block';
        
        // Populate results
        document.getElementById('theme-result').textContent = okr.theme;
        document.getElementById('objective-result').textContent = okr.objective;
        
        const keyResultsList = document.getElementById('key-results-list');
        keyResultsList.innerHTML = '';
        okr.keyResults.forEach(kr => {
            const li = document.createElement('li');
            li.textContent = kr;
            keyResultsList.appendChild(li);
        });
        
        // Set confidence badge
        const confidenceBadge = document.getElementById('confidence-badge');
        confidenceBadge.textContent = okr.confidence;
        confidenceBadge.className = `confidence-badge ${okr.confidence.toLowerCase()}`;
        
        // Handle baseline requests
        if (okr.needsBaselines && okr.needsBaselines.length > 0) {
            this.showBaselineRequest(okr.needsBaselines[0]);
        } else {
            this.showActionButtons();
        }
        
        // Scroll to results
        document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
    }

    showBaselineRequest(baselineRequest) {
        this.awaitingBaseline = true;
        this.baselineContext = baselineRequest;
        
        document.getElementById('baseline-question').textContent = baselineRequest.question;
        document.getElementById('baseline-request').style.display = 'block';
        document.getElementById('action-buttons').style.display = 'none';
    }

    submitBaseline() {
        const baselineValue = document.getElementById('baseline-input').value.trim();
        
        if (!baselineValue) {
            alert('Please enter the baseline value');
            return;
        }

        // Update the KR with the provided baseline
        const krIndex = this.baselineContext.index;
        const originalKR = this.currentOKR.keyResults[krIndex];
        const updatedKR = originalKR.replace('current baseline', baselineValue);
        this.currentOKR.keyResults[krIndex] = updatedKR;

        // Update display
        const keyResultsList = document.getElementById('key-results-list');
        keyResultsList.children[krIndex].textContent = updatedKR;

        // Hide baseline request and show action buttons
        document.getElementById('baseline-request').style.display = 'none';
        this.showActionButtons();
        
        this.awaitingBaseline = false;
        this.baselineContext = null;
    }

    showActionButtons() {
        document.getElementById('action-buttons').style.display = 'flex';
    }

    approveOKR() {
        if (!this.currentOKR) return;

        // Create JSON payload as specified in system prompt
        const jsonPayload = {
            theme: this.currentOKR.theme,
            objective: this.currentOKR.objective,
            keyResults: this.currentOKR.keyResults
        };

        // Add to published OKRs
        const publishedOKR = {
            ...jsonPayload,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };

        this.publishedOKRs.unshift(publishedOKR);
        localStorage.setItem('publishedOKRs', JSON.stringify(this.publishedOKRs));

        // Add to sticky board
        this.addStickyNote(publishedOKR);

        // Show success message
        this.showSuccessMessage();

        // Reset form
        this.resetForm();
    }

    showEditSection() {
        document.getElementById('edit-section').style.display = 'block';
        document.getElementById('edit-input').focus();
    }

    async submitEdits() {
        const editRequest = document.getElementById('edit-input').value.trim();
        
        if (!editRequest) {
            alert('Please describe what changes you\'d like');
            return;
        }

        this.showLoading();

        try {
            // Simulate processing edit request
            await this.delay(1500);
            
            // Apply edits to current OKR (simplified logic)
            const updatedOKR = this.applyEdits(this.currentOKR, editRequest);
            this.displayResults(updatedOKR);
            
            // Hide edit section
            document.getElementById('edit-section').style.display = 'none';
            document.getElementById('edit-input').value = '';
            
        } catch (error) {
            console.error('Error processing edits:', error);
            alert('Sorry, there was an error processing your edits. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    applyEdits(okr, editRequest) {
        // Simplified edit logic - in a real implementation, this would be more sophisticated
        const lowerEdit = editRequest.toLowerCase();
        
        if (lowerEdit.includes('more specific') || lowerEdit.includes('specific')) {
            // Make metrics more specific
            okr.keyResults = okr.keyResults.map(kr => {
                if (kr.includes('40% improvement')) {
                    return kr.replace('40% improvement', '45% improvement by Q3');
                }
                return kr;
            });
        }
        
        if (lowerEdit.includes('different theme')) {
            okr.theme = 'Strategic Excellence';
        }
        
        if (lowerEdit.includes('shorter') || lowerEdit.includes('concise')) {
            okr.objective = okr.objective.split(' ').slice(0, 10).join(' ');
        }

        // Increase confidence after edits
        okr.confidence = 'High';
        
        return okr;
    }

    addStickyNote(okr) {
        const stickyBoard = document.getElementById('sticky-board');
        
        const stickyNote = document.createElement('div');
        stickyNote.className = 'sticky-note new';
        
        const timestamp = new Date(okr.timestamp).toLocaleDateString();
        
        stickyNote.innerHTML = `
            <div class="theme">${okr.theme}</div>
            <div class="objective">${okr.objective}</div>
            <ul class="key-results">
                ${okr.keyResults.map(kr => `<li>${kr}</li>`).join('')}
            </ul>
            <div class="timestamp">${timestamp}</div>
        `;
        
        stickyBoard.insertBefore(stickyNote, stickyBoard.firstChild);
    }

    loadPublishedOKRs() {
        const stickyBoard = document.getElementById('sticky-board');
        
        if (this.publishedOKRs.length === 0) {
            // Add some sample OKRs for demonstration
            const sampleOKRs = [
                {
                    theme: 'Customer Success',
                    objective: 'Elevate customer support experience to deepen loyalty and drive sustainable growth',
                    keyResults: [
                        'Reduce average first-response time from 8 hours to 2 hours',
                        'Increase Net Promoter Score from 30 to 45',
                        'Improve SLA resolution rate from 65% to 95%'
                    ],
                    timestamp: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    theme: 'Product Innovation',
                    objective: 'Accelerate product innovation delivery to capture market opportunities',
                    keyResults: [
                        'Increase feature delivery velocity from 12 to 20 per quarter',
                        'Boost user adoption of new features from 25% to 65%',
                        'Reduce time-to-market from 120 days to 75 days'
                    ],
                    timestamp: new Date(Date.now() - 172800000).toISOString()
                }
            ];
            
            sampleOKRs.forEach(okr => this.addStickyNote(okr));
        } else {
            this.publishedOKRs.forEach(okr => this.addStickyNote(okr));
        }
    }

    showSuccessMessage() {
        // Create and show success toast
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            z-index: 1001;
            font-weight: 600;
            animation: slideInRight 0.5s ease-out;
        `;
        toast.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            OKR Published Successfully!
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    resetForm() {
        document.getElementById('okr-input').value = '';
        document.getElementById('results-section').style.display = 'none';
        document.getElementById('baseline-request').style.display = 'none';
        document.getElementById('edit-section').style.display = 'none';
        this.currentOKR = null;
        
        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showLoading() {
        document.getElementById('loading-overlay').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loading-overlay').style.display = 'none';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OKRCopilot();
});

// Add some CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 