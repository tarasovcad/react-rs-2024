import { renderHook } from "@testing-library/react-hooks";
import { useFetchDataByTerm } from "../src/hooks/useRickAndMortiData";
import { useFetchDataByTermQuery } from "@/lib/store/rickAndMorti";

jest.mock("./../src/lib/store/rickAndMorti", () => ({
  useFetchDataByTermQuery: jest.fn(() => ({
    data: { results: [], info: { pages: 0 } },
    error: null,
    isFetching: false,
  })),
}));

jest.mock("./../src/lib/store/rickAndMorti", () => ({
  useFetchDataByTermQuery: jest.fn(),
}));

describe("FetchDataByTerm", () => {
  test("displays no characters found when results are empty", () => {
    (useFetchDataByTermQuery as jest.Mock).mockReturnValue({
      data: { results: [], info: { pages: 0 } },
      error: null,
      isFetching: false,
    });
    const { result } = renderHook(() => useFetchDataByTerm("test", 1));
    expect(result.current.notFound).toBe(true);
  });
});
