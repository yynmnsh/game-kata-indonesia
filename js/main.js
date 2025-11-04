// Main application controller
let currentGame = null;
let gameInstances = {};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    checkAndLoadWordData();
});

// Check if word data is loaded, show warning if not
function checkAndLoadWordData() {
    if (typeof WORDLISTS === 'undefined' || !WORDLISTS) {
        showMessage('Peringatan: Data kata belum dimuat. Jalankan scripts/fetch-words.js terlebih dahulu.', 'error', 5000);
    }
}

// Start a game
function startGame(gameName) {
    // Hide menu
    document.getElementById('menu-screen').classList.remove('active');
    
    // Show game screen
    const gameScreen = document.getElementById(`${gameName}-screen`);
    gameScreen.classList.add('active');
    
    currentGame = gameName;
    
    // Initialize game if not already initialized
    if (!gameInstances[gameName]) {
        switch(gameName) {
            case 'katla':
                gameInstances[gameName] = new KatlaGame();
                break;
            case 'susun-kata':
                gameInstances[gameName] = new SusunKataGame();
                break;
            case 'sarang-kata':
                gameInstances[gameName] = new SarangKataGame();
                break;
            case 'kaitan':
                gameInstances[gameName] = new KaitanGame();
                break;
            case 'tts-mini':
                gameInstances[gameName] = new TTSMiniGame();
                break;
        }
    }
    
    // Start/reset the game
    gameInstances[gameName].start();
}

// Return to menu
function returnToMenu() {
    // Hide all game screens
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show menu
    document.getElementById('menu-screen').classList.add('active');
    
    currentGame = null;
}

