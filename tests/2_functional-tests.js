const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  test("Test POST", function (done) {
    const data = {
      issue_title: "Title",
      issue_text: "Some text",
      created_by: "Diana",
      assigned_to: "Diana",
      status_text: "Checking",
    };

    chai
      .request(server)
      .keepOpen()
      .post(`/api/issues/apitest`)
      .type("form")
      .send(data)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(data, 'Input data is an object')
        assert.isString(data.issue_title);
        //assert.
        done();
      });
  });
});
