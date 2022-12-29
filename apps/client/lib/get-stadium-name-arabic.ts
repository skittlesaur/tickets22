const getStadiumNameArabic = (stadiumName: string) => {
  if (stadiumName === 'Al Bayt Stadium') return 'استاد البيت'
  if (stadiumName === 'Al Janoub Stadium') return 'استاد الجنوب'
  if (stadiumName === 'Khalifa International Stadium') return 'استاد خليفة الدولي'
  if (stadiumName === 'Al Thumama Stadium') return 'استاد الثمامة'
  if (stadiumName === 'Ahmad Bin Ali Stadium') return 'استاد أحمد بن علي'
  if (stadiumName === 'Lusail Stadium') return 'استاد لوسيل'
  if (stadiumName === 'Education City Stadium') return 'استاد مدينة التعليم'
  if (stadiumName === 'Stadium 974') return 'استاد 974'
}

export default getStadiumNameArabic