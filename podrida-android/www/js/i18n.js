const TRANSLATIONS = {
    it: {
        play: "Gioca",
        stats: "Statistiche",
        info: "Informazioni",
        setup: "Nuova Partita",
        deck: "Seleziona Mazzo:",
        players: "Numero Giocatori (2-40)",
        dealer: "Seleziona il primo mazziere:",
        start: "Inizia Partita",
        resume: "Riprendi ultima partita",
        round: "Round",
        cards: "Carte",
        blind: "AL BUIO",
        bidding: "Fase Chiamate:",
        taking: "Fase Giocata:",
        dealerLabel: "Mazziere:",
        last: "ultimo",
        forbidden: "Vietato chiamare:",
        confirmBid: "Conferma Chiamate",
        confirmTake: "Calcola Punti -> Prossimo",
        undo: "Indietro (Annulla Fase)",
        errorSumBid: "ERRORE: Somma chiamate",
        errorSumTake: "ERRORE: Somma prese",
        gameEnd: "Partita Terminata",
        winner: "Vincitore",
        share: "📤 Condividi Risultati",
        newGame: "Nuova Partita",
        history: "Storico Round (Modificabile)",
        edit: "Modifica",
        reset: "Riavvia / Azzera Dati",
        statsTitle: "Statistiche Partite",
        statsSub: "Storico delle partite concluse salvato sul dispositivo.",
        back: "Torna Indietro",
        clear: "Cancella Storico",
        infoTitle: "Informazioni",
        version: "Versione 1.0.0",
        devBy: "App sviluppata per gestire facilmente i punteggi delle tue partite.",
        like: "Ti piace l'app?",
        coffee: "Offrimi un caffè ☕",
        close: "Chiudi",
        confirmClear: "Sei sicuro di voler cancellare tutto lo storico delle partite?",
        confirmReset: "Sei sicuro di voler cancellare la partita corrente e tornare al menu?",
        shareError: "Impossibile condividere: ",
        shareSuccess: "Condivisione riuscita!",
        copySuccess: "Risultati copiati negli appunti!",
        save: "Salva",
        cancel: "Annulla",
        scorekeeper: "Segnapunti",
        appFullTitle: "Podrida Segnapunti",
        ranking: "Classifica",
        roundGen: "Round", // generic label
        cardsGen: "Carte"  // generic label
    },
    en: {
        play: "Play",
        stats: "Statistics",
        info: "Info",
        setup: "New Game",
        deck: "Select Deck:",
        players: "Number of Players (2-40)",
        dealer: "Select First Dealer:",
        start: "Start Game",
        resume: "Resume Last Game",
        round: "Round",
        cards: "Cards",
        blind: "BLIND",
        bidding: "Bidding Phase:",
        taking: "Playing Phase:",
        dealerLabel: "Dealer:",
        last: "last",
        forbidden: "Forbidden to bid:",
        confirmBid: "Confirm Bids",
        confirmTake: "Calc Points -> Next",
        undo: "Undo (Cancel Phase)",
        errorSumBid: "ERROR: Sum of bids",
        errorSumTake: "ERROR: Sum of tricks",
        gameEnd: "Game Over",
        winner: "Winner",
        share: "📤 Share Results",
        newGame: "New Game",
        history: "Round History (Editable)",
        edit: "Edit",
        reset: "Restart / Reset Data",
        statsTitle: "Game Statistics",
        statsSub: "History of finished games saved on device.",
        back: "Go Back",
        clear: "Clear History",
        infoTitle: "Information",
        version: "Version 1.0.0",
        devBy: "App developed to easily manage your game scores.",
        like: "Do you like the app?",
        coffee: "Buy me a coffee ☕",
        close: "Close",
        confirmClear: "Are you sure you want to clear all history?",
        confirmReset: "Are you sure you want to quit the current game?",
        shareError: "Cannot share: ",
        shareSuccess: "Share successful!",
        copySuccess: "Results copied to clipboard!",
        save: "Save",
        cancel: "Cancel",
        scorekeeper: "Scorekeeper",
        appFullTitle: "Podrida Scorekeeper",
        ranking: "Ranking",
        roundGen: "Round",
        cardsGen: "Cards"
    }
};

let currentLang = 'it';

function initLang() {
    const saved = localStorage.getItem('podrida_lang');
    if (saved) currentLang = saved;
    updateLangUI();
}

function toggleLanguage() {
    currentLang = currentLang === 'it' ? 'en' : 'it';
    localStorage.setItem('podrida_lang', currentLang);
    updateLangUI();
}

function t(key) {
    return TRANSLATIONS[currentLang][key] || key;
}

function updateLangUI() {
    // Update Flag
    const btn = document.getElementById('lang-btn');
    if(btn) btn.innerText = currentLang === 'it' ? '🇮🇹' : '🇬🇧';
    
    // Update Static Elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[currentLang][key]) {
            el.innerText = TRANSLATIONS[currentLang][key];
        }
    });

    // Trigger UI updates for dynamic content if game is running
    if(window.renderInputs && document.getElementById('screen-game') && document.getElementById('screen-game').style.display === 'block') {
         window.renderInputs(); 
         if(window.updateScoreboard) window.updateScoreboard(); 
    }

    // Update Document Title
    document.title = TRANSLATIONS[currentLang]['appFullTitle'] || "Podrida";
}
