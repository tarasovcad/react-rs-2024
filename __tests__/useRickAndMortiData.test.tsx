import { FetchDataByTerm } from "@/hooks/useRickAndMortiData";
import { renderHook } from "@testing-library/react-hooks";
import { useFetchDataByTermQuery } from "@/pages/api/rickAndMorti";

jest.mock("./../src/pages/api/rickAndMorti", () => ({
  useFetchDataByTermQuery: jest.fn(() => ({
    data: { results: [], info: { pages: 0 } },
    error: null,
    isFetching: false,
  })),
}));

jest.mock("./../src/pages/api/rickAndMorti", () => ({
  useFetchDataByTermQuery: jest.fn(),
}));

describe("FetchDataByTerm", () => {
  test("displays no characters found when results are empty", () => {
    (useFetchDataByTermQuery as jest.Mock).mockReturnValue({
      data: { results: [], info: { pages: 0 } },
      error: null,
      isFetching: false,
    });
    const { result } = renderHook(() => FetchDataByTerm("test", 1));
    expect(result.current.notFound).toBe(true);
  });
});
