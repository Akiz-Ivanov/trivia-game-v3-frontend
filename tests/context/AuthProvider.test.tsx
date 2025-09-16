import { render, renderHook, screen, act, waitFor } from '@testing-library/react'
import { AuthProvider } from '@/context/AuthProvider'
import useAuth from '@/hooks/useAuth'
import loginService from '@/services/loginService'

vi.mock('@/services/loginService', () => ({
  default: {
    login: vi.fn(),
    setToken: vi.fn(),
  },
}))

describe('AuthProvider', () => {

  const user = {
    username: 'test',
    email: 'test@example.com',
    token: 'abc'
  }

  beforeEach(() => {
    window.localStorage.clear()
    vi.clearAllMocks()
  })

  test('renders children', () => {
    const children = <div>Test</div>
    render(
      <AuthProvider>
        {children}
      </AuthProvider>
    )
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  test('initializes user from localStorage', () => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    expect(result.current.user).toEqual(user)
  })

  test('logout clears user and localStorage', () => {

    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    act(() => {
      result.current.setUser(user)
    })
    expect(result.current.user).toEqual(user)

    act(() => {
      result.current.logout()
    })
    expect(result.current.user).toBe(null)
    expect(window.localStorage.getItem('loggedUser')).toBe(null)
  })

  test('handles invalid localStorage JSON gracefully', async () => {
    window.localStorage.setItem('loggedUser', 'invalid JSON')

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    await waitFor(() => {
      expect(result.current.user).toBe(null)
      expect(window.localStorage.getItem('loggedUser')).toBe(null)
    })
  })

  test('calls loginService.setToken on setUser', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    act(() => {
      result.current.setUser(user)
    })

    expect(loginService.setToken).toHaveBeenCalledWith(user.token)
  })

  test('calls loginService.setToken(null) on logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    act(() => {
      result.current.logout()
    })

    expect(loginService.setToken).toHaveBeenCalledWith(null)
  })
})