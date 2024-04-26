// setToken.test.ts
import { jwtDecoder } from "./main.ts";
import { describe, it, expect } from "vitest";

describe("jwtDecode", () => {
  it("decode John Balázs", () => {
    const decodedToken = jwtDecoder(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gQmFsw6F6cyIsImlhdCI6MTUxNjIzOTAyMn0.rpQt1WOpF4h5SP9iBBj2NfYvKQLuCI3lHSvxSS3eexs",
    );
    expect(decodedToken).toEqual({
      sub: "1234567890",
      name: "John Balázs",
      iat: 1516239022,
    });
  });

  it("return null when nothing defined", () => {
    const decodedToken = jwtDecoder();
    expect(decodedToken).toBeNull();
  });
});
