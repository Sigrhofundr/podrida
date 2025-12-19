// --- RULES MODAL ---

const RULES_HTML = {
    it: `
        <h3>🎯 Obiettivo</h3>
        <p>Prevedere <strong>esattamente</strong> quante prese farai in ogni round per guadagnare punti!</p>
        
        <h3>📋 Struttura Partita</h3>
        <p><strong>Salita:</strong> Si parte da 1 carta, si sale fino al massimo<br>
        <strong>Discesa:</strong> Si scende dal massimo fino a 1 carta<br>
        <strong>Finale AL BUIO:</strong> 1 carta sulla fronte!</p>
        
        <h3>🎮 Fasi di Gioco</h3>
        <p><strong>1. Chiamate:</strong> Ogni giocatore dichiara quante prese farà<br>
        ⚠️ <strong>Il mazziere</strong> (ultimo a chiamare) NON può dire un numero che renderebbe la somma uguale al totale carte!</p>
        
        <p><strong>2. Giocata:</strong> Vince la carta più alta del seme di mano.<br>
        <strong>Ordine:</strong> 1(Asso) > 3 > 10(Re) > 9 > 8 > 7 > 6 > 5 > 4 > 2<br>
        <strong>A parità:</strong> Ori > Spade > Coppe > Bastoni</p>
        
        <p><strong>🎭 AL BUIO:</strong> Metti la carta sulla fronte senza guardarla! Vedi quelle degli altri e chiama in base a cosa vedi.</p>
        
        <h3>💯 Punteggio</h3>
        <p><strong>Indovinato esattamente:</strong> 10 + (prese × 3) punti<br>
        <strong>Sbagliato:</strong> 0 punti</p>
        
        <p><em>Esempi:</em><br>
        • Chiamato 0, fatto 0 → <strong>10 punti</strong><br>
        • Chiamato 2, fatto 2 → <strong>16 punti</strong><br>
        • Chiamato 3, fatto 2 → <strong>0 punti</strong></p>
        
        <h3>💡 Suggerimenti</h3>
        <p>• Valuta bene le tue carte prima di chiamare<br>
        • Ricorda che il mazziere ha restrizioni<br>
        • Il round AL BUIO richiede deduzione!</p>
    `,
    en: `
        <h3>🎯 Goal</h3>
        <p>Predict <strong>exactly</strong> how many tricks you'll take each round to score points!</p>
        
        <h3>📋 Game Structure</h3>
        <p><strong>Going up:</strong> Start from 1 card, go up to maximum<br>
        <strong>Going down:</strong> Go down from maximum to 1 card<br>
        <strong>BLIND finale:</strong> 1 card on your forehead!</p>
        
        <h3>🎮 Game Phases</h3>
        <p><strong>1. Bidding:</strong> Each player declares how many tricks they'll take<br>
        ⚠️ <strong>The dealer</strong> (last to bid) CANNOT bid a number that makes the sum equal to total cards!</p>
        
        <p><strong>2. Playing:</strong> Highest card of led suit wins.<br>
        <strong>Order:</strong> 1(Ace) > 3 > 10(King) > 9 > 8 > 7 > 6 > 5 > 4 > 2<br>
        <strong>Tie-break:</strong> Coins > Swords > Cups > Clubs</p>
        
        <p><strong>🎭 BLIND:</strong> Put card on forehead without looking! See others' cards and bid based on what you see.</p>
        
        <h3>💯 Scoring</h3>
        <p><strong>Correct prediction:</strong> 10 + (tricks × 3) points<br>
        <strong>Wrong:</strong> 0 points</p>
        
        <p><em>Examples:</em><br>
        • Bid 0, made 0 → <strong>10 points</strong><br>
        • Bid 2, made 2 → <strong>16 points</strong><br>
        • Bid 3, made 2 → <strong>0 points</strong></p>
        
        <h3>💡 Tips</h3>
        <p>• Evaluate your cards carefully before bidding<br>
        • Remember the dealer has restrictions<br>
        • The BLIND round requires deduction!</p>
    `,
    es: `
        <h3>🎯 Objetivo</h3>
        <p>¡Predecir <strong>exactamente</strong> cuántas bazas harás en cada ronda para ganar puntos!</p>
        
        <h3>📋 Estructura del Juego</h3>
        <p><strong>Subida:</strong> Desde 1 carta hasta el máximo<br>
        <strong>Bajada:</strong> Desde el máximo hasta 1 carta<br>
        <strong>Final A CIEGAS:</strong> ¡1 carta en la frente!</p>
        
        <h3>🎮 Fases del Juego</h3>
        <p><strong>1. Apuestas:</strong> Cada jugador declara cuántas bazas hará<br>
        ⚠️ <strong>El repartidor</strong> (último en apostar) ¡NO puede decir un número que haga la suma igual al total de cartas!</p>
        
        <p><strong>2. Juego:</strong> Gana la carta más alta del palo inicial.<br>
        <strong>Orden:</strong> 1(As) > 3 > 10(Rey) > 9 > 8 > 7 > 6 > 5 > 4 > 2<br>
        <strong>Empate:</strong> Oros > Espadas > Copas > Bastos</p>
        
        <p><strong>🎭 A CIEGAS:</strong> ¡Pon la carta en tu frente sin mirarla! Ve las cartas de los demás y apuesta según lo que ves.</p>
        
        <h3>💯 Puntuación</h3>
        <p><strong>Predicción correcta:</strong> 10 + (bazas × 3) puntos<br>
        <strong>Incorrecto:</strong> 0 puntos</p>
        
        <p><em>Ejemplos:</em><br>
        • Apostó 0, hizo 0 → <strong>10 puntos</strong><br>
        • Apostó 2, hizo 2 → <strong>16 puntos</strong><br>
        • Apostó 3, hizo 2 → <strong>0 puntos</strong></p>
        
        <h3>💡 Consejos</h3>
        <p>• Evalúa bien tus cartas antes de apostar<br>
        • Recuerda que el repartidor tiene restricciones<br>
        • ¡La ronda A CIEGAS requiere deducción!</p>
    `
};

function openRulesModal() {
    const modal = document.getElementById('rules-modal');
    const content = document.getElementById('rules-content');
    content.innerHTML = RULES_HTML[currentLang] || RULES_HTML['it'];
    modal.style.display = 'flex';
}

function closeRulesModal() {
    document.getElementById('rules-modal').style.display = 'none';
}
