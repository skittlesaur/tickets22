import { PrismaClient } from '@prisma/client'

const colors: any = {
  qatar: {
    primary: '#8A1538',
    secondary: '#FFFFFF',
  },
  ecuador: {
    primary: '#F9DE4B',
    secondary: '#1F4DA2',
  },
  england: {
    primary: '#FFFFFF',
    secondary: '#CC2B1D',
  },
  iran: {
    primary: '#48A141',
    secondary: '#FFFFFF',
  },
  senegal: {
    primary: '#3C8740',
    secondary: '#FCF150',
  },
  netherlands: {
    primary: '#AE2329',
    secondary: '#FFFFFF',
  },
  usa: {
    primary: '#FFFFFF',
    secondary: '#C60C30',
  },
  wales: {
    primary: '#C3292E',
    secondary: '#FFFFFF',
  },
  argentina: {
    primary: '#75ABDF',
    secondary: '#FFFFFF',
  },
  'saudi arabia': {
    primary: '#2F6D36',
    secondary: '#FFFFFF',
  },
  denmark: {
    primary: '#C92A2F',
    secondary: '#FFFFFF',
  },
  tunisia: {
    primary: '#E73223',
    secondary: '#FFFFFF',
  },
  mexico: {
    primary: '#2C6847',
    secondary: '#FFFFFF',
  },
  poland: {
    primary: '#FFFFFF',
    secondary: '#DB2F3D',
  },
  france: {
    primary: '#081D95',
    secondary: '#FFFFFF',
  },
  australia: {
    primary: '#F5C300',
    secondary: '#000000',
  },
  morocco: {
    primary: '#C1282D',
    secondary: '#296233',
  },
  croatia: {
    primary: '#FFFFFF',
    secondary: '#D00027',
  },
  germany: {
    primary: '#FFFFFF',
    secondary: '#000000',
  },
  japan: {
    primary: '#FFFFFF',
    secondary: '#D00027',
  },
  spain: {
    primary: '#AD231A',
    secondary: '#F5BE41',
  },
  'costa rica': {
    primary: '#D92F20',
    secondary: '#FFFFFF',
  },
  belgium: {
    primary: '#EA3340',
    secondary: '#000000',
  },
  canada: {
    primary: '#EA3323',
    secondary: '#FFFFFF',
  },
  switzerland: {
    primary: '#EA3323',
    secondary: '#FFFFFF',
  },
  cameroon: {
    primary: '#CD2C28',
    secondary: '#F8D247',
  },
  uruguay: {
    primary: '#1334A8',
    secondary: '#FFFFFF',
  },
  'korea republic': {
    primary: '#CD2E3A',
    secondary: '#000000',
  },
  portugal: {
    primary: '#EA3323',
    secondary: '#2C671A',
  },
  ghana: {
    primary: '#FFFFFF',
    secondary: '#000000',
  },
  brazil: {
    primary: '#FAE04B',
    secondary: '#469D3B',
  },
  serbia: {
    primary: '#C6363C',
    secondary: '#FFFFFF',
  },
}

const generateTeamColors = async () => {
  const prisma = new PrismaClient()
  const teams = await prisma.team.findMany()

  for (const team of teams) {
    console.log(`Updating team ${team.name}`)
    const color = colors[team.name.toLowerCase()]
    await prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        primaryColor: color.primary,
        secondaryColor: color.secondary,
      },
    })
  }

  console.log('Done')
}

export default generateTeamColors