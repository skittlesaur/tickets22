import axios from 'axios'
import { ANALYTICS_SERVICE_URL } from '@services/constants'

const ANALYTICS_SERVICE = axios.create({
  baseURL: ANALYTICS_SERVICE_URL,
  withCredentials: true,
})

export default ANALYTICS_SERVICE