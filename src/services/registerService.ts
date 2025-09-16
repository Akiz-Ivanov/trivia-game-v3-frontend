import axios from 'axios'

type RegisterCredentials = {
  username: string
  email: string
  password: string
}

const baseUrl = '/api/users'

const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
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

export default { register }