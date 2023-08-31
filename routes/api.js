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
      let issue_title = issue.createIssue(input).issue_title;
      let issue_text = issue.createIssue(input).issue_text;
      let created_by = issue.createIssue(input).created_by;
      let assigned_to = issue.createIssue(input).assigned_to;
      let status_text = issue.createIssue(input).status_text;
      let created_on = issue.createIssue(input).created_on;
      let updated_on = issue.createIssue(input).updated_on;
      let open = issue.createIssue(input).open;

      let result = {
        project,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        created_on,
        updated_on,
        open,
      };

      res.json(result);
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
