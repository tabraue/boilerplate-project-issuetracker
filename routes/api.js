const issue = require("../controllers/issues");

("use strict");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      let queryParam = req.query
      let allIssues = issue.readIssue(queryParam)

      res.json([project, ...allIssues])
    })

    .post(function (req, res) {
      let project = req.params.project;
      let input = req.body
      let createAnIssue = issue.createIssue(input)
      res.json({project, ...createAnIssue});
    })

    .put(function (req, res) {
      let project = req.params.project;


      res.json()
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
