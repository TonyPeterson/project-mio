process.env.NODE_ENV = "production";
const devconfig = require("../../../server/data/config");

test("Validate dev config", () => {
    expect(devconfig).toBeTruthy();
    expect(devconfig.showErrorStacktrace).toEqual(false);
    expect(devconfig.localAuthentication).not.toBeUndefined(); 
});