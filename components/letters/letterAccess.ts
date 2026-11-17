export function isLetterUnlocked(index: number, day: number, returnDate: string, now = Date.now()): boolean {
  return index < 9
    || (index === 9 && day >= 30)
    || (index === 10 && day >= 60)
    || (index === 11 && now >= +new Date(returnDate));
}
