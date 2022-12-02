const formatPlayerName = (str: string) => (
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())
)

export default formatPlayerName