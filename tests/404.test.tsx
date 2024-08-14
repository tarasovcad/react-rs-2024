import { render, screen } from '@testing-library/react';
import NotFound from '~/components/NotFound';

vi.mock('./../src/components/NotFound', () => {
  return function MockNotFound() {
    return <div data-testid="not-found">Not Found Component</div>;
  };
});

describe('Page Component', () => {
  it('renders the NotFound component', () => {
    render(<NotFound />);

    // Check if the mocked NotFound component is rendered
    const notFoundElement = screen.getByText('There is nothing...');
    expect(notFoundElement).toBeInTheDocument();
  });
});
