const expect = require("chai").expect;
const request = require("request");
const baseUrl = "http://localhost:4910";

describe("Ad Feature Tests", () => {
  const adId = "68213b6e4d41529b0e1e2d9e";

  it("should increment contact click count", (done) => {
    request.post(`${baseUrl}/member/contactclick/${adId}`, (err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("should load an individual ad view page", (done) => {
    request.get(`${baseUrl}/member/view/${adId}`, (err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("should update ad details", (done) => {
    request.get(`${baseUrl}/member/updatedet/${adId}`, (err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});