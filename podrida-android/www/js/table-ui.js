// --- RESULTS TABLE ---

function renderResultsTable() {
    const thead = document.querySelector('#results-table thead');
    const tbody = document.querySelector('#results-table tbody');
    
    // Build Header
    let headerHTML = '<tr><th>#</th><th>' + t('cards') + '</th>';
    GAME_STATE.players.forEach(p => {
        headerHTML += `<th>${p.name}</th>`;
    });
    headerHTML += '</tr>';
    thead.innerHTML = headerHTML;
    
    // Build Rows
    let bodyHTML = '';
    GAME_STATE.history.forEach((round, idx) => {
        if (!round) return;
        
        bodyHTML += `<tr>
            <td>${idx + 1}</td>
            <td>${GAME_STATE.rounds[idx].cards}</td>`;
        
        GAME_STATE.players.forEach((player, pIdx) => {
            const bid = round.bids[pIdx];
            const takes = round.takes[pIdx];
            const isCorrect = bid === takes;
            const points = isCorrect ? 10 + (takes * 3) : 0;
            const cssClass = isCorrect ? 'result-correct' : 'result-incorrect';
            
            bodyHTML += `<td class="${cssClass}">${bid}/${takes}<br>(+${points})</td>`;
        });
        
        bodyHTML += '</tr>';
    });
    
    tbody.innerHTML = bodyHTML;
}
