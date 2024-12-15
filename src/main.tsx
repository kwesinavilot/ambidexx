import { Devvit } from '@devvit/public-api';
import { WordLadderGame } from './game-logic.ts';

// Define message types for WebView communication
type GameMessage = 
  | { type: 'START_GAME', data: { wordSet: string } }
  | { type: 'MAKE_MOVE', data: { word: string } }
  | { type: 'GET_GAME_STATE' }
  | { type: 'TICK_TURN' };

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: 'Word Ladder Game',
  description: 'An addictive multiplayer word transformation game',
  height: 'tall',
  render: (context) => {
    // Game state management
    const [gameInstance, setGameInstance] = Devvit.useState<WordLadderGame | null>(null);
    const [currentUser, setCurrentUser] = Devvit.useState<string>('');
    const [gameStatus, setGameStatus] = Devvit.useState<string>('WAITING');

    // Initialize game and user
    Devvit.useAsync(async () => {
      const user = await context.reddit.getCurrentUser();
      setCurrentUser(user?.username ?? 'Anonymous');
    }, []);

    // Handle WebView messages
    const onMessage = async (msg: GameMessage) => {
      switch (