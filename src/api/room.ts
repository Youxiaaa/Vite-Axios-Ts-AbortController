import { http } from '../utils/AxiosInstance'

const api = {
  getRoomList: ({ ...data }) => http.httpRequestGet('/api/room/room/getRoomList', { params: { ...data } })
}

export default api