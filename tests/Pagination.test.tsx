import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '~/components/Pagination';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('@remix-run/react', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Pagination Component', () => {
  const totalPages = 5;
  const currentPage = 3;

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    renderComponent();

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={totalPages} currentPage={1} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={totalPages} currentPage={totalPages} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Previous')).not.toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
  });
  it('should not navigate to the next page if currentPage is equal to totalPages', () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={5} currentPage={5} />
      </MemoryRouter>,
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
  it('should navigate to the next page when onClickNext is called', () => {
    render(<Pagination totalPages={5} currentPage={3} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/4');
  });
  it('should not navigate to the previous page if currentPage is 1', () => {
    render(<Pagination totalPages={5} currentPage={1} />);

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
  it('should navigate to the previous page when onClickPrev is called', () => {
    render(<Pagination totalPages={5} currentPage={3} />);

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/2');
  });
});
