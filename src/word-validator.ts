export class WordValidator {
    static validateWordTransformation(previousWord: string, newWord: string): boolean {
      // Check if words are same length
      if (previousWord.length !== newWord.length) return false;
  
      // Count letter differences
      let differences = 0;
      for (let i = 0; i < previousWord.length; i++) {
        if (previousWord[i] !== newWord[i]) {
          differences++;
        }
      }
  
      // Only one letter can be different
      return differences === 1;
    }
  
    static calculateWordSimilarity(word1: string, word2: string): number {
      let matches = 0;
      for (let i = 0; i < word1.length; i++) {
        if (word1[i] === word2[i]) matches++;
      }
      return matches / word1.length;
    }
  
    static generateHint(previousWord: string, newWord: string): string {
      const hint: string[] = [];
      for (let i = 0; i < previousWord.length; i++) {
        if (previousWord[i] !== newWord[i]) {
          hint.push(`Change '${previousWord[i]}' to '${newWord[i]}'`);
        }
      }
      return hint.join(', ');
    }
  }