// Sarang Kata Game (Spelling Bee)
class SarangKataGame {
    constructor() {
        this.container = document.getElementById('sarang-kata-screen');
        this.settings = getGameSettings('sarang-kata');
        this.puzzle = null;
        this.foundWords = [];
        this.score = 0;
        this.currentWord = '';
    }

    start() {
        const adaptive = getAdaptiveDifficulty('sarang-kata');
        this.settings = {...this.settings, ...adaptive};
        
        this.foundWords = [];
        this.score = 0;
        this.currentWord = '';
        
        if (typeof WORDLISTS !== 'undefined' && WORDLISTS.indonesian) {
            this.puzzle = generateSpellingBee(WORDLISTS.indonesian, this.settings.outerLetters);
        }
        
        if (!this.puzzle) {
            this.puzzle = {
                centerLetter: 'a',
                outerLetters: ['b','c','d','e','f','g'],
                validWords: ['baca', 'dada', 'gada'],
                pangrams: ['abcdefg'],
                maxScore: 100
            };
        }
        
        this.render();
        startGameSession('sarang-kata');
    }

    render() {
        const letters = [this.puzzle.centerLetter, ...this.puzzle.outerLetters];
        
        this.container.innerHTML = `
            <div class="game-header">
                <button class="btn-icon" onclick="returnToMenu()">🏠</button>
                <h1>Sarang Kata</h1>
                <div class="header-buttons">
                    <button class="btn-icon" onclick="showSettings('sarang-kata')">⚙️</button>
                </div>
            </div>
            
            <div class="game-content bee-container">
                <div class="bee-score">Skor: <span id="bee-score">0</span>/${this.puzzle.maxScore}</div>
                <div class="bee-hive">
                    <!-- Outer letters (1-6) -->
                    <button class="hex-btn" onclick="gameInstances['sarang-kata'].addLetter('${letters[1]}')">${letters[1].toUpperCase()}</button>
                    <button class="hex-btn" onclick="gameInstances['sarang-kata'].addLetter('${letters[2]}')">${letters[2].toUpperCase()}</button>
                    <button class="hex-btn" onclick="gameInstances['sarang-kata'].addLetter('${letters[3]}')">${letters[3].toUpperCase()}</button>
                    <button class="hex-btn" onclick="gameInstances['sarang-kata'].addLetter('${letters[4]}')">${letters[4].toUpperCase()}</button>
                    <button class="hex-btn" onclick="gameInstances['sarang-kata'].addLetter('${letters[5]}')">${letters[5].toUpperCase()}</button>
                    <button class="hex-btn" onclick="gameInstances['sarang-kata'].addLetter('${letters[6]}')">${letters[6].toUpperCase()}</button>
                    <!-- Center letter (7) -->
                    <button class="hex-btn center" onclick="gameInstances['sarang-kata'].addLetter('${letters[0]}')">${letters[0].toUpperCase()}</button>
                </div>
                <div class="word-input-area">
                    <input type="text" class="word-input" id="bee-input" placeholder="Ketik kata..." readonly>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button class="btn btn-primary" onclick="gameInstances['sarang-kata'].submitWord()">Submit</button>
                        <button class="btn btn-secondary" onclick="gameInstances['sarang-kata'].clearWord()">Hapus</button>
                        <button class="btn btn-secondary" onclick="gameInstances['sarang-kata'].shuffle()">🔀</button>
                    </div>
                </div>
                <div class="found-words">
                    <h3>Kata: ${this.foundWords.length}</h3>
                    <div class="word-list" id="bee-found-list"></div>
                </div>
            </div>
        `;
    }

    addLetter(letter) {
        this.currentWord += letter.toUpperCase();
        document.getElementById('bee-input').value = this.currentWord;
    }

    clearWord() {
        this.currentWord = '';
        document.getElementById('bee-input').value = '';
    }

    shuffle() {
        this.render();
    }

    submitWord() {
        const word = this.currentWord.toLowerCase();
        
        if (word.length < this.settings.minLength) {
            showMessage(`Kata min ${this.settings.minLength} huruf`, 'error');
            return;
        }
        
        if (!word.includes(this.puzzle.centerLetter)) {
            showMessage('Harus ada huruf tengah', 'error');
            return;
        }
        
        if (this.foundWords.includes(word)) {
            showMessage('Sudah ditemukan', 'error');
            return;
        }
        
        if (!this.puzzle.validWords.includes(word)) {
            showMessage('Kata tidak valid', 'error');
            return;
        }
        
        const points = scoreWord(word, this.puzzle.centerLetter + this.puzzle.outerLetters.join(''));
        this.foundWords.push(word);
        this.score += points;
        
        document.getElementById('bee-score').textContent = this.score;
        this.updateFoundWords();
        this.clearWord();
        
        if (isPangram(word, this.puzzle.centerLetter + this.puzzle.outerLetters.join(''))) {
            showMessage('PANGRAM! +7', 'success');
        } else {
            showMessage(`+${points}`, 'success');
        }
    }

    updateFoundWords() {
        const list = document.getElementById('bee-found-list');
        list.innerHTML = this.foundWords.map(w => 
            `<span class="word-tag">${w}</span>`
        ).join('');
    }
}
