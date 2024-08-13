import {render, screen, fireEvent} from "@testing-library/react";
import Navbar from "@/components/Navbar";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Navbar Component", () => {
  it("renders the logo and error button", () => {
    render(<Navbar />);

    // Check if the logo is rendered
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    // Check if the error button is rendered
    const errorButton = screen.getByText("Throw error");
    expect(errorButton).toBeInTheDocument();
  });

  it("throws an error when the error button is clicked", () => {
    render(<Navbar />);

    // Click the error button
    const errorButton = screen.getByText("Throw error");
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow("This is a test error");
  });
});
