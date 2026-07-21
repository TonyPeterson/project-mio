const logger = require("../../server/logger");

test("Validating Basic Logger properties", () => {
    expect(logger).toBeTruthy();
    expect(Object.keys(logger).length).toBe(26, "logger should have 26 properties");
});