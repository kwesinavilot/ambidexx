export interface WordSet {
    name: string;
    words: string[];
  }
  
  export const WORD_SETS: Record<string, WordSet> = {
    CULINARY: {
      name: 'Culinary Journey',
      words: ['salt', 'herb', 'cake', 'cook', 'food', 'meal', 'chef', 'diet']
    },
    TECH: {
      name: 'Tech Evolution',
      words: ['chip', 'code', 'data', 'tech', 'byte', 'apps', 'net', 'web']
    },
    MUSIC: {
      name: 'Musical Genres',
      words: ['rock', 'jazz', 'pop', 'folk', 'rap', 'soul', 'punk', 'beat']
    },
    ART: {
      name: 'Art Movements',
      words: ['dada', 'pop', 'arte', 'form', 'line', 'shade', 'bold', 'work']
    },
    BIOLOGY: {
      name: 'Biological Progress',
      words: ['cell', 'gene', 'dna', 'life', 'seed', 'grow', 'tree', 'root']
    }
  };
  
  export class WordDictionary {
    private dictionary: Set<string>;
  
    constructor(wordSet: WordSet) {
      this.dictionary = new Set(wordSet.words.map(word => word.toLowerCase()));
    }
  
    isValidWord(word: string): boolean {
      return this.dictionary.has(word.toLowerCase());
    }
  
    getRandomStartWord(): string {
      const words = Array.from(this.dictionary);
      return words[Math.floor(Math.random() * words.length)];
    }
  
    static generateWordLadder(start: string, end: string): string[] {
      // Basic implementation - can be expanded
      const ladder: string[] = [start];
      let current = start;
  
      while (current !== end) {
        const nextWord = this.generateNextWord(current, end);
        ladder.push(nextWord);
        current = nextWord;
      }
  
      return ladder;
    }
  
    private static generateNextWord(current: string, target: string): string {
      // Simple letter replacement strategy
      const chars = current.split('');
      for (let i = 0; i < chars.length; i++) {
        const newChar = target[i] || String.fromCharCode(
          current.charCodeAt(i) + (Math.random() > 0.5 ? 1 : -1)
        );
        chars[i] = newChar;
      }
      return chars.join('');
    }
  }