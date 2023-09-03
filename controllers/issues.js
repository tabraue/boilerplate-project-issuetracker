const { projectName } = require("../issueprueba");

const createIssue = (issue) => {
  const reqProp = ["issue_title", "issue_text", "created_by"];
  const optProp = ["assigned_to", "status_text"];
  const additional = {
    _id: "1",
    created_on: new Date(),
    updated_on: new Date(),
    open: true,
  };

  for (const el of reqProp) {
    if (!issue.hasOwnProperty(el) || issue[el].length <= 0) {
      return { error: "required field(s) missing" };
    }
  }

  for (const el of optProp) {
    if (!issue.hasOwnProperty(el)) {
      issue[el] = "";
    }
  }

  return { ...issue, ...additional };
};

/*
  GET requirements
  You can send array of all issues for specific projectname, 
    with all the fields present for each issue.
  You can send a GET request 
    and filter by also passing along any field and value as a URL query 
    (ie. /api/issues/{project}?open=false). 
    You can pass one or more field/value pairs at once.

*/

const readIssue = (params) => {
  if (typeof params !== "object") return { error: "Not found" };
  if (typeof params === "string" && params.indexOf("?") !== -1) {
    let query = params.slice(params.indexOf("?") + 1);
    let arr = query.split("&");
    let obj = {};
    arr.forEach((el) => {
      const [key, value] = el.split("=");
      obj[key] = value;
    });
    params = obj;
  }

  const result = projectName.filter((issue) => {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (issue[key] !== params[key]) {
          return false;
        }
      }
    }
    return true;
  });

  return result;
};


/*
  PUT requirements
     with an _id and one or more fields to update
     On success, updated_on UPDATE return {  result: 'successfully updated', '_id': _id }
     

*/

const updateIssue = (id, fieldsToUpdate) => {




};

const deleteIssue = (issue) => {};

module.exports = {
  createIssue,
  readIssue,
  updateIssue,
  deleteIssue,
};
