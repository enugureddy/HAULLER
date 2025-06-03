const expect = require("chai").expect;
const request = require("request");
const baseUrl = "http://localhost:4910";

describe("Member Functional Tests", () => {
  it("should load the member ad view page", (done) => {
    request.get(`${baseUrl}/member/viewadds`, (err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("should load member account update page", (done) => {
    request.get(`${baseUrl}/member/uacc`, (err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});