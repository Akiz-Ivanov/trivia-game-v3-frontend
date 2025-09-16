import axios from "axios"

type Credentials = {
  login: string
  password: string
}

const baseUrl = '/api/login'

const login = async (credentials: Credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials, {
      timeout: 5000,
    })
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.error || "Something went wrong"
      throw new Error(message)
    } else {
      throw new Error("Unexpected error")
    }
  }
}

//See if you can later move token somewhere else
let token: string | null = null

const setToken = (newToken: string | null) => {
  token = `Bearer ${newToken}`
}

console.log(token)

export default { login, setToken }