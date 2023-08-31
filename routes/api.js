const issue = require("../controllers/issues");

("use strict");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
    })

    .post(function (req, res) {
      let project = req.params.project;
      let input = req.body
      let createAnIssue = issue.createIssue(input)
      res.json({project, ...createAnIssue});
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
