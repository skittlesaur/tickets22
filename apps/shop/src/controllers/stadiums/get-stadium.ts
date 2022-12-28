import { Request, Response } from 'express'

const getStadium = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id)
      return res.status(400).json({
        message: 'Missing stadium id',
        details: 'The stadium id is missing from the request parameters',
        code: 'invalid_parameters',
        help: '',/*todo later*/
      })

    const stadium = await req.context.prisma.stadium.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
      },
    })

    if (!stadium) {
      return res.status(404).json({
        message: 'Stadium not found',
        details: 'The stadium with the given id does not exist',
        code: 'not_found',
        help: '',/*todo later*/
      })
    }

    return res.status(200).json(stadium)
  } catch (e) {

  }

}

export default getStadium