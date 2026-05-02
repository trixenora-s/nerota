export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$|\s+/g, '') || '';

export const makeApiUrl = (endpoint: string) => {
  const cleanedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (!apiBaseUrl) {
    return cleanedEndpoint;
  }

  return apiBaseUrl.endsWith('/api') ? `${apiBaseUrl}${cleanedEndpoint}` : `${apiBaseUrl}/api${cleanedEndpoint}`;
};
