import axios from 'axios'
import { SHOP_SERVICE_URL } from '@services/constants'

const SHOP_SERVICE = axios.create({
  baseURL: SHOP_SERVICE_URL,
  withCredentials: true,
})

export default SHOP_SERVICE