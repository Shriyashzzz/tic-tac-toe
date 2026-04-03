# Tic-Tac-Toe

> Built as a practice project while learning JavaScript through [The Odin Project](https://www.theodinproject.com). The goal was to apply factory functions, closures, and the module pattern in a real project.

A browser-based two-player Tic-Tac-Toe game built with vanilla JavaScript.

## Demo

Open `index.html` in any browser,  no build tools or dependencies required.

## How to play

1. Click **Start** and enter both player names
2. Click **Submit** to begin the game
3. Players take turns clicking cells — Player 1 is X, Player 2 is O
4. The game detects wins across rows, columns, and both diagonals
5. If all 9 cells are filled with no winner, the game ends in a draw
6. Click **Reset** at any time to clear the board and start over

## Project structure

```
tic-tac-toe/
├── index.html
├── style.css
└── js.js
```

## JavaScript architecture

The code is organised using the **module pattern** — three IIFE modules, each responsible for a distinct concern:

**`gameBoard`** — owns all game state. Manages the board array, player objects, move validation, win detection, and the turn counter. Nothing is directly accessible from outside — all interaction goes through its public API.

**`userUI`** — handles DOM interaction. Manages button clicks, updates the game info display, enables/disables cells, and exposes player name management.

**`uiController`** — wires up the Start and Reset buttons, controls the player name dialog, and coordinates between `gameBoard` and `userUI`.

## Concepts practised

- Factory functions and the module pattern (IIFE)
- Closures and private variables
- Prototypal separation of concerns
- DOM manipulation and event listeners
- Defensive patterns: controlled state mutation via getters/setters

## Known limitations

- No AI opponent — two human players only
- No score tracking across multiple games