import React from 'react';
import { render } from '@testing-library/react';
import { ThemeContext } from '@/contexts/ThemeContext';
import Layout from '@/components/layout/Layout';

jest.mock('./../src/components/Navbar', () => () => <div>Mocked Navbar</div>);

describe('Layout Component', () => {
  it('sets data-theme attribute based on isDarkMode', () => {
    const mockChildren = <div>Mocked Children</div>;

    // Test for dark mode
    render(
      <ThemeContext.Provider value={{ isDarkMode: true }}>
        <Layout>{mockChildren}</Layout>
      </ThemeContext.Provider>,
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Test for light mode
    render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <Layout>{mockChildren}</Layout>
      </ThemeContext.Provider>,
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('renders Navbar and children correctly', () => {
    const mockChildren = <div>Mocked Children</div>;

    const { getByText } = render(
      <ThemeContext.Provider value={{ isDarkMode: false }}>
        <Layout>{mockChildren}</Layout>
      </ThemeContext.Provider>,
    );

    expect(getByText('Mocked Navbar')).toBeInTheDocument();
    expect(getByText('Mocked Children')).toBeInTheDocument();
  });
});
