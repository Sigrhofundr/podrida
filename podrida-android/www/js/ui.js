// --- NAVIGATION & UI HELPERS ---

function showHome() {
    document.getElementById('screen-home').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    
    document.getElementById('screen-setup').style.display = 'none'; 
    document.getElementById('screen-stats').style.display = 'none';
    document.getElementById('screen-game').style.display = 'none';
}

function goToSetup() {
    document.getElementById('screen-home').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    document.querySelector('header').style.display = 'block';
    
    document.getElementById('screen-setup').style.display = 'block';
    document.getElementById('header-subtitle').innerText = "Setup"; // Static for now, localized via Setup UI
    checkForSaveBtn();
}

function goToStats() {
    document.getElementById('screen-home').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    document.querySelector('header').style.display = 'block';
    
    document.getElementById('screen-stats').style.display = 'block';
    document.getElementById('header-subtitle').innerText = t('stats');
    renderStatsList();
}

function openInfoModal() { document.getElementById('info-modal').style.display = 'flex'; }
function closeInfoModal() { document.getElementById('info-modal').style.display = 'none'; }

function checkForSaveBtn() {
    const saved = localStorage.getItem(SAVE_KEY);
    document.getElementById('resume-btn').style.display = saved ? 'inline-block' : 'none';
}

// --- SETUP UI ---

function adjustPlayerCount(delta) {
    const el = document.getElementById('setup-count');
    let val = parseInt(el.innerText) + delta;
    if (val < 2) val = 2;
    if (val > 40) val = 40;
    el.innerText = val;
    renderSetupInputs();
}

function updateDeckUI() {
    const radios = document.getElementsByName('deckSize');
    let val = 40;
    for(const r of radios) if(r.checked) val = parseInt(r.value);
    
    const opt40 = document.getElementById('opt-40');
    const opt52 = document.getElementById('opt-52');
    if(opt40) opt40.className = val === 40 ? 'deck-option selected' : 'deck-option';
    if(opt52) opt52.className = val === 52 ? 'deck-option selected' : 'deck-option';

    let suitHtml = '';
    if (val === 40) {
        suitHtml = `
            <div class="suit-40">
                <span class="suit-item">${t('suitOri')}</span> <span class="suit-separator">></span>
                <span class="suit-item">${t('suitSpade')}</span> <span class="suit-separator">></span>
                <span class="suit-item">${t('suitCoppe')}</span> <span class="suit-separator">></span>
                <span class="suit-item">${t('suitBastoni')}</span>
            </div>`;
    } else {
        suitHtml = `
            <div class="suit-52">
                <span class="suit-item suit-red">${t('suitCuori')}</span> <span class="suit-separator">></span>
                <span class="suit-item suit-red">${t('suitQuadri')}</span> <span class="suit-separator">></span>
                <span class="suit-item suit-black">${t('suitFiori')}</span> <span class="suit-separator">></span>
                <span class="suit-item suit-black">${t('suitPicche')}</span>
            </div>`;
    }
    const setupEl = document.getElementById('suit-display-setup');
    const gameEl = document.getElementById('suit-display-game');
    if(setupEl) setupEl.innerHTML = suitHtml;
    if(gameEl) gameEl.innerHTML = suitHtml; 
}

function renderSetupInputs() {
    const count = parseInt(document.getElementById('setup-count').innerText);
    const container = document.getElementById('player-inputs');
    container.innerHTML = '';
    
    const existingRadios = document.getElementsByName('initial-dealer');
    let checkedIdx = 0;
    for(const r of existingRadios) { if(r.checked) checkedIdx = parseInt(r.value); }
    if (checkedIdx >= count) checkedIdx = 0;

    for (let i = 0; i < count; i++) {
        const isChecked = i === checkedIdx ? 'checked' : '';
        const pLabel = `${t('playerDef')} ${i+1}`;
        container.innerHTML += `
        <div class="setup-player-row">
            <div class="setup-player-input-wrapper">
                <input type="text" id="pname-${i}" placeholder="${pLabel}" value="${pLabel}" style="margin:0;">
            </div>
            <label class="setup-dealer-select">
                ${t('dealerLabel')}
                <input type="radio" name="initial-dealer" value="${i}" ${isChecked}>
            </label>
        </div>
        `;
    }
}

// --- GAME UI ---

