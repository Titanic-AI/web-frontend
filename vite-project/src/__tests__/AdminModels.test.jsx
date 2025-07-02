import { render, screen } from '@testing-library/react'
import AdminModels from '../pages/AdminModels'

vi.mock("../api", () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({ data: [{ id: 1, name: "Model X" }] })
    ),
  },
}));

test('renders admin model heading', () => {
  render(<AdminModels />)
  expect(screen.getByText(/mock model/i)).toBeInTheDocument()
})
