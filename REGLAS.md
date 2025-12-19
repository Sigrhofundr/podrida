# 🎴 Reglas del Juego: Podrida

## Introducción

**Podrida** es un juego de cartas estratégico basado en predicciones, similar al Whist y al Oh Hell. El objetivo es predecir exactamente cuántas bazas harás en cada ronda.

---

## 🎯 Objetivo del Juego

Obtener la **puntuación más alta** prediciendo con precisión el número de bazas que conseguirás en cada ronda.

---

## 🃏 Preparación

### Selección de Baraja
- **Baraja de 40 cartas**: Cartas españolas o italianas (Oros, Espadas, Copas, Bastos)
- **Baraja de 52 cartas**: Cartas francesas (Corazones, Diamantes, Tréboles, Picas)

### Número de Jugadores
- De **2 a 40 jugadores** (ideal 4-8 jugadores)

### Repartidor
- Un jugador es elegido como **primer repartidor**
- El rol rota en sentido horario cada ronda

---

## 📋 Estructura de la Partida

La partida se divide en **rondas** con número variable de cartas:

1. **Fase de Subida**: Se parte de 1 carta, se sube hasta el máximo posible
2. **Fase de Bajada**: Se baja del máximo hasta 1 carta
3. **Ronda Final A CIEGAS**: 1 carta jugada en la frente

### Ejemplo (5 jugadores, baraja de 40):
- Rondas 1-8: de 1 a 8 cartas (subida)
- Rondas 9-15: de 7 a 1 carta (bajada)
- Ronda 16: 1 carta A CIEGAS (final)

> El número máximo de cartas por ronda depende del total disponible dividido por el número de jugadores

---

## 🎮 Cómo Se Juega

Cada ronda se divide en **dos fases**:

### 1️⃣ Fase de Apuestas (Bidding)

Por turnos, **empezando por el jugador después del repartidor**, cada jugador declara cuántas bazas cree que hará.

**Regla Importante - Restricción del Repartidor:**
- El **repartidor apuesta último**
- **NO puede apostar** un número que haga que la suma total sea igual al número de cartas en juego
- ¡Esto garantiza que alguien fallará su predicción!

**Ejemplo** (Ronda con 3 cartas, 4 jugadores):
- Jugador 1: apuesta 1
- Jugador 2: apuesta 0
- Jugador 3: apuesta 1
- **Repartidor**: NO puede apostar 1 (porque 1+0+1+1=3), debe apostar 0 o 2+

### 2️⃣ Fase de Juego (Playing)

Se juega la ronda normalmente:
- Cada jugador juega una carta
- **Orden de valor de las cartas** (baraja de 40): 1 (As) > 3 > 10 (Rey) > 9 (Caballo) > 8 (Sota) > 7 > 6 > 5 > 4 > 2
- Gana la baza la **carta más alta del palo inicial** (el primer palo jugado)
- **En caso de empate**, gana el palo con mayor fuerza: **Oros > Espadas > Copas > Bastos**
  - Ejemplo: As de Espadas gana al As de Bastos
- Quien gana la baza juega primero en la siguiente ronda

### 🎭 Ronda Final "A CIEGAS"

En la última ronda (1 carta) se juega de forma especial:
1. Cada jugador recibe 1 carta boca abajo
2. **SIN mirarla**, a la señal, todos ponen la carta **en la frente** mirando hacia los demás
3. Ahora cada jugador **ve las cartas de los demás pero no la propia**
4. Por turnos, cada jugador hace su apuesta (0 o 1) basándose en las cartas que ve
5. Solo después de que todos hayan apostado, se juegan las cartas normalmente
6. ¡Añade suspense y estrategia: debes deducir tu carta por las de los demás!

---

## 💯 Puntuación

El cálculo es simple y automático:

### Si predices exactamente:
```
Puntos = 10 (base) + (bazas conseguidas × 3)
```

**Ejemplos:**
- Apostó 0, hizo 0 → **10 puntos** (10 + 0×3)
- Apostó 2, hizo 2 → **16 puntos** (10 + 2×3)
- Apostó 5, hizo 5 → **25 puntos** (10 + 5×3)

### Si te equivocas:
```
Puntos = 0
```

---

## 🏆 Final del Juego y Ganador

El juego termina después de la ronda A CIEGAS.

**Gana** quien tenga la **puntuación total más alta** sumando todas las rondas.

En caso de empate, gana quien haya hecho más predicciones correctas durante la partida.

---

## 💡 Consejos Estratégicos

1. **Revisa tu mano**: Evalúa realistamente tus cartas antes de apostar
2. **Observa al repartidor**: Recuerda que el repartidor no puede hacer ciertas apuestas
3. **Memoria**: Lleva la cuenta de las cartas jugadas para predecir mejor las bazas siguientes
4. **Equilibrio**: A veces es mejor apostar 0 si tienes una mano débil
5. **Ronda A CIEGAS**: ¡Requiere deducción basada en lo que ves!

---

## 🎲 Variantes

### Variante con Triunfo
Algunas versiones incluyen un **triunfo aleatorio** en cada ronda:
- Se descubre una carta del mazo
- Ese palo se convierte en triunfo (siempre gana a los palos normales)

> La app actualmente soporta la versión **sin triunfo**

---

## ❓ Preguntas Frecuentes

**P: ¿Qué pasa si todos fallan?**  
R: Nadie obtiene puntos en esa ronda.

**P: ¿Puedo apostar 0?**  
R: ¡Sí! Apostar 0 y no conseguir ninguna baza vale 10 puntos.

**P: ¿El repartidor está en desventaja?**  
R: Sí y no. No puede hacer ciertas apuestas, pero apuesta último y tiene más información.

**P: ¿Qué pasa si apuesto 3 pero hago 2?**  
R: Obtienes 0 puntos. Debes predecir **exactamente**.

---

## 📱 Uso de la App

La app **Podrida Anotador** gestiona automáticamente:
- ✅ Cálculo de puntuaciones
- ✅ Restricciones del repartidor
- ✅ Rotación de turnos
- ✅ Historial completo de rondas
- ✅ Clasificación en tiempo real

¡Diviértete! 🎉
