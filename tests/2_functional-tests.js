const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  test("Test POST", function (done) {
    chai
      .request(server) 
      .keepOpen()
      .post(`/api/issues/:${project}`)
      .type("form")
      .send({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
      })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        done();
      });
  });
});
