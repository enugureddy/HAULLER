const expect = require("chai").expect;
const request = require("request");
const baseUrl = "http://localhost:4910";

describe("Authentication Tests", () => {
  it("should login successfully with correct member credentials", (done) => {
    request.post({
      url: `${baseUrl}/member/loginverify`,
      form: { email: "sujayaitham@gmail.com", password: "123456789" },
    }, (err, res) => {
      expect(res.statusCode).to.equal(302);
      done();
    });
  });

  it("should fail login with incorrect password", (done) => {
    request.post({
      url: `${baseUrl}/member/loginverify`,
      form: { email: "test@example.com", password: "wrongpass" },
    }, (err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  it("should reject login with missing password", (done) => {
    request.post({
      url: `${baseUrl}/member/loginverify`,
      form: { email: "sujayaitham@gmail.com", password: "" },
    }, (err, res) => {
      expect(res.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should reject login with missing email", (done) => {
    request.post({
      url: `${baseUrl}/member/loginverify`,
      form: { email: "", password: "Pass@1234" },
    }, (err, res) => {
      expect(res.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should reject login with invalid email format", (done) => {
    request.post({
      url: `${baseUrl}/member/loginverify`,
      form: { email: "invalidemail.com", password: "123456789" },
    }, (err, res) => {
      expect(res.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should reject login with SQL injection email", (done) => {
    request.post({
      url: `${baseUrl}/member/loginverify`,
      form: { email: "' OR 1=1 --", password: "anything" },
    }, (err, res) => {
      expect(res.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should reject login with long password", (done) => {
    const longPass = "A".repeat(1000);
    request.post({
      url: `${baseUrl}/member/loginverify`,
      form: { email: "test@example.com", password: longPass },
    }, (err, res) => {
      expect(res.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should reject login with email script injection", (done) => {
    request.post({
      url: `${baseUrl}/member/loginverify`,
      form: { email: "<script>alert(1)</script>", password: "Pass@1234" },
    }, (err, res) => {
      expect(res.statusCode).to.not.equal(200);
      done();
    });
  });
});