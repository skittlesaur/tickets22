import { Request, Response } from "express";

const getUpcomingMatches = async (req: Request, res: Response) => {
    try {

        const upcomingMatches = await req.context.prisma.match.findMany({
            where: {
                date: {
                    gte: new Date()
                }
            },
            orderBy: {
                date: 'asc'
            },
            take: 4
        })

        res.status(200).json({ upcomingMatches })


    } catch (error) {

    }
}

export default getUpcomingMatches