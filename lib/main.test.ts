// setToken.test.ts
import { JWTHeader, TokenPart, jwtDecoder, type JWTDecoded } from "./main.ts";
import { describe, it, expect, expectTypeOf } from "vitest";

describe("jwtDecode", () => {
  it("decode John Balázs", () => {
    const decodedToken = jwtDecoder(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gQmFsw6F6cyIsImlhdCI6MTUxNjIzOTAyMn0.rpQt1WOpF4h5SP9iBBj2NfYvKQLuCI3lHSvxSS3eexs",
    );

    expectTypeOf(decodedToken).toEqualTypeOf<JWTDecoded | null>();
    expect(decodedToken).toEqual({
      sub: "1234567890",
      name: "John Balázs",
      iat: 1516239022,
    });
  });

  it("incomplete token", () => {
    const decodedToken = jwtDecoder(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gQmFsw6F6cyIsImlhdCI6MTUxNjIzOTAyMn0",
    );

    expectTypeOf(decodedToken).toEqualTypeOf<JWTDecoded | null>();
    expect(decodedToken).toEqual(null);
  });

  it("decode header", () => {
    const decodedToken = jwtDecoder(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gQmFsw6F6cyIsImlhdCI6MTUxNjIzOTAyMn0.rpQt1WOpF4h5SP9iBBj2NfYvKQLuCI3lHSvxSS3eexs",
      TokenPart.header,
    );

    expectTypeOf(decodedToken).toEqualTypeOf<JWTHeader | null>();

    expect(decodedToken).toEqual({
      alg: "HS256",
      typ: "JWT",
    });
  });

  it("return null when nothing defined", () => {
    const decodedToken = jwtDecoder();
    expect(decodedToken).toBeNull();
  });

  it("extended type", () => {
    const decodedToken = jwtDecoder<
      JWTDecoded & {
        roles: string[];
      }
    >("");

    expectTypeOf(decodedToken).toEqualTypeOf<
      | (JWTDecoded & {
          roles: string[];
        })
      | null
    >();
    expect(decodedToken).toBeNull();
  });
});
