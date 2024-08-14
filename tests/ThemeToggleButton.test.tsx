import { render, fireEvent } from '@testing-library/react';
import { ThemeContext } from '~/providers/ThemeProvider';
import ThemeToggleButton from '~/components/ui/ThemeToggleButton';

describe('ThemeToggleButton', () => {
  it('renders the sun icon when in dark mode', () => {
    const mockToggleTheme = vi.fn();
    const { getByRole } = render(
      <ThemeContext.Provider value={{ isDarkMode: true, toggleTheme: mockToggleTheme }}>
        <ThemeToggleButton />
      </ThemeContext.Provider>,
    );

    const button = getByRole('button');
    expect(button.querySelector('.lucide-sun')).toBeTruthy();
  });

  it('renders the moon icon when in light mode', () => {
    const mockToggleTheme = vi.fn();
    const { getByRole } = render(
      <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme: mockToggleTheme }}>
        <ThemeToggleButton />
      </ThemeContext.Provider>,
    );

    const button = getByRole('button');
    expect(button.querySelector('.lucide-moon')).toBeTruthy();
  });

  it('calls toggleTheme when clicked', () => {
    const mockToggleTheme = vi.fn();
    const { getByRole } = render(
      <ThemeContext.Provider value={{ isDarkMode: true, toggleTheme: mockToggleTheme }}>
        <ThemeToggleButton />
      </ThemeContext.Provider>,
    );

    const button = getByRole('button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