function startGame() {
    const count = parseInt(document.getElementById('setup-count').innerText);
    const deckRadios = document.getElementsByName('deckSize');
    let dSize = 40;
    for(const r of deckRadios) if(r.checked) dSize = parseInt(r.value);
    
    GAME_STATE.deckSize = dSize;

    const dealerRadios = document.getElementsByName('initial-dealer');
    let initialDealerIdx = 0;
    for(const radio of dealerRadios) if(radio.checked) initialDealerIdx = parseInt(radio.value);

    const players = [];
    for (let i = 0; i < count; i++) {
        const name = document.getElementById(`pname-${i}`).value.trim() || `${t('playerDef')} ${i+1}`;
        players.push({ name: name, totalScore: 0 });
    }

    GAME_STATE.players = players;
    GAME_STATE.rounds = generateRoundStructure(count, dSize);
    GAME_STATE.history = [];
    GAME_STATE.currentRoundIdx = 0;
    GAME_STATE.phase = 'bidding';
    GAME_STATE.dealerOffset = initialDealerIdx; 
    GAME_STATE.tempInputs = new Array(count).fill(0);
    GAME_STATE.statsSaved = false;

    saveGame();
    renderGameUI();
}

function resumeGame() {
    if(loadGame()) {
        renderGameUI();
    }
}

function renderGameUI() {
    document.getElementById('screen-setup').style.display = 'none';
    document.getElementById('screen-game').style.display = 'block';
    updateDeckUI(); // Ensure suits match deck size
    
    // Hide endgame stuff
    document.getElementById('endgame-controls').style.display = 'none';
    document.getElementById('winner-section').style.display = 'none';
    document.getElementById('game-tabs').style.display = 'flex';
    document.getElementById('tab-play').style.display = 'block';

    // Update Tabs Translation
    document.getElementById('game-tabs').children[0].innerText = t('play');
    document.getElementById('game-tabs').children[1].innerText = t('ranking');

    if (GAME_STATE.currentRoundIdx >= GAME_STATE.rounds.length) {
        showFinalResults();
        return;
    }

    const round = GAME_STATE.rounds[GAME_STATE.currentRoundIdx];
    document.getElementById('header-title').innerText = `${t('round')} ${GAME_STATE.currentRoundIdx + 1} / ${GAME_STATE.rounds.length}`;
    let subTxt = `${round.cards} ${t('cards')}`;
    if (round.blind) subTxt += ` - ${t('blind')}`;
    document.getElementById('header-subtitle').innerText = subTxt;

    renderInputs();
    updateScoreboard();
}

function renderInputs() {
    const container = document.getElementById('game-inputs');
    const round = GAME_STATE.rounds[GAME_STATE.currentRoundIdx];
    
    // Safety check: if round doesn't exist (game ended), exit early
    if (!round) return;
    
    const rulesBox = document.getElementById('round-rules');
    const btn = document.getElementById('action-btn');
    const pCount = GAME_STATE.players.length;
    const currentDealerIdx = (GAME_STATE.dealerOffset + GAME_STATE.currentRoundIdx) % pCount;
    
    // Calculate order of play manually
    let order = [];
    let startIdx = (currentDealerIdx + 1) % pCount;
    for(let i=0; i<pCount; i++) order.push( (startIdx + i) % pCount );
    
    container.innerHTML = '';
    document.getElementById('validation-msg').style.display = 'none';

    if (!GAME_STATE.tempInputs || GAME_STATE.tempInputs.length !== pCount) {
        GAME_STATE.tempInputs = new Array(pCount).fill(0);
    }


    if (GAME_STATE.phase === 'bidding') {
        btn.innerText = t('confirmBid');
        btn.classList.remove('danger');
        
        let ruleText = `<strong>${t('bidding')}</strong> `;
        if (round.blind) ruleText += `<span style='color:red'>${t('blind')}!</span> `;
        ruleText += `${t('dealerLabel')} <strong>${GAME_STATE.players[currentDealerIdx].name}</strong> (${t('last')}).`;
        rulesBox.innerHTML = ruleText;

        let currentSum = GAME_STATE.tempInputs.reduce((a,b)=>a+b, 0);

        order.forEach((pIdx) => {
            const isDealer = (pIdx === currentDealerIdx);
            let dealerRestrictionMsg = "";
            if (isDealer) {

                const forbidden = round.cards - (currentSum - GAME_STATE.tempInputs[pIdx]);
                if (forbidden >= 0) {
                        dealerRestrictionMsg = `<span style="font-size:0.8rem; color:var(--accent); display:block;">${t('forbidden')} <strong>${forbidden}</strong></span>`;
                }
            }
            container.innerHTML += createInputRow(pIdx, t('roundGen'), round.cards, isDealer, dealerRestrictionMsg);
        });

    } else {
        btn.innerText = t('confirmTake');
        btn.classList.add('danger'); 
        rulesBox.innerHTML = `<strong>${t('taking')}</strong>`; 
        order.forEach(pIdx => {
            const bid = GAME_STATE.history[GAME_STATE.currentRoundIdx] ? GAME_STATE.history[GAME_STATE.currentRoundIdx].bids[pIdx] : 0; 
            container.innerHTML += createInputRow(pIdx, `${t('roundGen')}: ${bid}`, round.cards, false, ""); 
        });
    }
}

