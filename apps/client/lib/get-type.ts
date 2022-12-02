const getType = (roundNumber: number, matchNumber: number, group?: string) => {
  if ([1, 2, 3].includes(roundNumber))
    return `Group ${group}`

  if (roundNumber === 4)
    return 'Round of 16'

  if (roundNumber === 5)
    return 'Quarter-Final'

  if (roundNumber === 6)
    return 'Semi-Final'

  if (roundNumber === 7 && matchNumber === 63)
    return '3rd Place'

  if (roundNumber === 7 && matchNumber == 64)
    return 'Final'
}

export default getType