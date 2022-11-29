import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'

const createToken = (user: { id: string }) => {
  const { id } = user
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export default createToken