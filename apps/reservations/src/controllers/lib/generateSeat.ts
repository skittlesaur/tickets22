const generateSeat = (category: number) => {

  let seatRow: number = 0

  switch (category) {
    case (1):
      seatRow = Math.floor(Math.random() * (15 - 1) + 1)
      break
    case (2):
      seatRow = Math.floor(Math.random() * (30 - 16) + 16)
      break
    case (3):
      seatRow = Math.floor(Math.random() * (46 - 31) + 31)
      break
  }

  return { seatRow: seatRow }

}

export default generateSeat