function createInputRow(pIdx, label, maxVal, isDealer, extraHtml) {
    const pName = GAME_STATE.players[pIdx].name;
    const dealerBadge = isDealer ? `<span class="dealer-badge">D</span>` : '';
    const val = GAME_STATE.tempInputs[pIdx];

    return `
    <div class="player-row">
        <div class="player-name">${pName} ${dealerBadge}</div>
        <div style="text-align:right;">
            <div style="font-size:0.75rem; color:#666; margin-bottom:4px;">${label}</div>
            <div class="control-group">
                <button class="control-btn" onclick="updateInput(${pIdx}, -1, ${maxVal})">-</button>
                <span class="control-val" id="val-${pIdx}">${val}</span>
                <button class="control-btn" onclick="updateInput(${pIdx}, 1, ${maxVal})">+</button>
            </div>
            ${extraHtml}
        </div>
    </div>
    `;
}

function updateInput(pIdx, delta, maxVal) {
    let v = GAME_STATE.tempInputs[pIdx] + delta;
    if (v < 0) v = 0;
    if (v > maxVal) v = maxVal;
    GAME_STATE.tempInputs[pIdx] = v;
    document.getElementById(`val-${pIdx}`).innerText = v;
    
    // Refresh UI only in bidding phase to update Dealer restriction
    if (GAME_STATE.phase === 'bidding') renderInputs(); 
}

function submitPhase() {
    const msg = document.getElementById('validation-msg');
    const round = GAME_STATE.rounds[GAME_STATE.currentRoundIdx];
    const sum = GAME_STATE.tempInputs.reduce((a,b)=>a+b, 0);

    if (GAME_STATE.phase === 'bidding') {
        if (sum === round.cards) {
            msg.innerText = `${t('errorSumBid')} (${sum}) = ${round.cards}.`;
            msg.style.display = 'block';
            return;
        }
        if (!GAME_STATE.history[GAME_STATE.currentRoundIdx]) {
            GAME_STATE.history[GAME_STATE.currentRoundIdx] = { bids: [], takes: [] };
        }
        GAME_STATE.history[GAME_STATE.currentRoundIdx].bids = [...GAME_STATE.tempInputs];
        GAME_STATE.phase = 'taking';
        GAME_STATE.tempInputs.fill(0);
        saveGame();
        renderGameUI();
    } else {
        if (sum !== round.cards) {
            msg.innerText = `${t('errorSumTake')} (${sum}) != ${round.cards}.`;
            msg.style.display = 'block';
            return;
        }
        GAME_STATE.history[GAME_STATE.currentRoundIdx].takes = [...GAME_STATE.tempInputs];
        recalculateScores();
        GAME_STATE.currentRoundIdx++;
        GAME_STATE.phase = 'bidding';
        GAME_STATE.tempInputs.fill(0);
        saveGame();
        renderGameUI();
    }
}

function undoPhase() {
    if (GAME_STATE.phase === 'taking') {
        GAME_STATE.phase = 'bidding';
        GAME_STATE.tempInputs = [...GAME_STATE.history[GAME_STATE.currentRoundIdx].bids];
        renderGameUI();
    } else {
        if (GAME_STATE.currentRoundIdx > 0) {
            GAME_STATE.currentRoundIdx--;
            GAME_STATE.phase = 'taking';
            GAME_STATE.tempInputs = [...GAME_STATE.history[GAME_STATE.currentRoundIdx].takes];
            renderGameUI();
        }
    }
}

// --- SCOREBOARD ---

function switchTab(t) {
    document.getElementById('tab-play').style.display = t === 'play' ? 'block' : 'none';
    document.getElementById('tab-score').style.display = t === 'score' ? 'block' : 'none';
    document.getElementById('tab-table').style.display = t === 'table' ? 'block' : 'none';
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    if (t === 'score') updateScoreboard();
    if (t === 'table') renderResultsTable();
}


