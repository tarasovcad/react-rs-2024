import {render, waitFor} from "@testing-library/react";
import {cookies} from "next/headers";
import {fetchDataByTerm} from "@/components/api/fetchDataByTerm";
import Page from "@/app/search/[search]/page";
import {PageProps} from "@/types/types";

// Mocks
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("./../src/components/api/fetchDataByTerm", () => ({
  fetchDataByTerm: jest.fn(),
}));
jest.mock("./../src/components/Main", () => {
  return {
    __esModule: true,
    default: function MockMain(props: PageProps): React.ReactElement {
      return <div data-testid="mock-main">{JSON.stringify(props)}</div>;
    },
  };
});

describe("Page Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data and renders Main component", async () => {
    const mockCookies = {
      get: jest.fn().mockReturnValue({value: "test-term"}),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookies);

    const mockCharacters = {
      results: [{id: 1, name: "Rick"}],
      info: {pages: 5},
    };
    (fetchDataByTerm as jest.Mock).mockResolvedValue(mockCharacters);

    const props: PageProps = {
      params: {search: 1},
      searchParams: {details: "0"},
    };

    const {getByTestId} = render(await Page(props));

    await waitFor(() => {
      const mainProps = JSON.parse(getByTestId("mock-main").textContent!);
      expect(mainProps.isDetailsOpen).toBe(false);
      expect(mainProps.term).toBe("test-term");
      expect(mainProps.currentPage).toBe(1);
      expect(mainProps.totalPages).toBe(5);
      expect(mainProps.characters).toEqual(mockCharacters);
      expect(mainProps.notFound).toBe(false);
    });
  });

  it("handles not found scenario", async () => {
    (cookies as jest.Mock).mockReturnValue({get: () => ({value: ""})});
    (fetchDataByTerm as jest.Mock).mockResolvedValue(false);

    const props = {
      params: {search: 1},
      searchParams: {},
    };

    const {getByTestId} = render(await Page(props));

    await waitFor(() => {
      const mainProps = JSON.parse(getByTestId("mock-main").textContent!);
      expect(mainProps.notFound).toBe(true);
      expect(mainProps.totalPages).toBe(1);
    });
  });
  it("handles missing cookie", async () => {
    const mockCookies = {
      get: jest.fn().mockReturnValue(undefined),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookies);

    (fetchDataByTerm as jest.Mock).mockResolvedValue({info: {pages: 3}});

    const props: PageProps = {
      params: {search: 1},
      searchParams: {},
    };

    const {getByTestId} = render(await Page(props));

    await waitFor(() => {
      const mainProps = JSON.parse(getByTestId("mock-main").textContent!);
      expect(mainProps.term).toBe("");
    });
  });
  it("sets isDetailsOpen correctly", async () => {
    (cookies as jest.Mock).mockReturnValue({get: () => ({value: "test"})});
    (fetchDataByTerm as jest.Mock).mockResolvedValue({info: {pages: 3}});

    const props: PageProps = {
      params: {search: 1},
      searchParams: {details: "5"},
    };

    const {getByTestId} = render(await Page(props));

    await waitFor(() => {
      const mainProps = JSON.parse(getByTestId("mock-main").textContent!);
      expect(mainProps.isDetailsOpen).toBe(true);
      expect(mainProps.detailedcardID).toBe(5);
    });
  });
  it("handles different current page", async () => {
    (cookies as jest.Mock).mockReturnValue({get: () => ({value: "test"})});
    (fetchDataByTerm as jest.Mock).mockResolvedValue({info: {pages: 10}});

    const props: PageProps = {
      params: {search: 5},
      searchParams: {},
    };

    const {getByTestId} = render(await Page(props));

    await waitFor(() => {
      const mainProps = JSON.parse(getByTestId("mock-main").textContent!);
      expect(mainProps.currentPage).toBe(5);
    });
  });
});
