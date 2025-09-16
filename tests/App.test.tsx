import { render, screen } from '@testing-library/react'
import App from '@/App'
import { SettingsProvider } from '@/context/SettingsProvider'
import { AuthProvider } from '@/context/AuthProvider'

test('renders app title', () => {
  render(
    <AuthProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </AuthProvider>
  )
  expect(screen.getByText(/trivia/i)).toBeInTheDocument()
})