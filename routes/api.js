const issue = require("../controllers/issues");

("use strict");
module.exports = function (app) {
  app
    .route("/api/issues/:project")

.get(function (req, res) {
  let project = req.params.project; 
  let queryParam = req.query;
  let allIssues = issue.readIssue({ ...queryParam, project }); 
  res.json([...allIssues]);
})
    .post(function (req, res) {
      let project = req.params.project;
      let input = req.body;
      let createAnIssue = issue.createIssue(input);
      res.json({ project, ...createAnIssue });
    })

    .put(function (req, res) {
      let project = req.params.project;
      let id = req.body._id;
      let fieldsToUpdate = req.body;
      delete fieldsToUpdate._id; 
      let updateResult = issue.updateIssue(id, fieldsToUpdate);
      res.json(updateResult);
    })

    .delete(function (req, res) {
      let project = req.params.project;
      let id = req.body._id; 
      let deleteResult = issue.deleteIssue(id);
      res.json(deleteResult);
    });
};