import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Makes an HTTP request and returns the parsed JSON response.
 * 
 * This function is designed for JSON API endpoints only. It automatically:
 * - Sets Content-Type: application/json headers
 * - Parses the response as JSON
 * - Throws errors for non-2xx responses
 * 
 * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param url - The API endpoint URL
 * @param data - Optional request body (will be JSON.stringified)
 * @returns Promise resolving to the parsed JSON response
 * 
 * @example
 * // POST request with body
 * const result = await apiRequest('POST', '/api/simulate', { parameters });
 * 
 * // GET request
 * const articles = await apiRequest('GET', '/api/research');
 * 
 * Note: For binary responses (files, blobs) or streaming, implement a separate
 * helper function (e.g., apiRequestRaw) that returns the Response object directly.
 */
export async function apiRequest<T = any>(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return await res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
