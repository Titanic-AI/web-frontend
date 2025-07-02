import { render, screen } from '@testing-library/react'
import HistoryPanel from '../pages/HistoryPanel'

vi.mock("../api", () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({ data: [{ id: 1, model: "Mocked", timestamp: Date.now() }] })
    ),
  },
}));

test('renders history section', () => {
  render(<HistoryPanel />)
  expect(screen.getByText(/survived/i)).toBeInTheDocument()
})
