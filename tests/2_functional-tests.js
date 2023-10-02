const { projectName } = require("../issueprueba")

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Create an issue with every field", function (done) {
    const data = {
      issue_title: "Test Issue with Every Field",
      issue_text: "This is a test issue with all fields",
      created_by: "Test User",
      assigned_to: "Test Assignee",
      status_text: "In Progress",
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
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.issue_title, data.issue_title);
        assert.strictEqual(res.body.issue_text, data.issue_text);
        assert.strictEqual(res.body.created_by, data.created_by);
        assert.strictEqual(res.body.assigned_to, data.assigned_to);
        assert.strictEqual(res.body.status_text, data.status_text);
        assert.isNotEmpty(res.body.created_on);
        assert.isNotEmpty(res.body.updated_on);
        assert.isTrue(res.body.open);
        assert.strictEqual(res.body._id, "5"); // Update this ID as per your data
        done();
      });
  });

  test("Create an issue with only required fields", function (done) {
    const data = {
      issue_title: "Test Issue with Required Fields Only",
      issue_text: "This is a test issue with required fields only",
      created_by: "Test User",
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
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.issue_title, data.issue_title);
        assert.strictEqual(res.body.issue_text, data.issue_text);
        assert.strictEqual(res.body.created_by, data.created_by);
        assert.isEmpty(res.body.assigned_to);
        assert.isEmpty(res.body.status_text);
        assert.isNotEmpty(res.body.created_on);
        assert.isNotEmpty(res.body.updated_on);
        assert.isTrue(res.body.open);
        assert.strictEqual(res.body._id, "6"); // Update this ID as per your data
        done();
      });
  });

  test("Create an issue with missing required fields", function (done) {
    const data = {
      issue_title: "Test Issue with Missing Fields",
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
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.error, "required field(s) missing");
        done();
      });
  });

  test("View issues on a project", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get(`/api/issues/apitest`)
      .query({})
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isArray(res.body, "Return value is an array");
        done();
      });
  });

  test("View issues on a project with one filter", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get(`/api/issues/apitest`)
      .query({ open: false })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isArray(res.body, "Return value is an array");
        done();
      });
  });

  test("View issues on a project with multiple filters", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get(`/api/issues/apitest`)
      .query({ open: false, assigned_to: "Diana" })
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isArray(res.body, "Return value is an array");
        done();
      });
  });

  test("Update one field on an issue", function (done) {
    const data = {
      _id: "1", // Replace with a valid _id from your data
      issue_title: "Updated Title",
    };

    chai
      .request(server)
      .keepOpen()
      .put(`/api/issues/apitest`)
      .type("form")
      .send(data)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.result, "successfully updated");
        assert.strictEqual(res.body._id, data._id);
        done();
      });
  });

  test("Update multiple fields on an issue", function (done) {
    const data = {
      _id: "2", // Replace with a valid _id from your data
      issue_text: "Updated Text",
      assigned_to: "Updated Assignee",
      status_text: "Updated Status",
    };

    chai
      .request(server)
      .keepOpen()
      .put(`/api/issues/apitest`)
      .type("form")
      .send(data)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.result, "successfully updated");
        assert.strictEqual(res.body._id, data._id);
        done();
      });
  });

  test("Update an issue with missing _id", function (done) {
    chai
      .request(server)
      .keepOpen()
      .put(`/api/issues/apitest`)
      .type("form")
      .send({}) // Sending an empty body to trigger "missing _id"
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.error, "missing _id");
        done();
      });
  });

  test("Update an issue with no fields to update", function (done) {
    chai
      .request(server)
      .keepOpen()
      .put(`/api/issues/apitest`)
      .type("form")
      .send({ _id: "3" }) // Sending only _id to trigger "no update field(s) sent"
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.error, "no update field(s) sent");
        done();
      });
  });

  test("Update an issue with an invalid _id", function (done) {
    const data = {
      _id: "invalid_id",
      issue_text: "Updated Text",
    };

    chai
      .request(server)
      .keepOpen()
      .put(`/api/issues/apitest`)
      .type("form")
      .send(data)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.error, "could not update");
        assert.strictEqual(res.body._id, data._id);
        done();
      });
  });

  test("Delete an issue", function (done) {
    const data = {
      _id: "4", // Replace with a valid _id from your data
    };

    chai
      .request(server)
      .keepOpen()
      .delete(`/api/issues/apitest`)
      .type("form")
      .send(data)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.result, "successfully deleted");
        assert.strictEqual(res.body._id, data._id);
        done();
      });
  });

  test("Delete an issue with an invalid _id", function (done) {
    const data = {
      _id: "invalid_id",
    };

    chai
      .request(server)
      .keepOpen()
      .delete(`/api/issues/apitest`)
      .type("form")
      .send(data)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.error, "could not delete");
        assert.strictEqual(res.body._id, data._id);
        done();
      });
  });

  test("Delete an issue with missing _id", function (done) {
    chai
      .request(server)
      .keepOpen()
      .delete(`/api/issues/apitest`)
      .type("form")
      .send({}) // Sending an empty body to trigger "missing _id"
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body, "Response data is an object");
        assert.strictEqual(res.body.error, "missing _id");
        done();
      });
  });
});