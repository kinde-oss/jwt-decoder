type JWTDecoded = {
  aud: string[];
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  scp: string[];
  sub: string;
};

type JWTHeader = {
  alg: string;
  typ: string;
};

enum TokenPart {
  header = 0,
  body = 1,
}

/**
 * Decode JWT token
 * @param {string} token - JWT token to be decoded
 * @param {TokenPart} [part='body'] - Part of the token to be decoded (header, body, or signature)
 * @returns {Object} - Decoded JWT token as an object
 *
 * @example
 * jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
 * Returns:
 *  {
 *    sub: "1234567890",
 *    name: "John Doe",
 *    iat: 1516239022
 *  }
 *
 * jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", TokenPart.header)
 * Returns:
 *  {
 *    alg: "HS256",
 *    typ: "JWT"
 *  }
 */
type JwtDecoderResult<
  T,
  P extends TokenPart = TokenPart.body,
> = P extends TokenPart.header ? JWTHeader : T | null;

function jwtDecoder<T = JWTDecoded, P extends TokenPart = TokenPart.body>(
  token?: string,
  part?: P,
): JwtDecoderResult<T, P> | null {
  if (!token) {
    return null;
  }

  const tokenSplit = token.split(".");
  if (tokenSplit.length !== 3) {
    return null;
  }

  const base64Url = tokenSplit[part ?? TokenPart.body];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

export { jwtDecoder, type JWTDecoded, type JWTHeader, TokenPart };
