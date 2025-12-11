// --- STATE MANAGEMENT ---
const GAME_STATE = {
    players: [], 
    rounds: [], 
    history: [], 
    currentRoundIdx: 0,
    phase: 'bidding',
    dealerOffset: 0,
    deckSize: 40,
    tempInputs: [],
    statsSaved: false
};

const CONFIG = {
    pointsCorrect: 10,
    pointsPerTrick: 3
};

const STATS_KEY = 'podrida_stats_v1';
const SAVE_KEY = 'podrida_save';

// --- GAME RULES & CALCULATION ---

function generateRoundStructure(numPlayers, deckSize) {
    const maxCards = Math.floor(deckSize / numPlayers);
    let rounds = [];
    for (let i = 1; i <= maxCards; i++) rounds.push({ cards: i, blind: false });
    for (let i = maxCards - 1; i >= 1; i--) rounds.push({ cards: i, blind: false });
    rounds.push({ cards: 1, blind: true });
    return rounds;
}

function getDealerIndex() {
    return (GAME_STATE.currentRoundIdx + GAME_STATE.dealerOffset) % GAME_STATE.players.length;
}

function recalculateScores() {
    GAME_STATE.players.forEach(p => p.totalScore = 0);
    GAME_STATE.history.forEach((roundData, rIdx) => {
        if (!roundData || !roundData.bids || !roundData.takes) return;
        roundData.bids.forEach((bid, pIdx) => {
            const taken = roundData.takes[pIdx];
            if (bid === taken) {
                GAME_STATE.players[pIdx].totalScore += CONFIG.pointsCorrect + (taken * CONFIG.pointsPerTrick);
            }
        });
    });
}

// --- PERSISTENCE ---

function saveGame() { 
    localStorage.setItem(SAVE_KEY, JSON.stringify(GAME_STATE)); 
}

function loadGame() {
    try {
        const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
        if (saved) {
            Object.keys(saved).forEach(k => GAME_STATE[k] = saved[k]);
            return true;
        }
    } catch(e) {
        console.error("Save corrupted");
        localStorage.removeItem(SAVE_KEY);
    }
    return false;
}

function clearGameSave() {
    localStorage.removeItem(SAVE_KEY);
}

// --- STATISTICS ---

function getStats() {
    const s = localStorage.getItem(STATS_KEY);
    return s ? JSON.parse(s) : [];
}

function saveStat(winnerName, winnerScore, dateStr) {
    const stats = getStats();
    stats.unshift({ winner: winnerName, score: winnerScore, date: dateStr });
    // Keep max 50 records
    if (stats.length > 50) stats.pop();
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function clearAllStats() {
    localStorage.removeItem(STATS_KEY);
}
