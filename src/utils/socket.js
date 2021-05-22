import socketIOClient from "socket.io-client"
import { API_ENDPOINT } from "../config/environmentConfig"

const WEB_SOCKET_NAMESPACE = "_web"
const WEB_SOCKET_ENDPOINT = `${API_ENDPOINT}/${WEB_SOCKET_NAMESPACE}`

export const serverSocket = socketIOClient(WEB_SOCKET_ENDPOINT)