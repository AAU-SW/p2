import { describe, it, expect, vi } from "vitest";
import { getUserIdByCookies } from "../getUserIdByCookies";
import jwt from "jsonwebtoken";

const testRequestWithToken = { cookies: { token: "test-token" } };

describe("getUserIdByCookies", () => {
	it("should throw an error if no token in request", () => {
		// Arrange
		const testRequestWithoutToken = { cookies: { token: undefined } };

		// Act & Assert
		expect(() => getUserIdByCookies(testRequestWithoutToken)).toThrow();
	});
	it("should throw an error if no id in token", () => {
		// Arrange
		const testId = undefined;
		const verifyMock = vi.fn().mockReturnValue({ id: testId });
		vi.spyOn(jwt, "verify").mockImplementation(verifyMock);

		// Act & Assert
		expect(() => getUserIdByCookies(testRequestWithToken)).toThrow();
		expect(verifyMock).toBeCalled();
	});
	it("should call jwt.verify", () => {
		// Arrange
		const testId = "test-id";
		const verifyMock = vi.fn().mockReturnValue({ id: testId });
		vi.spyOn(jwt, "verify").mockImplementation(verifyMock);

		// Act
		const res = getUserIdByCookies(testRequestWithToken);

		// Assert
		expect(res).toEqual(testId);
		expect(verifyMock).toBeCalled();
	});
});
