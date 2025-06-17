const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory storage for published OKRs (in production, use a database)
let publishedOKRs = [];

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to process OKR input
app.post('/api/process-okr', async (req, res) => {
    try {
        const { input } = req.body;
        
        if (!input || input.trim().length === 0) {
            return res.status(400).json({ error: 'Input is required' });
        }

        // Simulate processing delay for realistic UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Process the OKR using the same logic as the frontend
        const processedOKR = processOKRInput(input);
        
        res.json(processedOKR);
    } catch (error) {
        console.error('Error processing OKR:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to publish approved OKRs
app.post('/api/publish-okr', (req, res) => {
    try {
        const { theme, objective, keyResults } = req.body;
        
        if (!theme || !objective || !keyResults || !Array.isArray(keyResults)) {
            return res.status(400).json({ error: 'Invalid OKR data' });
        }

        const publishedOKR = {
            id: Date.now(),
            theme,
            objective,
            keyResults,
            timestamp: new Date().toISOString()
        };

        publishedOKRs.unshift(publishedOKR);
        
        // Keep only the last 50 OKRs
        if (publishedOKRs.length > 50) {
            publishedOKRs = publishedOKRs.slice(0, 50);
        }

        res.json({ success: true, okr: publishedOKR });
    } catch (error) {
        console.error('Error publishing OKR:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to get published OKRs
app.get('/api/published-okrs', (req, res) => {
    res.json(publishedOKRs);
});

// OKR Processing Logic (same as frontend)
function processOKRInput(input) {
    const theme = extractTheme(input);
    const objective = createObjective(input, theme);
    const keyResults = createKeyResults(input, theme);
    const confidence = assessConfidence(input);
    const needsBaselines = checkForMissingBaselines(keyResults);

    return {
        theme,
        objective,
        keyResults,
        confidence,
        needsBaselines
    };
}

function extractTheme(input) {
    const lowerInput = input.toLowerCase();
    
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

function createObjective(input, theme) {
    const lowerInput = input.toLowerCase();
    
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

function createKeyResults(input, theme) {
    const keyResults = [];

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
        keyResults.push('Increase key performance metric from current baseline to 40% improvement');
        keyResults.push('Reduce process inefficiency from 25% to 8%');
        keyResults.push('Boost stakeholder satisfaction from 6.5 to 8.8');
        keyResults.push('Achieve 95% completion rate of strategic milestones');
    }

    return keyResults.slice(0, Math.floor(Math.random() * 2) + 3);
}

function assessConfidence(input) {
    const specificWords = ['increase', 'decrease', 'improve', 'reduce', 'achieve', 'reach', 'by', 'from', 'to', '%'];
    const clarityIndicators = ['goal', 'objective', 'target', 'result', 'outcome', 'measure', 'metric'];
    
    const words = input.toLowerCase().split(/\s+/);
    const specificCount = words.filter(word => specificWords.some(sw => word.includes(sw))).length;
    const clarityCount = clarityIndicators.filter(indicator => input.toLowerCase().includes(indicator)).length;
    
    const specificityScore = Math.min(specificCount / words.length * 4, 1);
    const clarityScore = Math.min(clarityCount / 3, 1);
    const overallScore = (specificityScore + clarityScore) / 2;
    
    if (overallScore >= 0.8) return 'High';
    if (overallScore >= 0.6) return 'Medium';
    return 'Low';
}

function checkForMissingBaselines(keyResults) {
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎯 OKR Copilot server running on http://localhost:${PORT}`);
    console.log('📊 Ready to transform messy ideas into elite OKRs!');
});

module.exports = app; 