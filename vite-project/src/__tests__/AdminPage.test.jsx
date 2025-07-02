import { render, screen } from '@testing-library/react'
import AdminPage from '../pages/AdminPage'

test('renders admin dashboard', () => {
  render(<AdminPage darkMode={false} />)
  expect(screen.getByRole('heading', { name: /admin/i })).toBeInTheDocument()
})
