import {fetchDataById} from "@/components/api/fetchDataById";
import {Character} from "@/types/types";

const mockFetch = jest.fn().mockImplementation((url) => {
  if (url.includes("999")) {
    return Promise.resolve({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);
  }
  return Promise.resolve({
    ok: true,
    json: async () =>
      ({
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
      }) as Character,
  } as Response);
});

global.fetch = mockFetch;

describe("fetchDataById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return character data when the fetch is successful", async () => {
    const detailedcardID = 1;

    const data = await fetchDataById(detailedcardID);

    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/${detailedcardID}`,
    );
    expect(data).toEqual({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
    });
  });

  it("should return false when the fetch fails", async () => {
    const detailedcardID = 999;

    const data = await fetchDataById(detailedcardID);

    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/${detailedcardID}`,
    );
    expect(data).toBe(false);
  });
});
