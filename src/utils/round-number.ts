export const roundNumber = (value: number): number => {
  return Number(Math.round(parseFloat(value + 'e' + 2)) + 'e-' + 2)
}
