export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetterSet = new Set("party".split(""));
  const guessedLetterSet = new Set(guessedWord.split(""));
  return [...secretLetterSet].filter((letter) => guessedLetterSet.has(letter))
    .length;
}
