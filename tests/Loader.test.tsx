import { render, screen } from '@testing-library/react';
import Loader from '~/components/loader/Loader';

describe('Loader component', () => {
  it('renders the loader correctly', () => {
    render(<Loader />);

    const loaderOverlay = screen.getByTestId('loader-overlay');
    expect(loaderOverlay).toBeInTheDocument();

    const loaderSection = screen.getByTestId('loader-section');
    expect(loaderSection).toBeInTheDocument();

    const loader1 = screen.getByTestId('loader1');
    expect(loader1).toBeInTheDocument();

    const loader2 = screen.getByTestId('loader2');
    expect(loader2).toBeInTheDocument();
  });
});
