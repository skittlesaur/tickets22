import axios from 'axios'
import { SECURITY_SERVICE_URL } from '@services/constants'

const SECURITY_SERVICE = axios.create({
  baseURL: SECURITY_SERVICE_URL,
  withCredentials: true,
})

export default SECURITY_SERVICE