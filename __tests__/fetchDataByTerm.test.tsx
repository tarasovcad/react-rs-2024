import {fetchDataByTerm} from "@/components/api/fetchDataByTerm";

const mockFetch = jest.fn().mockImplementation((url) => {
  if (url.includes("NonExistentCharacter")) {
    return Promise.resolve({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);
  }
  return Promise.resolve({
    ok: true,
    json: async () => ({results: [{id: 1, name: "Rick Sanchez"}]}),
  } as Response);
});

global.fetch = mockFetch;

describe("fetchDataByTerm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return character data when the fetch is successful", async () => {
    const term = "Rick";
    const currentPage = 1;

    const data = await fetchDataByTerm(term, currentPage);

    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?name=${term}&page=${currentPage}`,
    );
    expect(data).toEqual({results: [{id: 1, name: "Rick Sanchez"}]});
  });

  it("should return false when the fetch fails", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      } as Response),
    );

    const term = "NonExistentCharacter";
    const currentPage = 1;

    const data = await fetchDataByTerm(term, currentPage);

    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?name=${term}&page=${currentPage}`,
    );
    expect(data).toBe(false);
  });
});
