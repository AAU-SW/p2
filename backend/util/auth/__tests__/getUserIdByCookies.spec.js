import { describe, it, expect, vi } from "vitest";
import { getUserIdByHeaders } from "../getUserIdByHeaders";
import jwt from "jsonwebtoken";

const testRequestWithToken = { header: () => "Bearer test-token" };

describe("getUserIdByHeaders", () => {
	it("should throw an error if no token in request", () => {
		// Arrange
		const testRequestWithoutToken = { header: () => undefined };

		// Act & Assert
		expect(() => getUserIdByHeaders(testRequestWithoutToken)).toThrow();
	});
	it("should throw an error if no id in token", () => {
		// Arrange
		const testId = undefined;
		const verifyMock = vi.fn().mockReturnValue({ id: testId });
		vi.spyOn(jwt, "verify").mockImplementation(verifyMock);

		// Act & Assert
		expect(() => getUserIdByHeaders(testRequestWithToken)).toThrow();
		expect(verifyMock).toBeCalled();
	});
	it("should call jwt.verify", () => {
		// Arrange
		const testId = "test-id";
		const verifyMock = vi.fn().mockReturnValue({ id: testId });
		vi.spyOn(jwt, "verify").mockImplementation(verifyMock);

		// Act
		const res = getUserIdByHeaders(testRequestWithToken);

		// Assert
		expect(res).toEqual(testId);
		expect(verifyMock).toBeCalled();
	});
});
