import { describe, it, expect, vi } from "vitest";
import jwt from "jsonwebtoken";
import { createSecretToken } from "../secretToken";

describe("secretToken", () => {
  it("should call jwt.sign", () => {
    // Arrange
    const testToken = "test";
    const signMock = vi.fn().mockReturnValue(testToken);
    vi.spyOn(jwt, "sign").mockImplementation(signMock);

    // Act
    const result = createSecretToken();

    // Assert
    expect(result).toBe(testToken);
    expect(signMock).toBeCalled();
  });
});
