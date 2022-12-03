import axios from 'axios'
import { RESERVATIONS_SERVICE_URL } from '@services/constants'

const RESERVATIONS_SERVICE = axios.create({
  baseURL: RESERVATIONS_SERVICE_URL,
  withCredentials: true,
})

export default RESERVATIONS_SERVICE