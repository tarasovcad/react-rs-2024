import {render, screen} from "@testing-library/react";
import LoaderDetailedCard from "~/components/loader/LoaderDetailedCard";



describe("Loader component", () => {
  it("renders the detailedLoader correctly", () => {
    render(<LoaderDetailedCard />);

    const loaderSection = screen.getByTestId("loader-section");
    expect(loaderSection).toBeInTheDocument();

    const loader1 = screen.getByTestId("loader1");
    expect(loader1).toBeInTheDocument();

    const loader2 = screen.getByTestId("loader2");
    expect(loader2).toBeInTheDocument();
  });
});
