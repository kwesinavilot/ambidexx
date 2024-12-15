import { WordDictionary, WORD_SETS } from './word-dictionary.ts';
import { WordValidator } from './word-validator.ts';

export interface Player {
  id: string;
  username: string;
  score: number;
}

export interface GameSession {
  id: string;
  players: [Player, Player];
  currentPlayerIndex: number;
  wordSet: string;
  currentWord: string;
  turnTimeRemaining: number;
  totalTurns: number;
  maxTurns: number;
  gameStatus: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
}

export class WordLadderGame {
  private session: GameSession;
  private dictionary: WordDictionary;

  constructor(player1: Player, player2: Player, wordSetKey: string = 'TECH') {
    const wordSet = WORD_SETS[wordSetKey];
    this.dictionary = new WordDictionary(wordSet);

    this.session = {
      id: this.generateGameId(),
      players: [player1, player2],
      currentPlayerIndex: 0,
      wordSet: wordSetKey,
      currentWord: this.dictionary.getRandomStartWord(),
      turnTimeRemaining: 15,
      totalTurns: 0,
      maxTurns: 8,
      gameStatus: 'WAITING'
    };
  }

  private generateGameId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  makeMove(playerId: string, newWord: string): boolean {
    const currentPlayer = this.session.players[this.session.currentPlayerIndex];
    
    // Validate the move
    if (playerId !== currentPlayer.id) return false;
    
    if (!this.dictionary.isValidWord(newWord)) return false;
    
    if (!WordValidator.validateWordTransformation(this.session.currentWord, newWord)) return false;

    // Update game state
    currentPlayer.score++;
    this.session.currentWord = newWord;
    this.session.currentPlayerIndex = 1 - this.session.currentPlayerIndex;
    this.session.turnTimeRemaining = 15;
    this.session.totalTurns++;

    // Check game completion
    if (this.session.totalTurns >= this.session.maxTurns) {
      this.session.gameStatus = 'COMPLETED';
    }

    return true;
  }

  getGameState(): GameSession {
    return { ...this.session };
  }

  calculateWinner(): Player | null {
    if (this.session.gameStatus !== 'COMPLETED') return null;

    const [player1, player2] = this.session.players;
    return player1.score > player2.score ? player1 :
           player2.score > player1.score ? player2 : null;
  }

  startGame(): void {
    this.session.gameStatus = 'IN_PROGRESS';
  }

  tickTurn(): boolean {
    if (this.session.turnTimeRemaining > 0) {
      this.session.turnTimeRemaining--;
      return true;
    }
    
    // Time ran out for current player
    this.session.currentPlayerIndex = 1 - this.session.currentPlayerIndex;
    this.session.turnTimeRemaining = 15;
    this.session.totalTurns++;

    // Check game completion
    if (this.session.totalTurns >= this.session.maxTurns) {
      this.session.gameStatus = 'COMPLETED';
      return false;
    }

    return true;
  }
}