// Show stats modal
function showStats() {
    const modal = document.getElementById('stats-modal');
    const content = document.getElementById('stats-content');
    
    const stats = getGameStats();
    
    let html = '';
    for (const [game, data] of Object.entries(stats)) {
        const gameName = getGameDisplayName(game);
        html += `
            <div class="stat-section">
                <h3>${gameName}</h3>
                <div class="stat-grid">
                    <div class="stat-item">
                        <div class="stat-value">${data.played || 0}</div>
                        <div class="stat-label">Dimainkan</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${data.won || 0}</div>
                        <div class="stat-label">Menang</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${data.winRate || 0}%</div>
                        <div class="stat-label">Win Rate</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${data.currentStreak || 0}</div>
                        <div class="stat-label">Streak</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    content.innerHTML = html || '<p>Belum ada data statistik.</p>';
    modal.classList.add('active');
}

// Close stats modal
function closeStats() {
    document.getElementById('stats-modal').classList.remove('active');
}

// Show settings modal
function showSettings(gameName) {
    const modal = document.getElementById('settings-modal');
    const content = document.getElementById('settings-content');
    
    const settings = getGameSettings(gameName);
    
    let html = `<h3>Pengaturan ${getGameDisplayName(gameName)}</h3>`;
    
    switch(gameName) {
        case 'katla':
            html += `
                <div class="setting-item">
                    <label>Panjang kata:</label>
                    <select id="katla-length" onchange="updateSetting('katla', 'wordLength', this.value)">
                        <option value="4" ${settings.wordLength === 4 ? 'selected' : ''}>4 huruf</option>
                        <option value="5" ${settings.wordLength === 5 ? 'selected' : ''}>5 huruf</option>
                        <option value="6" ${settings.wordLength === 6 ? 'selected' : ''}>6 huruf</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Jumlah percobaan:</label>
                    <select id="katla-attempts" onchange="updateSetting('katla', 'maxAttempts', this.value)">
                        <option value="5" ${settings.maxAttempts === 5 ? 'selected' : ''}>5</option>
                        <option value="6" ${settings.maxAttempts === 6 ? 'selected' : ''}>6</option>
                        <option value="7" ${settings.maxAttempts === 7 ? 'selected' : ''}>7</option>
                    </select>
                </div>
            `;
            break;
        case 'susun-kata':
            html += `
                <div class="setting-item">
                    <label>Jumlah sisi:</label>
                    <select id="letterbox-sides" onchange="updateSetting('susun-kata', 'sides', this.value)">
                        <option value="3" ${settings.sides === 3 ? 'selected' : ''}>3 sisi</option>
                        <option value="4" ${settings.sides === 4 ? 'selected' : ''}>4 sisi</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Huruf per sisi:</label>
                    <select id="letterbox-letters" onchange="updateSetting('susun-kata', 'lettersPerSide', this.value)">
                        <option value="2" ${settings.lettersPerSide === 2 ? 'selected' : ''}>2</option>
                        <option value="3" ${settings.lettersPerSide === 3 ? 'selected' : ''}>3</option>
                        <option value="4" ${settings.lettersPerSide === 4 ? 'selected' : ''}>4</option>
                    </select>
                </div>
            `;
            break;
        case 'sarang-kata':
            html += `
                <div class="setting-item">
                    <label>Jumlah huruf luar:</label>
                    <select id="bee-outer" onchange="updateSetting('sarang-kata', 'outerLetters', this.value)">
                        <option value="5" ${settings.outerLetters === 5 ? 'selected' : ''}>5</option>
                        <option value="6" ${settings.outerLetters === 6 ? 'selected' : ''}>6</option>
                        <option value="7" ${settings.outerLetters === 7 ? 'selected' : ''}>7</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Panjang kata minimum:</label>
                    <select id="bee-min" onchange="updateSetting('sarang-kata', 'minLength', this.value)">
                        <option value="3" ${settings.minLength === 3 ? 'selected' : ''}>3</option>
                        <option value="4" ${settings.minLength === 4 ? 'selected' : ''}>4</option>
                        <option value="5" ${settings.minLength === 5 ? 'selected' : ''}>5</option>
                    </select>
                </div>
            `;
            break;
        case 'kaitan':
            html += `
                <div class="setting-item">
                    <label>Ukuran grid:</label>
                    <select id="connections-grid" onchange="updateSetting('kaitan', 'gridSize', this.value)">
                        <option value="4x4" ${settings.gridSize === '4x4' ? 'selected' : ''}>4×4 (16 kata)</option>
                        <option value="3x4" ${settings.gridSize === '3x4' ? 'selected' : ''}>3×4 (12 kata)</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Jumlah kesalahan:</label>
                    <select id="connections-mistakes" onchange="updateSetting('kaitan', 'maxMistakes', this.value)">
                        <option value="3" ${settings.maxMistakes === 3 ? 'selected' : ''}>3</option>
                        <option value="4" ${settings.maxMistakes === 4 ? 'selected' : ''}>4</option>
                        <option value="5" ${settings.maxMistakes === 5 ? 'selected' : ''}>5</option>
                    </select>
                </div>
            `;
            break;
        case 'tts-mini':
            html += `
                <div class="setting-item">
                    <label>Ukuran grid:</label>
                    <select id="crossword-size" onchange="updateSetting('tts-mini', 'gridSize', this.value)">
                        <option value="5" ${settings.gridSize === 5 ? 'selected' : ''}>5×5</option>
                        <option value="7" ${settings.gridSize === 7 ? 'selected' : ''}>7×7</option>
                    </select>
                </div>
            `;
            break;
    }
    
    html += '<button class="btn btn-primary" onclick="closeSettings(); restartGame();">Terapkan & Mulai Ulang</button>';
    
    content.innerHTML = html;
    modal.classList.add('active');
}

// Close settings modal
function closeSettings() {
    document.getElementById('settings-modal').classList.remove('active');
}

// Update setting
function updateSetting(game, key, value) {
    const settings = getGameSettings(game);
    settings[key] = parseInt(value) || value;
    saveGameSettings(game, settings);
}

// Restart current game
function restartGame() {
    if (currentGame && gameInstances[currentGame]) {
        gameInstances[currentGame].start();
    }
}

// Get display name for game
function getGameDisplayName(gameName) {
    const names = {
        'katla': 'Katla',
        'susun-kata': 'Susun Kata',
        'sarang-kata': 'Sarang Kata',
        'kaitan': 'Kaitan',
        'tts-mini': 'TTS Mini'
    };
    return names[gameName] || gameName;
}

// Show message/alert
function showMessage(text, type = 'info', duration = 2000) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, duration);
}
