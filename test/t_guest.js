const expect = require("chai").expect;
const request = require("request");
const baseUrl = "http://localhost:4910";

describe("Guest Functional Tests", () => {
  it("should load the guest home page", (done) => {
    request.get(`${baseUrl}/guest`, (err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("should show ads to guest", (done) => {
    request.get(`${baseUrl}/guest/viewmemberadds`, (err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});