# Segnapunti Podrida (Android)

Applicazione Android open-source per tenere traccia dei punteggi nel gioco di carte *Podrida*.

Questa app è stata progettata per funzionare completamente **offline**, senza server e senza pubblicità. I dati della partita vengono salvati esclusivamente nella memoria locale del dispositivo.

## Regole del Gioco

Il gioco segue il regolamento della variante "a carte" della Podrida. 
Per i dettagli completi, fare riferimento a: [Wiki Ofe - Podrida](https://sites.google.com/site/wikiofe/podrida)

### Note sulle Regole Implementate
- **Punteggio**: L'app calcola **3 punti per ogni presa** in caso di scommessa indovinata (oltre ai 10 punti base), come da variante comune utilizzata dagli autori.
- **Mazzo**: Supporto per mazzi da 40 (italiane/spagnole) e 52 carte.
- **Giocatori**: Supporta da 2 a 40 giocatori (teoricamente!).

## Installazione e Sviluppo

Il progetto è costruito su **Capacitor**.

### Prerequisiti
- Node.js
- Android Studio (per la compilazione finale)

### Comandi
```bash
# Installazione dipendenze
npm install

# Aggiornamento parte nativa (dopo modifiche a www/)
npx cap sync

# Apertura in Android Studio
npx cap open android
```

## Licenza

Questo progetto è rilasciato sotto licenza **MIT**.

```text
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
