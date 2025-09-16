import { renderHook } from '@testing-library/react'
import useAuth from '@/hooks/useAuth'
import { AuthProvider } from '@/context/AuthProvider'

describe('useAuth', () => {

  test('throws error when used outside AuthProvider', () => {
    expect(() =>
      renderHook(() => useAuth())
    ).toThrowError('useAuth must be used within AuthProvider')
  })

  test('returns context when used within AuthProvider', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    expect(result.current).toHaveProperty('user')
    expect(result.current).toHaveProperty('setUser')
    expect(result.current).toHaveProperty('logout')
  })
})