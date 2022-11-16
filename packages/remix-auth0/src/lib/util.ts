export function getExpires(expires_in: number) {
  const expiresInMs = expires_in * 1000;
  return Date.now() + expiresInMs;
}
