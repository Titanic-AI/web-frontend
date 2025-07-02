import { render, screen } from '@testing-library/react'
import Calculator from '../pages/Calculator'

test('renders survival calculator', () => {
  render(<Calculator darkMode={false} isAuthenticated={false} />)
  expect(screen.getByText(/class/i)).toBeInTheDocument()
})
