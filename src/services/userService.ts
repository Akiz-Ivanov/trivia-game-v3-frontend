import axios from "axios"

type AvailabilityCheck = {
  username?: string;
  email?: string;
  signal?: AbortSignal;
}

const checkUserAvailability = async ({
  username,
  email,
  signal,
}: AvailabilityCheck): Promise<{ available: boolean }> => {

  const params = new URLSearchParams()
  if (username) params.append("username", username)
  if (email) params.append("email", email)

  try {
    const response = await axios.get(`/api/users/check?${params.toString()}`, {
      signal,
    })
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.error || "Something went wrong";
      throw new Error(message);
    } else {
      throw new Error("Unexpected error");
    }
  }
}

export default { checkUserAvailability }