const Issue = require('../controllers/issues')

'use strict';

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;

      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let issue_title = req.body.issue_title
      let issue_text = req.body.issue_text
      let created_by = req.body.created_by
      let assigned_to = req.body.assigned_to
      let status_text = req.body.status_text

     // let result = {project, issue_title, issue_text, created_by, assigned_to, status_text}

      res.json(result)
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
