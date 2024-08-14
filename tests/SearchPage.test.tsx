import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as cookie from 'cookie';
import { loader } from '~/routes/search.$page';
import { AppLoadContext, LoaderFunctionArgs } from '@remix-run/node';

vi.mock('cookie', () => ({
  parse: vi.fn(),
}));

describe('Loader function', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return correct data for successful API response', async () => {
    const mockRequest = new Request('http://localhost:3000/characters/1?details=0');
    mockRequest.headers.get = vi.fn().mockReturnValue('mockCookie');

    vi.spyOn(cookie, 'parse').mockReturnValue({ tarasovcadCookieAppRemix: 'testTerm' });

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        results: [{ id: 1, name: 'Rick' }],
        info: { pages: 5 },
      }),
    });

    const mockLoaderArgs: LoaderFunctionArgs = {
      request: mockRequest,
      params: { page: '1' },
      context: {} as AppLoadContext,
    };

    const result = (await loader(mockLoaderArgs)) as Response;
    const data = await result?.json();

    expect(data).toEqual({
      currentPage: 1,
      details: '0',
      characters: {
        results: [{ id: 1, name: 'Rick' }],
        info: { pages: 5 },
      },
      notFound: false,
      totalPages: 5,
      term: 'testTerm',
      isLoading: false,
      detailedcardID: 0,
    });
  });

  it('should handle API error correctly', async () => {
    const mockRequest = new Request('http://localhost:3000/characters/1');
    mockRequest.headers.get = vi.fn().mockReturnValue('mockCookie');

    vi.spyOn(cookie, 'parse').mockReturnValue({ tarasovcadCookieAppRemix: 'testTerm' });

    global.fetch = vi.fn().mockRejectedValue(new Error('API Error'));
    const mockLoaderArgs: LoaderFunctionArgs = {
      request: mockRequest,
      params: { page: '1' },
      context: {} as AppLoadContext,
    };

    const result = (await loader(mockLoaderArgs)) as Response;
    const data = await result?.json();

    expect(data).toEqual({
      currentPage: 1,
      details: '0',
      characters: null,
      notFound: true,
      totalPages: 0,
      term: 'testTerm',
      isLoading: false,
      detailedcardID: undefined,
    });
  });

  it('should handle missing page parameter', async () => {
    const mockRequest = new Request('http://localhost:3000/characters');
    mockRequest.headers.get = vi.fn().mockReturnValue('mockCookie');

    vi.spyOn(cookie, 'parse').mockReturnValue({ tarasovcadCookieAppRemix: 'testTerm' });

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        results: [{ id: 1, name: 'Rick' }],
        info: { pages: 5 },
      }),
    });

    const mockLoaderArgs: LoaderFunctionArgs = {
      request: mockRequest,
      params: { page: '1' },
      context: {} as AppLoadContext,
    };

    const result = (await loader(mockLoaderArgs)) as Response;
    const data = await result?.json();

    expect(data.currentPage).toBe('1');
  });
});
