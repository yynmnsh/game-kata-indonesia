#!/usr/bin/env node
/**
 * Word Data Fetcher for Game Kata Indonesia
 * Run this script to download Indonesian word data from open sources
 * 
 * Usage: node scripts/fetch-words.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🔍 Fetching Indonesian word data from open sources...\n');

// Data sources
const sources = [
    {
        name: 'Wikipedia Frequency Data',
        url: 'https://raw.githubusercontent.com/ardwort/freq-dist-id/master/data/idwiki.csv',
        parser: parseFrequencyCSV
    },
    {
        name: 'Kompas Frequency Data',
        url: 'https://raw.githubusercontent.com/ardwort/freq-dist-id/master/data/kompas.csv',
        parser: parseFrequencyCSV
    },
    {
        name: 'KBBI Dataset',
        url: 'https://raw.githubusercontent.com/Wikidepia/indonesian_datasets/master/dictionary/kbbi/kbbi.txt',
        parser: parseSimpleList
    }
];

let allWords = new Map(); // word -> frequency

// Fetch data from URL
function fetchURL(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Parse frequency CSV format (word,frequency)
function parseFrequencyCSV(data) {
    const lines = data.split('\n');
    const words = [];
    
    for (const line of lines) {
        const [word, freq] = line.split(',');
        if (word && word.length >= 3 && word.length <= 15) {
            const cleaned = word.trim().toLowerCase();
            if (/^[a-z]+$/.test(cleaned)) {
                words.push({ word: cleaned, frequency: parseInt(freq) || 0 });
            }
        }
    }
    
    return words;
}

// Parse simple word list (one word per line)
function parseSimpleList(data) {
    const lines = data.split('\n');
    const words = [];
    
    for (const line of lines) {
        const word = line.trim().toLowerCase();
        if (word && word.length >= 3 && word.length <= 15 && /^[a-z]+$/.test(word)) {
            words.push({ word, frequency: 1 });
        }
    }
    
    return words;
}

// Fetch all sources
async function fetchAllSources() {
    for (const source of sources) {
        try {
            console.log(`📥 Fetching: ${source.name}...`);
            const data = await fetchURL(source.url);
            const words = source.parser(data);
            
            // Add to map
            for (const { word, frequency } of words) {
                if (allWords.has(word)) {
                    allWords.set(word, allWords.get(word) + frequency);
                } else {
                    allWords.set(word, frequency);
                }
            }
            
            console.log(`✅ ${source.name}: ${words.length} words\n`);
        } catch (err) {
            console.log(`❌ Failed to fetch ${source.name}: ${err.message}\n`);
        }
    }
}

// Sort and filter words
function processWords() {
    console.log('⚙️  Processing words...\n');
    
    // Convert to array and sort by frequency
    let wordArray = Array.from(allWords.entries())
        .map(([word, frequency]) => ({ word, frequency }))
        .sort((a, b) => b.frequency - a.frequency);
    
    console.log(`Total unique words: ${wordArray.length}`);
    
    // Filter by length
    const byLength = {};
    for (let len = 3; len <= 15; len++) {
        byLength[len] = wordArray
            .filter(w => w.word.length === len)
            .map(w => w.word);
    }
    
    // Create wordlists object
    const wordlists = {
        indonesian: wordArray.map(w => w.word),
        byLength: byLength,
        common5Letter: byLength[5] ? byLength[5].slice(0, 3000) : [],
        common4Letter: byLength[4] ? byLength[4].slice(0, 2000) : [],
        common6Letter: byLength[6] ? byLength[6].slice(0, 2000) : [],
        metadata: {
            totalWords: wordArray.length,
            generatedAt: new Date().toISOString(),
            sources: sources.map(s => s.name)
        }
    };
    
    return wordlists;
}

// Save to file
function saveWordlists(wordlists) {
    const outputDir = path.join(__dirname, '..', 'data');
    const outputFile = path.join(outputDir, 'wordlists.js');
    
    // Create data directory if not exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const content = `// Indonesian Wordlists
// Generated: ${wordlists.metadata.generatedAt}
// Total words: ${wordlists.metadata.totalWords}

const WORDLISTS = ${JSON.stringify(wordlists, null, 2)};

// For Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WORDLISTS;
}
`;
    
    fs.writeFileSync(outputFile, content);
    console.log(`\n✅ Saved to: ${outputFile}`);
    console.log(`📊 Statistics:`);
    console.log(`   Total words: ${wordlists.metadata.totalWords}`);
    console.log(`   5-letter words: ${wordlists.common5Letter.length}`);
    console.log(`   4-letter words: ${wordlists.common4Letter.length}`);
    console.log(`   6-letter words: ${wordlists.common6Letter.length}`);
}

// Main execution
async function main() {
    try {
        await fetchAllSources();
        
        if (allWords.size === 0) {
            console.log('❌ No words collected. Check your internet connection.');
            console.log('💡 You can still use the fallback wordlist in data/wordlists.js');
            process.exit(1);
        }
        
        const wordlists = processWords();
        saveWordlists(wordlists);
        
        console.log('\n🎉 Success! Word data is ready.');
        console.log('📝 You can now open index.html to play the games.');
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

main();
