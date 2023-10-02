const issue = require("../controllers/issues");

("use strict");
module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      let queryParam = req.query;
      let allIssues = issue.readIssue(queryParam);
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
      let id = req.body._id; // Obtén el ID del cuerpo de la solicitud
      let fieldsToUpdate = req.body;
      delete fieldsToUpdate._id; // Elimina el _id del objeto de actualización
      let updateResult = issue.updateIssue(id, fieldsToUpdate);
      res.json(updateResult);
    })

    .delete(function (req, res) {
      let project = req.params.project;
      let id = req.body._id; // Obtén el ID del cuerpo de la solicitud
      let deleteResult = issue.deleteIssue(id);
      res.json(deleteResult);
    });
};