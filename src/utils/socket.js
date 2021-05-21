import { API_ENDPOINT } from "../config/environmentConfig"
import socketIOClient from "socket.io-client"

const WEB_SOCKET_NAMESPACE = "_web"
export const WEB_SOCKET_ENDPOINT = `${API_ENDPOINT}/${WEB_SOCKET_NAMESPACE}`

// export const serverSocket = socketIOClient(WEB_SOCKET_ENDPOINT)

export const serverSocket = socketIOClient(WEB_SOCKET_ENDPOINT, {
    transports: ['websocket']
})
