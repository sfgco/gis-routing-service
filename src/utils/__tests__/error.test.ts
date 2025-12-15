import { mapErrorToResponse } from "../error";

describe("mapErrorToResponse", () => {
  it("should return a formatted error object", () => {
    const error = new Error("Test error");
    const result = mapErrorToResponse(error);
    expect(result).toHaveProperty("message", "Test error");
    expect(result).toHaveProperty("status");
  });
});
