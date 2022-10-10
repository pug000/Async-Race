const baseUrl = 'http://localhost:3000';

const fetchOptions = (
  method: string,
  url: string,
  params: Record<string, number | string> = {}
) => ({
  url,
  method,
  params,
  headers: { 'Content-Type': 'application/json' },
});

export { baseUrl, fetchOptions };
