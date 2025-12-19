# 🎴 Regole del Gioco: Podrida

## Introduzione

**Podrida** è un gioco di carte strategico basato su predizioni, simile al Whist e all'Oh Hell. L'obiettivo è prevedere esattamente quante prese (tricks) farai in ogni round.

---

## 🎯 Obiettivo del Gioco

Ottenere il **punteggio più alto** prevedendo con precisione il numero di prese che riuscirai a fare in ogni round.

---

## 🃏 Preparazione

### Scelta del Mazzo
- **Mazzo da 40 carte**: Carte italiane o spagnole (Ori, Spade, Coppe, Bastoni)
- **Mazzo da 52 carte**: Carte francesi (Cuori, Quadri, Fiori, Picche)

### Numero di Giocatori
- Da **2 a 40 giocatori** (ideale 4-8 giocatori)

### Mazziere
- Un giocatore viene scelto come **primo mazziere**
- Il ruolo ruota in senso orario ad ogni round

---

## 📋 Struttura della Partita

La partita è divisa in **round** con numero variabile di carte:

1. **Fase di Salita**: Si parte da 1 carta, si sale fino al massimo possibile
2. **Fase di Discesa**: Si scende dal massimo fino a 1 carta
3. **Round Finale AL BUIO**: 1 carta giocata senza guardarla

### Esempio (5 giocatori, mazzo da 40):
- Round 1-8: da 1 a 8 carte (salita)
- Round 9-15: da 7 a 1 carta (discesa)
- Round 16: 1 carta AL BUIO (finale)

> Il numero massimo di carte per round dipende dal totale disponibile diviso per il numero di giocatori

---

## 🎮 Come Si Gioca

Ogni round è diviso in **due fasi**:

### 1️⃣ Fase Chiamate (Bidding)

A turno, **partendo dal giocatore dopo il mazziere**, ogni giocatore dichiara quante prese pensa di fare.

**Regola Importante - Restrizione del Mazziere:**
- Il **mazziere chiama per ultimo**
- **NON può chiamare** un numero che renderebbe la somma totale uguale al numero di carte in gioco
- Questo garantisce che qualcuno sbaglierà la previsione!

**Esempio** (Round con 3 carte, 4 giocatori):
- Giocatore 1: chiama 1
- Giocatore 2: chiama 0
- Giocatore 3: chiama 1
- **Mazziere**: NON può chiamare 1 (perché 1+0+1+1=3), deve chiamare 0 o 2+

### 2️⃣ Fase Giocata (Playing)

Si gioca il round normalmente:
- Ogni giocatore gioca una carta
- **Ordine di valore delle carte** (mazzo da 40): 1 (Asso) > 3 > 10 (Re) > 9 (Cavallo) > 8 (Fante) > 7 > 6 > 5 > 4 > 2
- Vince la presa la **carta più alta del seme di mano** (il primo seme giocato)
- **A parità di valore**, vince il seme con maggiore forza: **Ori > Spade > Coppe > Bastoni**
  - Esempio: Asso di Spade batte Asso di Bastoni
- Chi vince la presa gioca per primo nel turno successivo

### 🎭 Round Finale "AL BUIO"

Nell'ultimo round (1 carta) si gioca in modo speciale:
1. Ogni giocatore riceve 1 carta coperta
2. **SENZA guardarla**, al "via!" tutti mettono la carta **sulla fronte** rivolta verso gli altri
3. Ora ogni giocatore **vede le carte degli altri ma non la propria**
4. A turno, ogni giocatore fa la sua chiamata (0 o 1) basandosi sulle carte che vede
5. Solo dopo aver chiamato tutti, si giocano le carte normalmente
6. Aggiunge suspense e strategia: devi dedurre la tua carta da quelle degli altri!


---

## 💯 Punteggio

Il calcolo è semplice ed automatico:

### Se indovini esattamente:
```
Punti = 10 (base) + (prese fatte × 3)
```

**Esempi:**
- Chiamato 0, fatto 0 → **10 punti** (10 + 0×3)
- Chiamato 2, fatto 2 → **16 punti** (10 + 2×3)
- Chiamato 5, fatto 5 → **25 punti** (10 + 5×3)

### Se sbagli:
```
Punti = 0
```

---

## 🏆 Fine Partita e Vincitore

La partita termina dopo il round AL BUIO.

**Vince** chi ha totalizzato il **punteggio più alto** sommando tutti i round.

In caso di parità, vince chi ha fatto più predizioni corrette durante la partita.

---

## 💡 Suggerimenti Strategici

1. **Controlla la mano**: Valuta realisticamente le tue carte prima di chiamare
2. **Osserva il mazziere**: Ricorda che il mazziere non può fare certe chiamate
3. **Memoria**: Tieni traccia delle carte giocate per prevedere meglio le prese successive
4. **Bilanciamento**: A volte è meglio chiamare 0 se hai una mano debole
5. **Round AL BUIO**: È pura fortuna, ma decide spesso le partite!

---

## 🎲 Varianti

### Variante con Briscola
Alcune versioni includono una **briscola casuale** ad ogni round:
- Si scopre una carta dal mazzo
- Quel seme diventa briscola (vince sempre sui semi normali)

> L'app attualmente supporta la versione **senza briscola**

---

## ❓ FAQ

**Q: Cosa succede se tutti sbagliano?**  
A: Nessuno fa punti in quel round.

**Q: Posso chiamare 0?**  
A: Sì! Chiamare 0 e non prendere nessuna presa vale 10 punti.

**Q: Il mazziere è svantaggiato?**  
A: Sì e no. Non può fare certe chiamate, ma chiama per ultimo e ha più informazioni.

**Q: Cosa succede se chiamo 3 ma ne faccio 2?**  
A: Prendi 0 punti. Devi indovinare **esattamente**.

---

## 📱 Utilizzo dell'App

L'app **Podrida Segnapunti** gestisce automaticamente:
- ✅ Calcolo punteggi
- ✅ Restrizioni del mazziere
- ✅ Rotazione dei turni
- ✅ Storico completo dei round
- ✅ Classifica in tempo reale

Buon divertimento! 🎉
