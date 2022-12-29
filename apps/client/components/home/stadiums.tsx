import Stadium from '@components/home/stadium'
import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'

const stadiums = [
  {
    name: 'Al Bayt Stadium',
    description: 'The warmest of Arab welcomes',
    img: 'https://www.qatar2022.qa/sites/default/files/styles/1440x815/public/2022-08/Al-Bayt-Stadium.jpg?h=aa3f82a2&itok=mIBqOXcB',
  },
  {
    name: 'Lusail Stadium',
    description: 'Alive with heritage, an icon for the future',
    img: 'https://www.qatar2022.qa/sites/default/files/styles/1440x815/public/2022-08/Lusail-Stadium.jpg?h=48c16481&itok=vK9KsyE3',
  },
  {
    name: 'Ahmad Bin Ali Stadium',
    description: 'Where desert stories unfold',
    img: 'https://www.qatar2022.qa/sites/default/files/styles/1440x815/public/2022-08/Ahmad-Bin-Ali-Stadium.jpg?h=8f9cfe54&itok=zt2GOB01',
  },
  {
    name: 'Al Janoub Stadium',
    description: 'Football sails into a new era',
    img: 'https://www.qatar2022.qa/sites/default/files/styles/1440x815/public/2022-08/Al-Janoub-Stadium.jpg?h=f8ea1366&itok=aJpXm9Lf',
  },
  {
    name: 'Al Thumama Stadium',
    description: 'A venue steeped in culture and tradition',
    img: 'https://www.qatar2022.qa/sites/default/files/styles/1440x815/public/2022-08/Al-Thumama-Stadium.jpg?h=98540297&itok=Gu6kll24',
  },
  {
    name: 'Education City Stadium',
    description: 'A shimmering jewel of inspiration',
    img: 'https://www.qatar2022.qa/sites/default/files/styles/1440x815/public/2022-08/Education-City-Stadium.jpg?h=bf548865&itok=wIMLDvYX',
  },
  {
    name: 'Khalifa International Stadium',
    description: 'A sporting legend re-energised',
    img: 'https://www.qatar2022.qa/sites/default/files/styles/1440x815/public/2022-08/Khalifa-International-Stadium.jpg?h=b5673621&itok=_sZr4yIe',
  },
  {
    name: 'Stadium 974',
    description: 'Innovation at the heart of it all',
    img: 'https://www.qatar2022.qa/sites/default/files/styles/1440x815/public/2022-08/Stadium-974.jpg?h=27457cb0&itok=lwq-j9pX',
  },
]

const Stadiums = () => {

  return (
    <div className="relative flex flex-col gap-8 -mt-24">
      <h1 className="z-[2] sticky top-0 pt-24 font-black text-4xl mx-4 md:mx-16 lg:mx-40">
        Stadiums
      </h1>
      <div>
        {stadiums.map((stadium) => (
          <Stadium key={stadium.name} stadium={stadium} />
        ))}
      </div>
    </div>
  )
}

export default Stadiums