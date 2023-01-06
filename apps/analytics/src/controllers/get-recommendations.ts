import { Request, Response } from 'express'
import { IpregistryClient } from '@ipregistry/client'
import getRecommendedForYou from '../lib/get-recommended-for-you'
import getHotSellingMatch from '../lib/get-hot-selling'
import getUpcomingMatch from '../lib/get-upcoming-match'


const getRecommendations = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context
    const client = new IpregistryClient('rxa3qkj3xba0jt2f')
    const ipAddress = '197.47.190.20' // (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string

    const randomDay = Math.floor(Math.random() * 12)
    const currentDate = new Date(`2022-11-${20 + randomDay}`)
    //const currentDate = new Date(`2022-11-20`)

    let locationData = (await client.lookup(ipAddress /*'86.36.0.0' '103.68.134.0'*/)).data.location
    locationData.country.name = locationData.country.name === 'United States' ? 'USA' : locationData.country.name

    const recommendedForYou = await getRecommendedForYou(prisma, currentDate, locationData)

    const hotSellingMatch = await getHotSellingMatch(prisma, currentDate)

    const upcomingMatch = await getUpcomingMatch(prisma, currentDate)

    res.status(200).json([recommendedForYou, hotSellingMatch, upcomingMatch])

  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getRecommendations