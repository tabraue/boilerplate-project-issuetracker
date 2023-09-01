const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  const allKeys = [
    "issue_title",
    "issue_text",
    "created_by",
    "assigned_to",
    "status_text",
    "_id",
    "created_on",
    "updated_on",
    "open",
  ];

  test("Test POST with every field", function (done) {
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
        assert.isObject(data, "Input data is an object");
        //assert.containsAllKeys(data, allKeys, 'Object contains all keys');
        assert.exists(data.issue_title, "Issue title is included at post data");
        assert.exists(data.issue_text, "Issue text is included at post data");
        assert.exists(data.created_by, "Created by is included at post data");
        assert.exists(data.assigned_to, "Assigned to is included at post data");
        assert.exists(data.status_text, "Status text is included at post data");
        done();
      });
  });

  test("Test POST with only required fields", function (done) {
    const data = {
      issue_title: "Title",
      issue_text: "Some text",
      created_by: "Diana",
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
        assert.isObject(data, "Input data is an object");
        assert.exists(data.issue_title, 'Issue title is included at post data');
        assert.exists(data.issue_text, 'Issue text is included at post data');
        assert.exists(data.created_by, 'Created by is included at post data');
        done();
      });
  });

  test("Test POST with missing required fields", function(done){
    const data = {
      assigned_to: "Diana",
      status_text: "Open"
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
        assert.isObject(data, "Input data is an object");
        assert.exists(data.issue_title, 'Issue title is included at post data');
        assert.exists(data.issue_text, 'Issue text is included at post data');
        assert.exists(data.created_by, 'Created by is included at post data');
        done();
      }); 
  })


});
