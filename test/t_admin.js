const expect = require("chai").expect;
const request = require("request");
const baseUrl = "http://localhost:4910";

describe("Admin Functional Tests", () => {
  it("should login as admin with valid credentials", (done) => {
    request.post({
      url: `${baseUrl}/admin/loginverify`,
      form: { email: "sujayaitham@gmail.com", password: "123456789" }
    }, (err, res) => {
      expect(res.statusCode).to.be.oneOf([200, 302]);
      done();
    });
  });

  it("should list all members", (done) => {
    request.get(`${baseUrl}/admin/viewmembers`, (err, res) => {
      expect(res.statusCode).to.be.oneOf([200, 302]);
      done();
    });
  });
});