function updateScoreboard() {
    const sortedPlayers = [...GAME_STATE.players].map((p, i) => ({...p, originalIdx: i}))
                            .sort((a,b) => b.totalScore - a.totalScore);
    const tbody = document.getElementById('scoreboard-body');
    tbody.innerHTML = '';
    sortedPlayers.forEach((p, rank) => {
        tbody.innerHTML += `
        <tr class="${rank===0 ? 'current-leader' : ''}">
            <td>${rank+1}</td>
            <td style="text-align:left;">${p.name}</td>
            <td style="font-weight:bold; font-size:1.1rem;">${p.totalScore}</td>
        </tr>`;
    });
    renderHistoryList();
}

function renderHistoryList() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    for (let r=GAME_STATE.history.length-1; r>=0; r--) {
        const h = GAME_STATE.history[r];
        if (!h || !h.takes || h.takes.length === 0) continue; 
        const roundInfo = GAME_STATE.rounds[r];
        // Use t('edit')
        list.innerHTML += `<div class="card" onclick="openEditModal(${r})" style="cursor:pointer; border:1px solid #eee; padding:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${t('roundGen')} ${r+1}</strong> <span>${roundInfo.cards} ${t('cardsGen')}</span>
            </div>
            <div style="font-size:0.8rem; color:#555;">${t('edit')}</div>
        </div>`;
    }
}

// --- STATS LIST ---

function renderStatsList() {
    const list = document.getElementById('stats-list');
    const stats = getStats();
    list.innerHTML = '';
    
    if (stats.length === 0) {
        list.innerHTML = '<div style="text-align:center; padding:20px; color:#999;">Nessuna partita registrata.</div>';
        return;
    }

    stats.forEach(s => {
        list.innerHTML += `
        <div class="stat-item">
            <div class="stat-winner">${s.winner}</div>
            <div style="text-align:right;">
                <div class="stat-score">${s.score} pt</div>
                <div class="stat-date">${s.date}</div>
            </div>
        </div>`;
    });
}

function clearStats() {
    if(confirm(t('confirmClear'))) {
        clearAllStats();
        renderStatsList();
    }
}

// --- EDITING ---
let editRoundIdx = -1;
let editTempBids = [];
let editTempTakes = [];
let editCurrentTab = 'bids';

function openEditModal(rIdx) {
    editRoundIdx = rIdx;
    editTempBids = [...GAME_STATE.history[rIdx].bids];
    editTempTakes = [...GAME_STATE.history[rIdx].takes];
    document.getElementById('edit-round-num').innerText = rIdx + 1;
    document.getElementById('edit-modal').style.display = 'flex';
    switchEditTab('bids');
}

function closeEditModal() { document.getElementById('edit-modal').style.display = 'none'; }

function switchEditTab(tab) {
    editCurrentTab = tab;
    document.getElementById('edit-tab-bids').className = tab === 'bids' ? 'tab active' : 'tab';
    document.getElementById('edit-tab-takes').className = tab === 'takes' ? 'tab active' : 'tab';
    
    // We can also update text here dynamically based on lang
    let bidsLabel = t('bidding'); // "Fase Chiamate:"
    let takesLabel = t('taking');
    if (bidsLabel.endsWith(':')) bidsLabel = bidsLabel.slice(0, -1);
    if (takesLabel.endsWith(':')) takesLabel = takesLabel.slice(0, -1);

    document.getElementById('edit-tab-bids').innerText = bidsLabel;
    document.getElementById('edit-tab-takes').innerText = takesLabel;

    renderEditInputs();
}

function renderEditInputs() {
    const container = document.getElementById('edit-inputs');
    container.innerHTML = '';
    const data = editCurrentTab === 'bids' ? editTempBids : editTempTakes;
    const maxVal = GAME_STATE.rounds[editRoundIdx].cards;
    data.forEach((val, pIdx) => {
        container.innerHTML += `
        <div class="player-row">
            <span class="player-name">${GAME_STATE.players[pIdx].name}</span>
            <div class="control-group">
                <button class="control-btn" onclick="updateEditInput(${pIdx}, -1)">-</button>
                <span class="control-val">${val}</span>
                <button class="control-btn" onclick="updateEditInput(${pIdx}, 1, ${maxVal})">+</button>
            </div>
        </div>`;
    });
}

