export function isLetterUnlocked(index, day, returnDate, now = Date.now()) {
  return index < 9
    || (index === 9 && day >= 30)
    || (index === 10 && day >= 60)
    || (index === 11 && now >= new Date(returnDate));
}
