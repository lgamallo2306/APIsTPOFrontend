import axios from 'axios'

export const URL = 'http://localhost:8080'

const ERROR_CONEXION = 'No pudimos conectar con el servidor. Revisá tu conexión e intentá de nuevo.'


export const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response ? error.response.data.message : ERROR_CONEXION
    return Promise.reject(new Error(message))
  }
)