function updateEditInput(pIdx, delta, maxVal) {
    const arr = editCurrentTab === 'bids' ? editTempBids : editTempTakes;
    let v = arr[pIdx] + delta;
    if (v < 0) v = 0;
    if (maxVal && v > maxVal) v = maxVal;
    arr[pIdx] = v;
    renderEditInputs();
}

function saveEdit() {
    const round = GAME_STATE.rounds[editRoundIdx];
    const msg = document.getElementById('edit-validation-msg');
    const sumBids = editTempBids.reduce((a,b)=>a+b,0);
    if (sumBids === round.cards) {
        msg.innerText = `${t('errorSumBid')} (${sumBids}) = ${round.cards}.`;
        msg.style.display = 'block';
        return;
    }
    const sumTakes = editTempTakes.reduce((a,b)=>a+b,0);
    if (sumTakes !== round.cards) {
        msg.innerText = `${t('errorSumTake')} (${sumTakes}) != ${round.cards}.`;
        msg.style.display = 'block';
        return;
    }
    GAME_STATE.history[editRoundIdx].bids = [...editTempBids];
    GAME_STATE.history[editRoundIdx].takes = [...editTempTakes];
    recalculateScores();
    updateScoreboard();
    saveGame();
    closeEditModal();
}

// --- END GAME & SHARE ---

function showFinalResults() {
    document.getElementById('header-subtitle').innerText = t('gameEnd');
    
    // Sort Winner
    const sortedPlayers = [...GAME_STATE.players].sort((a,b) => b.totalScore - a.totalScore);
    const winner = sortedPlayers[0];

    // Save Stats (once)
    if (!GAME_STATE.statsSaved) {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        saveStat(winner.name, winner.totalScore, dateStr);
        GAME_STATE.statsSaved = true;
        saveGame();
    }

    // Setup Winner Box
    document.getElementById('winner-section').innerHTML = `
        <div class="winner-box">
            <div class="winner-trophy">🏆</div>
            <div class="winner-name">${winner.name}</div>
            <div class="winner-score">${winner.totalScore} Punti</div>
        </div>
    `;
    
    switchTab('score');
    document.getElementById('game-tabs').style.display = 'none'; 
    document.getElementById('winner-section').style.display = 'block';
    document.getElementById('endgame-controls').style.display = 'block';
    document.getElementById('back-to-score-btn').style.display = 'block';
    // document.getElementById('history-card').style.display = 'none'; // Element not found, caused error 
    
    // Apply translations to dynamically shown buttons
    updateLangUI();
}


function resetGame(force) {
    if(force || confirm(t('confirmReset'))) {
        clearGameSave();
        location.reload();
    }
}

    async function shareData(title, text) {
        try {
            // Check if Capacitor Share is available
            // In vanilla JS runtime with Capacitor, Plugins is usually available globally if the native bridge is loaded
            if (window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.Share) {
                await Capacitor.Plugins.Share.share({
                    title: title,
                    text: text,
                    dialogTitle: 'Condividi Risultati',
                });
                return true;
            } else if (navigator.share) {
                // Fallback to Web Share API
                await navigator.share({ title, text });
                return true;
            }
        } catch (err) {
            console.error("Share failed:", err);
            // Ignore user cancellation errors
            if (err.message && (err.message.indexOf('canceled') > -1 || err.message.indexOf('cancelled') > -1)) return true; 
        }
        return false;
    }

    async function downloadSummary() {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const sortedPlayers = [...GAME_STATE.players].sort((a,b) => b.totalScore - a.totalScore);
        
        let textSummary = `🏆 ${t('appFullTitle')} - ${dateStr}\n${t('winner')}: ${sortedPlayers[0].name} (${sortedPlayers[0].totalScore} pt)\n\n${t('ranking')}:\n`;
        sortedPlayers.forEach((p, i) => {
             textSummary += `${i+1}. ${p.name}: ${p.totalScore} pt\n`;
        });

        // Try Share
        const shared = await shareData(t('appFullTitle'), textSummary);
        if (!shared) {
             // Fallback
             copyToClipboard(textSummary);
        }
    }

    function copyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            alert(t('copySuccess'));
        } catch (err) {
            alert('Unable to copy');
        }
        document.body.removeChild(textArea);
    }

    // Debug Share
    async function testShare() {
        const text = "TEST CONDIVISIONE PODRIDA\n\nFunziona!";
        const shared = await shareData('Test Share', text);
        if (shared) {
            // alert(t('shareSuccess')); 
        } else {
            alert("Share plugin not available.");
            copyToClipboard(text);
        }
    }
