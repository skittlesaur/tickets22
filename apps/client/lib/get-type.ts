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

export const getTypeAr = (roundNumber: number, matchNumber: number, group?: string) => {
  if ([1, 2, 3].includes(roundNumber))
    return `المجموعة ${group}`

  if (roundNumber === 4)
    return 'دور الـ 16'

  if (roundNumber === 5)
    return 'دور ربع النهائي'

  if (roundNumber === 6)
    return 'دور نصف النهائي'

  if (roundNumber === 7 && matchNumber === 63)
    return 'المركز الثالث'

  if (roundNumber === 7 && matchNumber == 64)
    return 'النهائي'
}

export default getType