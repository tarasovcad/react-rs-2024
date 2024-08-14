import React from "react";
import {render} from "@testing-library/react";
import ClientProviders from "@/providers/ClientProviders";

// Mock the children component
const ChildComponent = () => <div>Child Component</div>;

describe("ClientProviders", () => {
  it("renders children within all providers", () => {
    const {getByText} = render(
      <ClientProviders>
        <ChildComponent />
      </ClientProviders>,
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
